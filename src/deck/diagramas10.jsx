/* Diagramas animados de la Semana 10 (HTML + CSS). Animaciones en semana10.css bajo `.present`;
   --d = retraso de cada pieza en segundos. */

const d = (s) => ({ '--d': `${s}s` });

/** El flujo de punta a punta del Delivery System que se muestra en la demo. */
export function DemoFlujo() {
  const pasos = [
    ['Cliente', 'Arma el carrito con productos disponibles', 'catalog + order', 'CatalogService', '#C6F33A'],
    ['Pedido', 'Confirma el pedido y su dirección', 'order-module', 'UserService', '#6EA8FF'],
    ['Pago', 'Autoriza el pago con su método', 'payment-module', 'PaymentService', '#B78CFF'],
    ['Comercio', 'Marca el pedido como listo para entrega', 'order-module', 'OrderService', '#6EA8FF'],
    ['Repartidor', 'Toma el pedido y lo entrega con el código', 'delivery-module', 'OrderService', '#FF8A3D'],
  ];
  return (
    <div className="dg10-flow">
      {pasos.map(([t, p, m, c, col], i) => (
        <div key={t} className="dg10-step" style={{ '--c': col, ...d(0.2 + i * 0.5) }}>
          <span className="mono n">{i + 1}</span>
          <b>{t}</b>
          <p>{p}</p>
          <span className="mono mod">{m}</span>
          <span className="mono con">{c}</span>
          {i < pasos.length - 1 && <i>→</i>}
        </div>
      ))}
    </div>
  );
}

/** El guion de una demo de 15 minutos. */
export function DemoTiempo() {
  const partes = [
    [2, 'Contexto', 'Qué problema resuelve el módulo y quién lo usa', '#9298AA'],
    [6, 'Flujo feliz', 'De punta a punta, con datos de prueba preparados', '#C6F33A'],
    [2, 'Un caso alterno', 'Una regla que rechaza (sin stock, pago rechazado, código incorrecto)', '#FFD166'],
    [2, 'Integración', 'Qué contrato ofrece y cuál consume; qué pasa si el otro módulo falla', '#6EA8FF'],
    [3, 'Preguntas', 'Todos responden: código, decisiones y proceso', '#B78CFF'],
  ];
  return (
    <div className="dg10-time">
      <div className="bar">
        {partes.map(([m, t, , c], i) => <div key={t} style={{ flex: m, '--c': c, ...d(0.2 + i * 0.35) }}><b className="mono">{m} min</b></div>)}
      </div>
      <div className="rows">
        {partes.map(([m, t, p, c], i) => (
          <div key={t} className="row" style={{ '--c': c, ...d(0.4 + i * 0.35) }}><i /><b>{t}</b><span>{p}</span></div>
        ))}
      </div>
    </div>
  );
}

/** Anatomía de una versión semántica. */
export function SemverAnatomia() {
  const partes = [
    ['1', 'MAJOR', 'Cambio incompatible: algo que usaba otro módulo deja de funcionar', '#FF6B8B'],
    ['4', 'MINOR', 'Funcionalidad nueva y compatible', '#C6F33A'],
    ['2', 'PATCH', 'Corrección compatible de un error', '#6EA8FF'],
  ];
  return (
    <div className="dg10-semver">
      <div className="num">
        {partes.map(([n, , , c], i) => (
          <span key={i} style={{ '--c': c, ...d(0.2 + i * 0.4) }}>{n}{i < 2 && <em>.</em>}</span>
        ))}
      </div>
      <div className="parts">
        {partes.map(([n, t, p, c], i) => (
          <div key={t} style={{ '--c': c, ...d(0.5 + i * 0.4) }}><b className="mono">{t}</b><p>{p}</p></div>
        ))}
      </div>
    </div>
  );
}

/** Los tags del capstone en el tiempo. */
export function TagLinea() {
  const tags = [
    ['v0.1.0', '03/10', 'Base: core, user y el pipeline', 'hecho'],
    ['v0.2.0', '01/11', 'Cierre del Sprint 1 · 11 MR', 'hecho'],
    ['v0.3.0', '08/11', 'Cierre del Sprint 2 · 50 MR', 'hecho'],
    ['v0.4.0', '15/11', 'Cierre del Sprint 3 · 16 MR', 'hecho'],
    ['v0.5.0', '22/11', 'Cierre del Sprint 4 · 18 MR', 'hecho'],
    ['v1.0.0', '30/11', 'La demo: primera versión estable', 'meta'],
  ];
  return (
    <div className="dg10-tags">
      <div className="line"><i /></div>
      {tags.map(([t, f, p, k], i) => (
        <div key={t} className={`tag ${k}`} style={d(0.3 + i * 0.35)}>
          <span className="dot" />
          <b className="mono">{t}</b>
          <span className="mono f">{f}</span>
          <p>{p}</p>
        </div>
      ))}
    </div>
  );
}

/** Triple restricción y cómo la resuelve Scrum. */
export function Triangulo() {
  return (
    <div className="dg10-tri">
      <svg viewBox="0 0 600 520" width="600" height="520" aria-label="Triángulo de alcance, tiempo y costo con la calidad al centro">
        <polygon className="tri" points="300,40 560,480 40,480" fill="none" stroke="#6EA8FF" strokeWidth="6" />
      </svg>
      <p className="v top" style={d(0.6)}><b>Alcance</b><br />qué se construye</p>
      <p className="v left" style={d(0.8)}><b>Tiempo</b><br />cuándo se entrega</p>
      <p className="v right" style={d(1.0)}><b>Costo</b><br />personas y esfuerzo</p>
      <p className="v mid" style={d(1.3)}><b>Calidad</b></p>
      <div className="scrum" style={d(1.7)}>
        <b>En Scrum</b>
        <p>El <b>tiempo</b> (sprints de fecha fija) y el <b>costo</b> (el equipo) quedan fijos. Lo que se ajusta es el <b>alcance</b>: qué historias entran en cada sprint. La calidad no se negocia: es la DoD.</p>
      </div>
    </div>
  );
}

/** MR fusionados por sprint en el capstone. */
export function BarrasSprint() {
  const s = [['Sprint 1', 11, '2 semanas'], ['Sprint 2', 50, '1 semana'], ['Sprint 3', 16, '1 semana'], ['Sprint 4', 18, '1 semana']];
  const max = 50;
  return (
    <div className="dg10-bars">
      {s.map(([n, v, nota], i) => (
        <div key={n} className="col" style={d(0.2 + i * 0.3)}>
          <b className="mono">{v}</b>
          <div className="bar"><i style={{ height: `${(v / max) * 100}%` }} /></div>
          <span>{n}</span>
          <em className="mono">{nota}</em>
        </div>
      ))}
    </div>
  );
}

/** Matriz de riesgos con riesgos reales del capstone. */
export function MatrizRiesgo() {
  const riesgos = [
    ['OrderService sin fusionar bloquea a Entregas', 2, 2],
    ['Pipelines de los módulos sin fusionar', 2, 1],
    ['Sin acuerdo de congelamiento antes del 25/11', 1, 2],
    ['La demo con MySQL sin ensayar', 1, 2],
    ['Un integrante no puede explicar su código', 1, 1],
  ];
  const nivel = (p, i) => (p + i >= 3 ? 'alto' : p + i >= 2 ? 'medio' : 'bajo');
  return (
    <div className="dg10-risk">
      <p className="ylab mono">probabilidad →</p>
      <div className="grid">
        {[2, 1, 0].map((p) => [0, 1, 2].map((im) => (
          <div key={`${p}${im}`} className={`cell ${nivel(p, im)}`}>
            {riesgos.filter((r) => r[1] === p && r[2] === im).map(([t], k) => <span key={t} style={d(0.3 + k * 0.3 + p * 0.2)}>{t}</span>)}
          </div>
        )))}
      </div>
      <p className="xlab mono">impacto →</p>
    </div>
  );
}

/** Los entregables del proyecto, por lugar. */
export function Entregables() {
  const grupos = [
    ['Repositorio', '#C6F33A', ['Código de los 4 módulos en main', 'Pipeline en verde: lint, pruebas, cobertura, artefactos', 'Tag v1.0.0 en el commit de la demo']],
    ['Wiki del módulo', '#6EA8FF', ['4P’s, casos de uso, actas y Seguimiento de cada sprint', 'Patrones, Pruebas-unitarias, Pipeline-CI y Revision-de-codigo', 'Demo y Release-1.0.0 (Lab 9)']],
    ['Release y evaluación', '#B78CFF', ['Release v1.0.0 con el jar de delivery-system', 'Diapositivas de la demo en Canvas', 'Demo (30/11), revisión técnica (1/12) y sesión conjunta (2/12)']],
  ];
  return (
    <div className="dg10-ent">
      {grupos.map(([t, c, items], i) => (
        <div key={t} className="grp" style={{ '--c': c, ...d(0.2 + i * 0.5) }}>
          <b>{t}</b>
          {items.map((x, k) => <p key={x} style={d(0.5 + i * 0.5 + k * 0.2)}><i>✓</i>{x}</p>)}
        </div>
      ))}
    </div>
  );
}
