"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "printing" | "ready" | "torn";

const items = [
  ["Identidad visual", "€3.480,00"],
  ["Diseño de producto", "€2.817,07"],
  ["Kit de lanzamiento", "€1.440,00"],
] as const;

export default function Home() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [copied, setCopied] = useState(false);
  const printAudio = useRef<HTMLAudioElement>(null);
  const audioContext = useRef<AudioContext | null>(null);

  const playCompletionChime = () => {
    const context = audioContext.current;
    if (!context) return;
    const now = context.currentTime;
    const gain = context.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.16, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.72);
    gain.connect(context.destination);

    [880, 1318.5].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, now + index * 0.1);
      oscillator.connect(gain);
      oscillator.start(now + index * 0.1);
      oscillator.stop(now + 0.72);
    });
  };

  useEffect(() => {
    if (phase !== "printing") return;
    const timer = window.setTimeout(() => {
      setPhase("ready");
      playCompletionChime();
    }, 1900);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    let objectUrl = "";
    let cancelled = false;
    void fetch("/printer-print.wav")
      .then((response) => response.blob())
      .then((blob) => {
        if (cancelled || !printAudio.current) return;
        objectUrl = URL.createObjectURL(blob);
        printAudio.current.src = objectUrl;
        printAudio.current.load();
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, []);

  const print = () => {
    if (!audioContext.current) audioContext.current = new AudioContext();
    void audioContext.current.resume();
    if (printAudio.current) {
      printAudio.current.currentTime = 0;
      printAudio.current.volume = 0.8;
      void printAudio.current.play().catch(() => undefined);
    }
    setCopied(false);
    setPhase("printing");
  };

  const copyReceipt = async () => {
    await navigator.clipboard?.writeText("X7RG-2048-0831");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <main className="page-shell">
      <audio ref={printAudio} src="/printer-print.wav" preload="auto" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="x7rG Enterprise, inicio">
          <img className="brand-logo" src="/x7rg-enterprise-emblem.png" alt="x7rG Enterprise" />
        </a>
        <div className={`status-pill status-${phase}`}><span /> Pago aprobado</div>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow">RECIBO DIGITAL · #2048</div>
        <h1>Una pequeña prueba<br />de un gran trabajo.</h1>
        <p className="intro">El pago se ha completado. Imprime el recibo y guarda este momento: hasta la burocracia merece un poco de belleza.</p>

        <div className={`machine phase-${phase}`} aria-live="polite">
          <div className="paper-window">
            <article className="receipt" aria-label="Recibo de x7rG Enterprise">
              <div className="receipt-inner">
                <div className="receipt-head">
                  <div>
                    <div className="receipt-kicker">x7rG ENTERPRISE</div>
                    <div className="receipt-muted">RECIBO DE SERVICIOS</div>
                  </div>
                  <img className="receipt-logo" src="/x7rg-enterprise-emblem.png" alt="x7rG Enterprise" />
                </div>
                <div className="receipt-total">€7.737<span>,07</span></div>
                <div className="receipt-meta">14 AGO 2026 · 14:32 · VISA •••• 4242</div>
                <div className="divider" />
                <div className="items">
                  {items.map(([label, price]) => (
                    <div className="item" key={label}><span>{label}</span><b>{price}</b></div>
                  ))}
                </div>
                <div className="divider" />
                <div className="sum"><span>Subtotal</span><b>€7.737,07</b></div>
                <div className="sum"><span>IVA incluido</span><b>€1.342,80</b></div>
                <div className="grand-total"><span>TOTAL PAGADO</span><b>€7.737,07</b></div>
                <div className="receipt-note">GRACIAS POR CONFIAR EN NUESTRO TRABAJO</div>
                <button className="receipt-id" onClick={copyReceipt} aria-label="Copiar el número del recibo">
                  <span className="barcode">|||| ||| | |||| || ||| |||| |</span>
                  <small>{copied ? "¡NÚMERO COPIADO!" : "X7RG-2048-0831 · PULSA PARA COPIAR"}</small>
                </button>
              </div>
            </article>
          </div>

          <div className="printer" aria-hidden="true">
            <div className="printer-top" />
            <div className="printer-slot" />
            <div className="printer-brand">x7rG <span>Enterprise</span></div>
            <div className="printer-led" />
          </div>

          <div className="neon-frame" aria-hidden="true" />

          <div className="actions">
            {(phase === "idle" || phase === "torn") && (
              <button className="primary-button" onClick={print}>
                {phase === "torn" ? "↻ Imprimir de nuevo" : <><span className="button-led" aria-hidden="true" /> Imprimir recibo</>}
              </button>
            )}
            {phase === "printing" && (
              <button className="primary-button loading" disabled><span /> Imprimiendo…</button>
            )}
            {phase === "ready" && (
              <>
                <button className="secondary-button" onClick={print}>↻ Volver a imprimir</button>
                <button className="primary-button" onClick={() => setPhase("torn")}>✂ Cortar papel</button>
              </>
            )}
          </div>
          <p className="helper">
            {phase === "idle" && "Todo listo cuando quieras."}
            {phase === "printing" && "El papel está saliendo…"}
            {phase === "ready" && "Recibo listo. Ahora puedes cortarlo o volver a imprimirlo."}
            {phase === "torn" && "Recibo cortado: guardaremos una copia en tu correo electrónico."}
          </p>
        </div>
      </section>

      <footer><span>x7rG Enterprise © 2026</span><span>Hecho con cuidado, impreso sin papel.</span></footer>
    </main>
  );
}
