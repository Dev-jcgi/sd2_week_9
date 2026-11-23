import { useState } from 'react';

/* Simulador "¿Llegamos a la demo?": burndown de la semana de integración del capstone.
   La fecha (30/11) y los equipos son fijos: lo único que se ajusta es el alcance.
   Toca una historia para sacarla o meterla; mueve la capacidad; agrega un imprevisto. Puntos ilustrativos. */

const DIAS = ['lun 23', 'mar 24', 'mié 25', 'jue 26', 'vie 27', 'sáb 28'];
const MOSCOW = { M: ['Must', '#FF6B8B', 'imprescindible'], S: ['Should', '#FFD166', 'importante'], C: ['Could', '#6EA8FF', 'deseable'] };
const BASE = [
  ['[USR] Login por rol', 5, 'M'], ['[CAT] Stock por producto (D-09)', 5, 'M'], ['[ORD] Crear pedido con envío', 8, 'M'],
  ['[PAY] Pago simulado', 5, 'M'], ['[DEL] Tomar pedido en exclusiva', 5, 'M'], ['[DEL] Estados con código (D-02)', 5, 'M'],
  ['Prueba de integración de punta a punta', 5, 'M'], ['Ensayo y video de la demo', 3, 'M'],
  ['[ORD] Cancelar pedido (D-06)', 3, 'S'], ['[PAY] Historial sin doble cobro', 3, 'S'],
  ['[PAY] Cupones (D-03, opcional)', 5, 'C'], ['[DEL] Historial de entregas', 3, 'C'], ['[USR] MySQL de punta a punta', 8, 'C'],
].map(([t, p, m], i) => ({ id: i, t, p, m }));

export default function Recorte() {
  const [fuera, setFuera] = useState(() => new Set());
  const [cap, setCap] = useState(7);
  const [extra, setExtra] = useState(0);
  const dentro = BASE.filter((h) => !fuera.has(h.id));
  const total = dentro.reduce((s, h) => s + h.p, 0) + extra;
  const mustFuera = BASE.filter((h) => h.m === 'M' && fuera.has(h.id));
  const diasNecesarios = total / cap;
  const llega = diasNecesarios <= DIAS.length;
  const W = 640, H = 220, pad = 30, maxY = Math.max(66, total);
  const x = (d) => pad + (d / DIAS.length) * (W - pad - 10);
  const y = (v) => H - pad - (v / maxY) * (H - pad - 12);
  const real = Array.from({ length: DIAS.length + 1 }, (_, d) => Math.max(0, total - cap * d));
  const tog = (id) => { const s = new Set(fuera); s.has(id) ? s.delete(id) : s.add(id); setFuera(s); };

  let msg;
  if (mustFuera.length) msg = `Sacaste algo imprescindible (${mustFuera[0].t}). Sin eso el recorrido de la demo se rompe: corta primero lo Could, luego lo Should.`;
  else if (llega && total <= cap * DIAS.length - cap) msg = `Llegan con margen: terminan el ${DIAS[Math.max(0, Math.ceil(diasNecesarios) - 1)]} y les queda un día para imprevistos y ensayo.`;
  else if (llega) msg = `Llegan justo el ${DIAS[Math.max(0, Math.ceil(diasNecesarios) - 1)]}, sin margen. Cualquier imprevisto los deja fuera: ¿qué más pueden recortar?`;
  else msg = `Con ${total} puntos y ${cap} por día necesitan ${diasNecesarios.toFixed(1)} días y solo hay ${DIAS.length}. La fecha no se mueve: recorten alcance (toca las historias Could).`;

  return (
    <div className="sim recorte">
      <div className="sim-ctrl">
        <label className="sim-tog">Capacidad de la sección: <b className="mono">{cap}</b> puntos/día
          <input type="range" min="4" max="12" value={cap} onChange={(e) => setCap(+e.target.value)} aria-label="Puntos por día" /></label>
        <button className="cbtn danger" onClick={() => setExtra(extra + 5)}>⚠ Imprevisto: bug de integración (+5)</button>
        <button className="cbtn" onClick={() => { setFuera(new Set()); setExtra(0); setCap(7); }}>↺ Reiniciar</button>
      </div>
      <div className="rec-grid">
        <div className="rec-lista" role="list">
          {BASE.map((h) => (
            <button key={h.id} role="listitem" className={`rec-h ${fuera.has(h.id) ? 'fuera' : ''}`} style={{ '--c': MOSCOW[h.m][1] }} onClick={() => tog(h.id)} title={fuera.has(h.id) ? 'Volver a meter' : 'Sacar del alcance'}>
              <span className="mono rec-m">{MOSCOW[h.m][0]}</span><span className="rec-t">{h.t}</span><b className="mono">{h.p}</b>
            </button>
          ))}
          {extra > 0 && <div className="rec-h extra"><span className="mono rec-m">Bug</span><span className="rec-t">Imprevistos de integración</span><b className="mono">{extra}</b></div>}
        </div>
        <div className="rec-graf">
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Burndown hasta la demo">
            <line x1={x(DIAS.length)} x2={x(DIAS.length)} y1="8" y2={H - pad} className="rec-demo" />
            <text x={x(DIAS.length) - 6} y="20" className="rec-lbl" textAnchor="end">demo 30/11 →</text>
            <line x1={x(0)} y1={y(total)} x2={x(DIAS.length)} y2={y(0)} className="rec-ideal" />
            <polyline points={real.map((v, d) => `${x(d)},${y(v)}`).join(' ')} className={`rec-real ${llega ? 'ok' : 'bad'}`} />
            {real.map((v, d) => <circle key={d} cx={x(d)} cy={y(v)} r="4" className={`rec-pt ${llega ? 'ok' : 'bad'}`} />)}
            {DIAS.map((t, d) => <text key={t} x={x(d + 1)} y={H - 10} className="rec-lbl" textAnchor="middle">{t}</text>)}
            <text x={x(0)} y={y(total) - 8} className="rec-lbl">{total} pts</text>
          </svg>
          <div className="rec-num">
            <span className="mono">alcance <b>{total}</b> pts</span>
            <span className="mono">capacidad <b>{cap * DIAS.length}</b> pts</span>
            <span className={`mono ${llega ? 'ok' : 'bad'}`}><b>{llega ? '✓ llegan' : '✗ no llegan'}</b></span>
          </div>
        </div>
      </div>
      <p className={`sim-msg ${mustFuera.length || !llega ? 'bad' : 'ok'}`}>{msg}</p>
    </div>
  );
}
