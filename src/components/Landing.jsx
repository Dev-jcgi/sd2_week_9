import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TEMAS } from '../data/temas.js';

const WIKI = 'https://gitlab.com/jala-university1/cohort-7/ES.CO.CSSD-125.GA.T2.26.M2/SE/capstone/-/wikis';
const ENLACES = [
  ['Guía del Laboratorio semana 9', `${WIKI}/Gu%C3%ADas/Laboratorio-semana-9`, 't1'],
  ['Tags y versiones del capstone', 'https://gitlab.com/jala-university1/cohort-7/ES.CO.CSSD-125.GA.T2.26.M2/SE/capstone/-/tags', 't2'],
  ['Integración, pruebas y demo (pendientes)', 'https://jcgi.lat/sd2_pendientes/pendientes-integracion.html', 't3'],
  ['Evaluación final: rúbrica y preguntas', 'https://jcgi.lat/sd2_pendientes/evaluacion-final.html', 't4'],
  ['Semantic Versioning 2.0.0', 'https://semver.org/lang/es/', 't2'],
];
const COLOR = Object.fromEntries(TEMAS.map((t) => [t.id, t.color]));

export default function Landing() {
  const hero = useRef(null);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.from(hero.current.children, { y: 26, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out', clearProps: 'all' });
  }, []);
  return (
    <div className="page landing6">
      <section className="wrap hero6" ref={hero}>
        <p className="eyebrow">Desarrollo de Software 2 · Sección E · Semana 9 · Capstone Delivery System</p>
        <h1 className="display">De la demo a la <em>versión 1.0</em>.</h1>
        <p className="lead">Qué se entrega en el Laboratorio 9, cómo se prepara la demo, cómo se publica la versión 1.0.0 y cómo se evalúa a cada uno el 30/11, el 1/12 y el 2/12, con el Delivery System como ejemplo.</p>
        <div className="cta">
          <a className="btn" href="#/profesor">Crear la sesión (profesor)</a>
          <a className="btn ghost" href="#/presentacion">Ver la presentación</a>
        </div>
      </section>
      <section className="wrap temas7">
        <p className="eyebrow">Los 4 temas de hoy</p>
        <div className="dl-grid">
          {TEMAS.map((t) => (
            <a key={t.id} className="dl-card tema7" style={{ '--c': t.color }} href={`#/presentacion?t=${t.id}`}>
              <span className="mono">Tema {t.n} · {t.min} min</span><b>{t.titulo}</b><i className="mono">abrir en la presentación →</i>
            </a>
          ))}
        </div>
      </section>
      <section className="wrap diag-list">
        <p className="eyebrow">En el capstone</p>
        <div className="dl-grid">
          {ENLACES.map(([t, href, tema]) => (
            <a key={href} className="dl-card tema7" style={{ '--c': COLOR[tema] }} href={href} target="_blank" rel="noreferrer"><b>{t}</b><i className="mono">abrir ↗</i></a>
          ))}
        </div>
      </section>
    </div>
  );
}
