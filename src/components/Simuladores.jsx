import { useState } from 'react';
import Recorte from './Recorte.jsx';
import Versionador from './Versionador.jsx';
import Semaforo from './Semaforo.jsx';
import EnsayoDemo from './EnsayoDemo.jsx';

/* Los tres simuladores de la semana, para repasar en el celular o la computadora. */
const SIMS = [
  { id: 'recorte', n: '¿Llegamos a la demo?', d: 'Burndown de la última semana: recorta alcance con MoSCoW hasta llegar al 30/11.', C: Recorte },
  { id: 'version', n: 'Máquina de versiones', d: 'Seis cambios del capstone: ¿MAJOR, MINOR o PATCH? Arma el CHANGELOG.', C: Versionador },
  { id: 'semaforo', n: 'Semáforo de entrega', d: 'La lista de lo que su equipo entrega el 30/11. Se guarda en este navegador.', C: Semaforo },
  { id: 'ensayo', n: 'Ensaya tu demo', d: 'Arma un guion de 10 minutos y enfrenta imprevistos.', C: EnsayoDemo },
];

export default function Simuladores() {
  const [s, setS] = useState(() => SIMS.find((x) => x.id === new URLSearchParams(location.hash.split('?')[1] || '').get('s'))?.id || 'recorte');
  const sim = SIMS.find((x) => x.id === s);
  return (
    <div className="page sims8">
      <div className="sims8-tabs">{SIMS.map((x) => <button key={x.id} className={`cbtn ${s === x.id ? 'on' : ''}`} onClick={() => setS(x.id)}>{x.n}</button>)}</div>
      <h1 className="h-lg">{sim.n}</h1>
      <p className="exp">{sim.d} Es una simulación en tu navegador con números ilustrativos.</p>
      <sim.C key={s} />
    </div>
  );
}
