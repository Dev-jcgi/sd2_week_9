import { useState } from 'react';

/* Simulador "Ensaya tu demo": arma el guion con bloques (10 minutos máximo), mira cómo cambia la
   atención del público y después enfrenta imprevistos según lo que hayas preparado. Ilustrativo. */

const BLOQUES = [
  { id: 'prob', t: 'Problema y usuario', min: 1, at: +10, bueno: true },
  { id: 'feliz', t: 'Recorrido feliz de punta a punta', min: 5, at: +15, bueno: true },
  { id: 'regla', t: 'Una regla de negocio (cancelar pedido)', min: 1.5, at: +5, bueno: true },
  { id: 'arq', t: 'Cómo está hecho (módulos y contratos)', min: 1.5, at: 0, bueno: true },
  { id: 'sigue', t: 'Qué sigue y preguntas', min: 1, at: +5, bueno: true },
  { id: 'codigo', t: 'Recorrer el código línea por línea', min: 4, at: -30 },
  { id: 'config', t: 'Mostrar cada pantalla de configuración', min: 3, at: -20 },
  { id: 'bd', t: 'Explicar la base de datos tabla por tabla', min: 3, at: -20 },
  { id: 'perdon', t: 'Disculparse por todo lo que falta', min: 1, at: -10 },
];
const PREP = [
  ['video', 'Video de respaldo grabado'], ['datos', 'Usuarios y datos de prueba listos'],
  ['arranque', 'Arranque en limpio probado esa mañana'], ['roles', 'Roles: narrador, operador y tiempo'],
];
const IMPREVISTOS = [
  { t: 'La aplicación no arranca en la computadora del salón.', salva: 'video', ok: 'Ponen el video de respaldo y siguen narrando. Nadie se pone nervioso.', mal: 'Diez minutos intentando arrancar frente a todos.' },
  { t: 'Al crear el pedido no aparece ningún comercio.', salva: 'datos', ok: 'Los datos de prueba ya estaban cargados: el comercio aparece.', mal: 'Hay que registrar un comercio y productos en vivo: se van tres minutos.' },
  { t: 'Sale un error raro de una versión vieja del código.', salva: 'arranque', ok: 'Esa mañana bajaron el tag v1.0.0 y lo probaron: no pasa.', mal: 'Era una rama vieja en la laptop de alguien.' },
  { t: 'El que iba a hablar se queda en blanco a mitad de la demo.', salva: 'roles', ok: 'El operador sigue el guion y retoma la narración.', mal: 'Silencio incómodo; nadie sabe quién sigue.' },
];

export default function EnsayoDemo() {
  const [guion, setGuion] = useState([]);
  const [prep, setPrep] = useState({});
  const [imp, setImp] = useState(-1);
  const total = guion.reduce((s, id) => s + BLOQUES.find((b) => b.id === id).min, 0);
  let at = 70; const curva = [at];
  guion.forEach((id) => { at = Math.max(0, Math.min(100, at + BLOQUES.find((b) => b.id === id).at)); curva.push(at); });
  if (total > 10) { at = Math.max(0, at - (total - 10) * 8); curva.push(at); }
  const tiene = (id) => guion.includes(id);
  const tog = (id) => setGuion(tiene(id) ? guion.filter((x) => x !== id) : [...guion, id]);

  const avisos = [];
  if (!tiene('feliz')) avisos.push('Falta el recorrido feliz: es lo que el cliente vino a ver.');
  if (tiene('feliz') && tiene('prob') && guion.indexOf('prob') > guion.indexOf('feliz')) avisos.push('El problema va antes del recorrido: primero el «para qué».');
  if (tiene('sigue') && guion[guion.length - 1] !== 'sigue') avisos.push('«Qué sigue y preguntas» va al final.');
  if (total > 10) avisos.push(`Te pasaste ${(total - 10).toFixed(1)} min: el público se desconecta.`);
  if (guion.some((id) => !BLOQUES.find((b) => b.id === id).bueno)) avisos.push('Hay bloques que no muestran valor al usuario: quítalos.');

  const W = 420, H = 110;
  const pts = curva.map((v, i) => `${(i / Math.max(1, curva.length - 1)) * W},${H - (v / 100) * H}`).join(' ');
  const im = imp >= 0 ? IMPREVISTOS[imp % IMPREVISTOS.length] : null;

  return (
    <div className="sim ensayo">
      <div className="ens-grid">
        <div>
          <span className="mono ens-eti">1 · arma el guion (toca en orden)</span>
          <div className="ens-bloques">
            {BLOQUES.map((b) => (
              <button key={b.id} className={`ens-b ${tiene(b.id) ? 'on' : ''}`} onClick={() => tog(b.id)}>
                {tiene(b.id) && <i className="mono">{guion.indexOf(b.id) + 1}</i>}<span>{b.t}</span><b className="mono">{b.min} min</b>
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="mono ens-eti">tu demo · {total.toFixed(1)} de 10 min</span>
          <div className="ens-barra"><i style={{ width: `${Math.min(100, total * 10)}%` }} className={total > 10 ? 'pasado' : ''} /></div>
          <svg viewBox={`0 0 ${W} ${H}`} className="ens-curva" role="img" aria-label="Atención del público">
            <line x1="0" x2={W} y1={H * 0.5} y2={H * 0.5} className="ref" />
            {curva.length > 1 && <polyline points={pts} />}
          </svg>
          <span className="mono ens-eti">atención del público al final: <b>{Math.round(at)} %</b></span>
          <ul className="ens-avisos">{(guion.length ? avisos : ['Agrega bloques para ver la curva.']).map((a) => <li key={a}>{a}</li>)}{guion.length > 0 && !avisos.length && <li className="ok">✓ Buen guion: corto, con historia y con el valor al centro.</li>}</ul>
        </div>
      </div>
      <div className="ens-prep">
        <span className="mono ens-eti">2 · ¿qué prepararon?</span>
        {PREP.map(([k, t]) => <label key={k} className="sim-tog"><input type="checkbox" checked={!!prep[k]} onChange={() => setPrep({ ...prep, [k]: !prep[k] })} /> {t}</label>)}
        <button className="btn danger" onClick={() => setImp(imp + 1)}>⚡ Siguiente imprevisto</button>
      </div>
      {im && <p className={`sim-msg ${prep[im.salva] ? 'ok' : 'bad'}`}><b>{im.t}</b> {prep[im.salva] ? `✓ ${im.ok}` : `✗ ${im.mal}`}</p>}
    </div>
  );
}
