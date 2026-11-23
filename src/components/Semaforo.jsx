import { useState } from 'react';
import { store } from '../lib/fx.js';

/* "Semáforo de entrega": lista de verificación de lo que cada equipo entrega el 30/11.
   Se guarda solo en este navegador. Los marcados con ★ bloquean la entrega si faltan. */

const KEY = 'sd2w9-semaforo';
const GRUPOS = [
  ['Producto', '#C6F33A', [['tag', 'Tag v1.0.0 en main', true], ['release', 'Release en GitLab con notas', false], ['corre', 'Se ejecuta con el README en una máquina limpia', true]]],
  ['Código', '#6EA8FF', [['verde', 'Pipeline en verde en main', true], ['mrs', 'Todo entró por MR revisado', true], ['pruebas', 'Pruebas de los casos de uso', false]]],
  ['Documentación', '#B78CFF', [['readme', 'README: cómo ejecutar y probar', true], ['wiki', 'Wiki del módulo al día (4Ps, casos de uso)', false], ['decisiones', 'Decisiones D-00 a D-09 aplicadas', false]]],
  ['Proceso', '#FFD166', [['board', 'Issues cerrados con DoD marcada', false], ['actas', 'Actas de sprint y retrospectiva', false]]],
  ['Demo', '#FF8A3D', [['guion', 'Guion de 10 minutos ensayado', true], ['video', 'Video de respaldo', false]]],
];

export default function Semaforo() {
  const [h, setH] = useState(() => store.get(KEY) || {});
  const tog = (k) => { const n = { ...h, [k]: !h[k] }; setH(n); store.set(KEY, n); };
  const items = GRUPOS.flatMap(([, , it]) => it);
  const hechos = items.filter(([k]) => h[k]).length;
  const faltanCrit = items.filter(([k, , c]) => c && !h[k]);
  const color = faltanCrit.length ? 'rojo' : hechos < items.length ? 'amarillo' : 'verde';
  return (
    <div className="sim semaforo">
      <div className="sem-top">
        <div className={`sem-luz ${color}`} aria-label={`Semáforo en ${color}`}><i className="r" /><i className="a" /><i className="v" /></div>
        <div>
          <b className="sem-pct">{Math.round((100 * hechos) / items.length)} %</b>
          <p className="sim-msg">{color === 'rojo' ? `Falta algo que bloquea la entrega: ${faltanCrit[0][1]}.` : color === 'amarillo' ? 'Lo esencial está; completen lo demás si les da tiempo.' : '¡Listos para entregar!'}</p>
        </div>
      </div>
      <div className="sem-grupos">
        {GRUPOS.map(([g, c, it]) => (
          <div key={g} className="sem-g" style={{ '--c': c }}>
            <b>{g}</b>
            {it.map(([k, t, crit]) => <label key={k} className="sim-tog"><input type="checkbox" checked={!!h[k]} onChange={() => tog(k)} /> {t}{crit && <span className="crit" title="Bloquea la entrega">★</span>}</label>)}
          </div>
        ))}
      </div>
    </div>
  );
}
