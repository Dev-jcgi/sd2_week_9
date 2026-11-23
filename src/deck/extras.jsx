import { useEffect, useState } from 'react';

/** Receso con cuenta regresiva de 10 minutos (empieza al tocar el botón). */
export function Receso() {
  const [fin, setFin] = useState(null);
  const [ahora, setAhora] = useState(Date.now());
  useEffect(() => { if (!fin) return; const id = setInterval(() => setAhora(Date.now()), 500); return () => clearInterval(id); }, [fin]);
  const resta = fin ? Math.max(0, fin - ahora) : 10 * 60 * 1000;
  const mm = String(Math.floor(resta / 60000)).padStart(2, '0'), ss = String(Math.floor((resta % 60000) / 1000)).padStart(2, '0');
  return (
    <div className="d-break">
      <p className="d-eti">Minuto 56 · receso</p>
      <h1>Pausa de 10 minutos</h1>
      <p className="d-reloj mono" aria-live="polite">{mm}:{ss}</p>
      {!fin ? <button className="btn" onClick={() => setFin(Date.now() + 10 * 60 * 1000)}>Iniciar cuenta regresiva</button>
        : resta === 0 ? <p className="d-preg">¡Volvemos! Ya tenemos la versión; ahora, ¿qué entregamos exactamente?</p>
        : <p className="d-sub">Al volver: los entregables del proyecto y cómo hacer una buena demo.</p>}
      <div className="d-break-tip">
        <span className="mono">Mientras tanto</span>
        <p>Abran #/simuladores en el celular y prueben la «Máquina de versiones».</p>
      </div>
    </div>
  );
}

/** Línea de tiempo de la sesión de 120 minutos. */
export const AGENDA = [
  [0, 5, 'Inicio · la última semana', '#3A4152', 'c'], [5, 25, 'Tema 1 · Gestión: la recta final', '#FFD166', 't'], [25, 31, 'Actividad 1', '#FF6B8B', 'a'],
  [31, 51, 'Tema 2 · Versionado de software', '#C6F33A', 't'], [51, 56, 'Actividad 2', '#FF6B8B', 'a'], [56, 66, 'Receso', '#3A4152', 'b'],
  [66, 84, 'Tema 3 · Entregables del proyecto', '#B78CFF', 't'], [84, 89, 'Actividad 3', '#FF6B8B', 'a'],
  [89, 112, 'Tema 4 · Demostración del producto', '#FF8A3D', 't'], [112, 120, 'Actividad 4 + plan de la semana', '#FF6B8B', 'a'],
];
export function Agenda() {
  return (
    <div className="d-agenda">
      <div className="bar">
        {AGENDA.map(([a, b, t, c]) => <div key={a} style={{ flex: b - a, background: c }} title={`${a}–${b} min · ${t}`} />)}
      </div>
      <div className="rows">
        {AGENDA.map(([a, b, t, c, k]) => (
          <div key={a} className={`row ${k}`}><span className="mono">{String(a).padStart(3, '0')}–{String(b).padStart(3, '0')}</span><i style={{ background: c }} /><b>{t}</b></div>
        ))}
      </div>
    </div>
  );
}
