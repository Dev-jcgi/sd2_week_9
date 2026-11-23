import { TEMAS } from '../data/temas.js';

const BASE = import.meta.env.BASE_URL;
const DIAGRAMAS = [
  ['camino-entrega', 'Del Sprint 4 a la demo'], ['versiones', 'MAJOR, MINOR y PATCH en el capstone'],
  ['entregables', 'Qué se entrega el 30/11'], ['recorrido-demo', 'El recorrido de la demo'],
];

export default function Landing() {
  return (
    <div className="page landing7">
      <section className="hero7">
        <p className="eyebrow">Desarrollo de Software 2 · Sección E · Semana 9 · Capstone Delivery System</p>
        <h1 className="h-xl">De sprint a <em>producto</em></h1>
        <p className="exp">La demo final del Delivery System es el 30 de noviembre. Gestión de la recta final, versionado, entregables y cómo hacer una buena demostración.</p>
        <div className="row-btns">
          <a className="btn" href="#/sala">Entrar a la clase</a>
          <a className="btn ghost" href="#/actividades">Practicar por mi cuenta</a>
          <a className="btn ghost" href="#/presentacion">Ver la presentación</a>
          <a className="btn ghost" href="#/simuladores">Simuladores</a>
          <a className="btn ghost" href="#/profesor">Soy profesor</a>
        </div>
      </section>
      <section>
        <p className="eyebrow">Temas</p>
        <div className="temas7">{TEMAS.map((t) => <a key={t.id} href={`#/presentacion?t=${t.id}`} style={{ '--c': t.color }}><span className="mono">{t.n}</span>{t.titulo}</a>)}</div>
      </section>
      <section>
        <p className="eyebrow">Diagramas (Archify)</p>
        <div className="diags7">{DIAGRAMAS.map(([id, t]) => <a key={id} href={`${BASE}diagramas/${id}.html`} target="_blank" rel="noreferrer">{t} ↗</a>)}</div>
      </section>
    </div>
  );
}
