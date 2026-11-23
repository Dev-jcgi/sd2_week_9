import { T, Portada, Code, Cards, Card, YCapstone, QR } from './piezas.jsx';
import { Receso, Agenda } from './extras.jsx';
import { DemoFlujo, DemoTiempo, SemverAnatomia, TagLinea, Triangulo, BarrasSprint, MatrizRiesgo, Entregables } from './diagramas10.jsx';
import { ACTIVIDADES } from '../data/actividades.js';
import Pregunta from '../components/Pregunta.jsx';
import Marcador from '../components/Marcador.jsx';
import { useSesion, respondieron } from '../lib/sesion.js';
import Podio from '../components/Podio.jsx';

/* Presentación de la Semana 9 · Desarrollo de Software 2.
   Cada columna (→) es un tema o una actividad; sus diapositivas (↓) profundizan.
   Caso real: el capstone Delivery System (Laboratorio 9, la versión 1.0.0 y la evaluación del 30/11, 1/12 y 2/12). */

const WIKI = 'https://gitlab.com/jala-university1/cohort-7/ES.CO.CSSD-125.GA.T2.26.M2/SE/capstone/-/wikis';
const Lista = ({ items, frag }) => <ul className="d-list">{items.map((x, i) => <li key={i} className={frag ? 'fragment' : ''}>{x}</li>)}</ul>;
const Tabla = ({ head, rows, small }) => (
  <table className={`d-tabla ${small ? 'sm' : ''}`}><thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
    <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody></table>
);
const Dos = ({ children, r = '1fr 1fr' }) => <div className="d-dos" style={{ gridTemplateColumns: r }}>{children}</div>;
const Analogia = ({ titulo, children }) => <div className="d-analogia"><span className="mono">Analogía</span><h3>{titulo}</h3>{children}</div>;
const Cita = ({ children, fuente }) => <blockquote className="d-cita"><p>{children}</p><cite className="mono">{fuente}</cite></blockquote>;
const M = ({ children }) => <span className="mono">{children}</span>;

/** Código de respaldo: abre la actividad en un celular que no logra conectarse a la sesión. */
const Codigo = ({ c, color, texto }) => <div className="d-codigo" style={{ '--c': color }}><span className="mono">{texto}</span><b>{c}</b></div>;

/** QR de la sesión: con la sesión creada (#/profesor) lleva su id; sin sesión, a #/vivo. */
function SesionQR({ size }) {
  const s = useSesion();
  return <QR ruta={s.id ? `#/vivo?s=${s.id}` : '#/vivo'} size={size} />;
}
/** Estado en vivo de la sesión (solo con la sesión creada). */
function EnVivo({ act }) {
  const s = useSesion();
  if (!s.id) return null;
  if (!s.abierta) return <p className="d-vivo mono off"><i /> Sesión cerrada</p>;
  const n = Object.keys(s.alumnos).length;
  return <p className="d-vivo mono"><i /> {act ? `${respondieron(s.alumnos, act)} de ${n} ya respondieron` : `${s.conectados} celulares conectados · ${n} en la sesión`}</p>;
}
/** Podio: el de la sesión (por nombre y equipo) o, sin sesión, el marcador manual de equipos. */
function PodioFinal() {
  const s = useSesion();
  return s.id ? <Podio alumnos={s.alumnos} /> : <Marcador />;
}

/* ── Actividades: portada con su código + una diapositiva por pregunta (modo pantalla, el profesor revela) ── */
function actividad(a) {
  return {
    id: a.id, titulo: `Actividad ${a.n}`, kind: 'act', act: a.id,
    slides: [
      <div className="d-act" style={{ '--c': a.color }} key="i">
        <p className="d-eti"><span className="pill">ACTIVIDAD {a.n} DE 4</span> {a.momento} · {a.min} min</p>
        <h1>{a.nombre}</h1>
        <Dos r="1.3fr 1fr">
          <div className="d-act-modos">
            <div><span className="mono">En tu celular</span><p>La actividad ya apareció en tu página de la sesión. Respondes y ves al momento si acertaste.</p></div>
            <div><span className="mono">En la pantalla</span><p>Cada equipo discute y responde en voz alta. El equipo que acierta suma puntos en el marcador.</p></div>
            <div className="d-act-items">{a.preguntas.map((q, i) => <div key={q.id}><span className="mono">{i + 1}</span><p>{q.q}</p></div>)}</div>
          </div>
          <div className="d-act-qr"><SesionQR size={190} /><p className="mono">¿Recién llegas? Escanea y entra</p><EnVivo act={a.id} /><Codigo c={a.codigo} color={a.color} texto="Si no conecta: código" /></div>
        </Dos>
      </div>,
      ...a.preguntas.map((q) => (
        <div className="d-pant" key={q.id}>
          <Pregunta q={q} modo="pantalla" />
          <Marcador compact />
        </div>
      )),
    ],
  };
}
const ACT = Object.fromEntries(ACTIVIDADES.map((a) => [a.id, actividad(a)]));

export const COLS = [
  /* ───────────── INICIO ───────────── */
  { id: 'inicio', titulo: 'Inicio', slides: [
    <div className="d-hero" key="p">
      <p className="d-eti">Desarrollo de Software 2 · Sección E · Semana 9</p>
      <h1>De la demo a la <em>versión 1.0</em></h1>
      <p className="d-preg">Qué se entrega en el Laboratorio 9, cómo se prepara la demo, cómo se publica la versión 1.0.0 y cómo se evalúa a cada uno el 30/11, el 1/12 y el 2/12.</p>
      <div className="d-hero-tags mono"><span>Lab 9</span><span>Demo</span><span>v1.0.0</span><span>Congelamiento</span><span>Evaluación</span></div>
      <p className="d-nav mono">→ avanzar · ↓ profundizar · P marcador · ESC vista general</p>
    </div>,
    <>
      <T eti="Agenda">Dos horas para cerrar el proyecto</T>
      <Agenda />
      <p className="d-sub">Receso de 10 minutos a la mitad. Las actividades suman puntos por equipo: A, B, C y D.</p>
    </>,
    <>
      <T eti="Entra a la sesión">Un solo código QR para toda la clase</T>
      <Dos r="1fr 1fr">
        <div className="d-act-qr"><SesionQR size={300} /><p className="mono">un solo código para toda la clase</p><EnVivo /></div>
        <Cards cols={1}>
          <Card t="1 · Escanea y entra" c="#FF8A3D">Escribe tu nombre y elige tu equipo. No hay que instalar nada.</Card>
          <Card t="2 · No cierres la página" c="#6EA8FF">Cuando lleguemos a una actividad, aparece sola en tu celular.</Card>
          <Card t="3 · Al final, tu resumen" c="#C6F33A">Cuando el profesor cierra la sesión, ves tus puntos por actividad.</Card>
        </Cards>
      </Dos>
    </>,
    <>
      <T eti="El hilo de hoy">Lo que queda hasta el final del curso</T>
      <Tabla head={['Fecha', 'Qué', 'Quién']} rows={[
        ['Hasta el miércoles 25/11', 'Reunión de SM: congelamiento de main (acta e issue de Acuerdo)', 'Los 4 SM'],
        ['Ese mismo día', 'MR del practitioner: todos los pom.xml a 1.0.0', 'Practitioner'],
        ['Viernes 27/11', 'Ensayo completo desde main, con -Pjpa y la base vacía', 'Todos'],
        ['Domingo 29/11, 23:59', 'Entrega del Laboratorio 9 (demo y release)', 'Cada equipo'],
        ['Lunes 30/11', 'Demo del producto y tag v1.0.0', 'Todos'],
        ['Martes 1/12', 'Revisión técnica individual', 'Cada estudiante'],
        ['Miércoles 2/12', 'Sesión conjunta con otra sección y otro practitioner', 'Todos'],
      ]} />
    </>,
  ] },

  ACT.a1,

  /* ───────────── TEMA 1 · LA DEMO (LAB 9 · ACTIVIDAD 1) ───────────── */
  { id: 't1', tema: 't1', titulo: 'Demo', slides: [
    <Portada key="p" tema="t1" pregunta="Si el Product Owner solo pudiera ver 15 minutos de su trabajo, ¿qué le mostrarían?" />,
    <>
      <T tema="t1" eti="Definición">¿Qué es una demo del producto?</T>
      <Dos r="1.2fr 1fr">
        <div className="d-def">
          <Cita fuente="The Scrum Guide (2020) · Sprint Review">El propósito de la Sprint Review es inspeccionar el resultado del sprint y determinar adaptaciones futuras. El equipo presenta los resultados de su trabajo a los interesados clave.</Cita>
          <p>La <b>demo final</b> es la Sprint Review del proyecto: se muestra el <b>software funcionando</b>, no diapositivas del código.</p>
        </div>
        <Cards cols={1}>
          <Card t="Para el PO" c="#FF8A3D">¿Hace lo que pedían los requerimientos (FUN e INT)?</Card>
          <Card t="Para el equipo" c="#6EA8FF" frag>Demostrar que entiende y puede defender lo que construyó.</Card>
        </Cards>
      </Dos>
    </>,
    <>
      <T tema="t1" eti="Analogía">La prueba de manejo</T>
      <Dos>
        <Analogia titulo="Nadie compra un auto por su folleto">
          <p>En una concesionaria no te leen la ficha técnica: te dan las llaves y das una vuelta. Lo que convence es manejarlo.</p>
          <p className="fragment">La demo es esa vuelta: el PO ve el flujo real, con datos reales, de principio a fin.</p>
        </Analogia>
        <Cards cols={1}>
          <Card t="El folleto = las diapositivas" c="#9298AA" frag>Sirven para el contexto: un minuto, no más.</Card>
          <Card t="La vuelta = el flujo en vivo" c="#C6F33A" frag>Es lo que se evalúa.</Card>
        </Cards>
      </Dos>
    </>,
    <>
      <T tema="t1" eti="Diagrama">El flujo de punta a punta del Delivery System</T>
      <DemoFlujo />
      <p className="d-sub">Cada paso cruza un contrato de <M>core</M>. La demo corre con los <b>módulos reales</b>; si un contrato no llegó a <M>main</M>, se usa su <i>fallback</i> y se dice en voz alta, no se esconde.</p>
    </>,
    <>
      <T tema="t1" eti="Diagrama">El guion de una demo de 15 minutos</T>
      <DemoTiempo />
    </>,
    <>
      <T tema="t1" eti="Laboratorio 9 · Actividad 1">Lo que se entrega el domingo 29/11</T>
      <Tabla head={['Entregable', 'Dónde', 'Qué contiene']} rows={[
        ['Borrador de las diapositivas', 'Canvas (E.9)', 'Qué problema resuelve el módulo, quién lo usa, historias terminadas, contrato que ofrece y cuál consume'],
        ['Página Demo', <M>Modulos/&lt;módulo&gt;/Demo</M>, 'Enlace a las diapositivas, reparto de los 15 minutos por integrante y datos de prueba'],
        ['Errores de la semana', 'Issue (plantilla Bug) y MR', <>Lista en la página Demo: cada error con su issue y su rama <M>ISSUE-&lt;n&gt;/bug/…</M></>],
        ['Prueba con MySQL', 'Seguimiento/Integracion', 'Flujo feliz y un caso alterno probados con -Pjpa y la base vacía'],
      ]} />
    </>,
    <>
      <T tema="t1" eti="Preparación">Lo que se prepara antes del 30/11</T>
      <Cards cols={3}>
        <Card t="El build de la demo" c="#C6F33A">Desde <M>main</M>: el commit ensayado el 27/11, el mismo que lleva el tag <M>v1.0.0</M>. Nunca la rama de alguien.</Card>
        <Card t="MySQL y base vacía" c="#6EA8FF" frag><M>docker compose up -d</M> y <M>./mvnw javafx:run -Pjpa</M>. Se demuestra con la persistencia real, no en memoria.</Card>
        <Card t="Datos de prueba" c="#FF8A3D" frag><M>SampleUsers</M>, <M>SampleCatalog</M> y <M>SamplePaymentMethods</M>: los mismos ids en todos los módulos.</Card>
        <Card t="Ensayo cronometrado" c="#B78CFF" frag>El viernes 27/11, de punta a punta y con el tiempo medido.</Card>
        <Card t="Plan B" c="#FF6B8B" frag>La grabación del ensayo y un segundo juego de datos por si uno falla.</Card>
        <Card t="Roles" c="#FFD166" frag>Quién conduce, quién muestra cada parte y quién responde qué. Todos hablan.</Card>
      </Cards>
    </>,
    <>
      <T tema="t1" eti="E.10 · Actividad 1 (40 %)">Cómo se califica la demo</T>
      <Cards cols={3}>
        <Card t="Demo funcional desde main · 15" c="#C6F33A">Corre con MySQL y los módulos reales: flujo feliz, un caso alterno y la integración con otro módulo, sin errores.</Card>
        <Card t="Cobertura y documentación · 10" c="#6EA8FF" frag>Historias terminadas, contratos que ofrece y consume, y la wiki del módulo completa desde el Sprint 1 hasta la demo.</Card>
        <Card t="Presentación y tiempo · 15" c="#FF8A3D" frag>Organizada, dentro de los 15 minutos y con la participación de todos.</Card>
      </Cards>
      <p className="d-sub fragment">La nota de la demo es la misma para todo el equipo. El otro 60 % es individual: la revisión técnica (tema 4).</p>
    </>,
    <>
      <T tema="t1" eti="Errores frecuentes">Lo que arruina una demo</T>
      <Tabla head={['Error', 'Qué hacer en cambio']} rows={[
        ['Mostrar el IDE y leer código', 'Mostrar la app; el código se abre solo si lo preguntan'],
        ['Datos que se crean en vivo durante 5 minutos', 'Los datos de prueba ya cargados al arrancar'],
        ['«Esto funcionaba ayer»', 'Probar el build de main el mismo día'],
        ['Demostrar en memoria porque MySQL falla', 'Probar -Pjpa en el ensayo del 27/11 y corregir con un Bug antes del 29/11'],
        ['Una persona hace toda la demo', 'Cada integrante muestra su parte y responde por ella'],
        ['Esconder lo que falta', 'Decir qué falta y qué se usó en su lugar (fallback)'],
      ]} />
    </>,
    <YCapstone key="y" tema="t1" items={[
      ['…el contrato de otro equipo no llega a main antes del 30/11?', 'La demo corre con el fallback de core y se explica qué falta y por qué.'],
      ['…en el ensayo del 27/11 aparece un error?', 'Issue con la plantilla Bug, rama ISSUE-<n>/bug/… y MR a main: después del congelamiento solo entran correcciones.'],
      ['…el PO pregunta por una decisión de diseño?', 'Responde quien la tomó: el patrón, el contrato o la regla, con su porqué.'],
    ]} tarea="página Demo del módulo completa, diapositivas en Canvas, datos de prueba listos, ensayo del 27/11 con -Pjpa y su grabación como plan B." />,
  ] },

  /* ───────────── TEMA 2 · LA VERSIÓN 1.0.0 (LAB 9 · ACTIVIDAD 2) ───────────── */
  { id: 't2', tema: 't2', titulo: 'Versiones', slides: [
    <Portada key="p" tema="t2" pregunta="El PO dice «en la demo no funcionaba». ¿Qué versión estaba corriendo?" />,
    <>
      <T tema="t2" eti="El problema">Sin número de versión, nadie sabe qué está corriendo</T>
      <Cards cols={3}>
        <Card t="¿Qué se probó?" c="#FF6B8B">«La de la rama de Juan del martes» no se puede reproducir.</Card>
        <Card t="¿Qué cambió?" c="#FFD166" frag>Entre dos entregas sin número, nadie sabe qué se agregó o qué se rompió.</Card>
        <Card t="¿Se puede actualizar?" c="#6EA8FF" frag>Un módulo que depende de otro necesita saber si la versión nueva es compatible.</Card>
      </Cards>
    </>,
    <>
      <T tema="t2" eti="Definición">Semantic Versioning (SemVer 2.0.0)</T>
      <SemverAnatomia />
      <p className="d-sub fragment"><b>0.y.z</b> es desarrollo inicial: todo puede cambiar. <b>1.0.0</b> define la primera versión pública y estable: desde ahí, romper un contrato sube el MAJOR.</p>
    </>,
    <>
      <T tema="t2" eti="Reglas">Cómo sube cada número</T>
      <Tabla head={['Cambio', 'Ejemplo en el capstone', 'De 1.4.2 pasa a']} rows={[
        ['Se corrige un error sin cambiar contratos', 'La barra de la lista de usuarios se cortaba (#102)', '1.4.3'],
        ['Se agrega algo compatible', 'CatalogService.findAvailableProducts() con default (#115)', '1.5.0'],
        ['Se rompe un contrato', 'Quitar FallbackCatalogService.AVAILABLE_PRODUCT (#145)', '2.0.0'],
        ['Versión candidata antes de publicar', 'Lo que se ensaya el 27/11', '2.0.0-rc.1'],
      ]} />
      <p className="d-sub fragment">Al subir un número, los de la derecha vuelven a 0: 1.4.2 → 1.5.0, nunca 1.5.2. Antes de 1.0.0 (como #145) un cambio así sube el MINOR.</p>
    </>,
    <>
      <T tema="t2" eti="Diagrama">Los tags del capstone</T>
      <TagLinea />
      <p className="d-sub fragment">Un tag por cierre de sprint, en el último commit de <M>main</M> antes de las 23:59 (UTC-4). Lo crea el practitioner; <b>v1.0.0</b> se crea el 30/11 sobre el commit ensayado.</p>
    </>,
    <>
      <T tema="t2" eti="GitHub Flow">La versión sin rama release permanente</T>
      <Dos r="1.2fr 1fr">
        <Code small lang="bash" titulo="del congelamiento a v1.0.0">{`
main ──●── congelamiento (acuerdo de SM, hasta el 25/11)
       ├── MR del practitioner: todos los pom.xml a 1.0.0
       ├── FEAT-<n>/release/<módulo>-1.0.0  → MR → main
       ├── ISSUE-<n>/bug/<descripción>      → MR → main
       ●── ensayo del 27/11
       ●── tag v1.0.0 (30/11) → Release en GitLab`}</Code>
        <Lista frag items={[
          <><M>main</M> es la única rama permanente; todo entra con un MR.</>,
          <><b>Congelamiento</b>: desde el acuerdo de SM solo entran correcciones y ramas de versión. Ninguna historia nueva.</>,
          <>El tag va sobre el <b>mismo commit</b> que se ensayó: lo que se prueba es lo que se demuestra.</>,
        ]} />
      </Dos>
    </>,
    <>
      <T tema="t2" eti="Maven">La versión dentro del pom.xml</T>
      <Dos>
        <Code small lang="xml" titulo="order-module/pom.xml y delivery-system/pom.xml">{`
<!-- módulo: su versión y la de core -->
<version>1.0.0</version>
<core-module.version>1.0.0</core-module.version>

<!-- delivery-system: la versión exacta de cada módulo -->
<order-module.version>1.0.0</order-module.version>`}</Code>
        <div className="d-def">
          <p><b>SNAPSHOT</b> significa «en desarrollo»: Maven la puede reemplazar en cada build. Una versión <b>sin SNAPSHOT</b> es fija: el mismo número siempre es el mismo jar.</p>
          <p className="fragment"><M>assemble-system</M> pide la <b>versión exacta</b> de cada módulo. Si un módulo sube y <M>delivery-system</M> no, el build de <M>main</M> falla.</p>
          <p className="fragment">Por eso <b>todos los pom.xml los cambia el practitioner</b> en un solo MR el día del congelamiento. <M>user-module</M> y <M>delivery-system</M> ya están en 1.0.0 (!118).</p>
        </div>
      </Dos>
    </>,
    <>
      <T tema="t2" eti="Pipeline">El pipeline verifica y publica la versión</T>
      <Tabla head={['Job', 'Cuándo corre', 'Qué hace']} rows={[
        [<M>check-release-versions</M>, <>En <M>main</M> y en las ramas <M>…/release/…</M></>, 'Lista los pom.xml que no están en 1.0.0 o dependen de un SNAPSHOT. Solo avisa: no bloquea.'],
        [<M>check-release-versions</M>, <>Con el tag <M>v1.0.0</M></>, 'Bloquea: si falta un módulo, no hay Release.'],
        [<M>lint-&lt;módulo&gt;</M>, 'En cada MR y en main', 'Desde el 23/11 es bloqueante: 0 infracciones.'],
        [<M>release-system</M>, <>Con un tag desde <M>v1.0.0</M></>, 'Publica el Release en GitLab con delivery-system.jar y los jars de los módulos.'],
      ]} />
    </>,
    <>
      <T tema="t2" eti="Laboratorio 9 · Actividad 2">Lo que hace cada equipo para su versión</T>
      <Lista frag items={[
        <>Issue «Release 1.0.0 de <M>&lt;módulo&gt;</M>» con la plantilla Historia: epic, hito de Integración, persona asignada y Weight.</>,
        <>Después del MR del practitioner: <M>git pull --rebase origin main</M> y rama <M>FEAT-&lt;n&gt;/release/&lt;módulo&gt;-1.0.0</M>.</>,
        <>Dejar listo el <b>pipeline del módulo</b>: <M>lint</M> en verde, cobertura ≥ 80 % en dominio y aplicación y el jar <M>&lt;módulo&gt;-1.0.0.jar</M>. Y el <b>README</b> del módulo.</>,
        <>MR hacia <M>main</M> con la plantilla Release, aprobado por el SM, con <M>Closes #n</M>.</>,
        <>Probar el artefacto: el jar de <M>assemble-system</M> con MySQL y la base vacía.</>,
        <>Notas de la versión en <M>Modulos/&lt;módulo&gt;/Release-1.0.0</M>: historias, errores corregidos, cobertura, contratos y cómo ejecutar.</>,
      ]} />
    </>,
    <YCapstone key="y" tema="t2" items={[
      ['…tu equipo cambia el pom.xml por su cuenta?', 'Se rompe assemble-system en main y se bloquea a todos: los pom.xml los cambia el practitioner.'],
      ['…se descubre un error en la demo después de crear v1.0.0?', 'Se corrige con un Bug y se publica v1.0.1. El tag v1.0.0 no se toca.'],
      ['…quieres probar exactamente lo que se mostró el 30/11?', 'git switch --detach v1.0.0 y construir desde ahí.'],
    ]} tarea="issue y rama de versión del módulo después del congelamiento, pipeline en verde con el jar 1.0.0 y la página Release-1.0.0 completa antes del 29/11." />,
  ] },

  { ...ACT.a2, slides: [...ACT.a2.slides, <Receso key="r" />] },

  /* ───────────── TEMA 3 · GESTIÓN DE LA SEMANA DE INTEGRACIÓN ───────────── */
  { id: 't3', tema: 't3', titulo: 'Gestión', slides: [
    <Portada key="p" tema="t3" pregunta="Quedan siete días y cuatro equipos dependen unos de otros: ¿quién decide qué entra a main?" />,
    <>
      <T tema="t3" eti="Definición">¿Qué es gestionar un proyecto de software?</T>
      <Dos r="1.2fr 1fr">
        <div className="d-def">
          <Cita fuente="PMI · PMBOK Guide, 7.ª ed. (2021)">Un proyecto es un esfuerzo temporal que se lleva a cabo para crear un producto, servicio o resultado único.</Cita>
          <p><b>Gestionarlo</b> es decidir qué se hace, en qué orden, con qué riesgos y cómo se sabe si va bien. En la última semana, la decisión más importante es <b>qué ya no entra</b>.</p>
        </div>
        <Cards cols={1}>
          <Card t="Durante los sprints" c="#9298AA">Se agregan historias y se ajusta el alcance cada sprint.</Card>
          <Card t="Antes de la entrega" c="#6EA8FF" frag>Se estabiliza: se prueba, se corrige y se publica la versión.</Card>
        </Cards>
      </Dos>
    </>,
    <>
      <T tema="t3" eti="Diagrama">La triple restricción</T>
      <Triangulo />
    </>,
    <>
      <T tema="t3" eti="Definición">El congelamiento (code freeze)</T>
      <Dos r="1.1fr 1fr">
        <div className="d-def">
          <p>Es el momento en que el equipo deja de agregar funcionalidad y solo <b>estabiliza</b>: desde ahí entran correcciones y los cambios de la versión.</p>
          <p className="fragment">En el capstone lo acuerdan los <b>4 SM</b> en su reunión (acta con grabación e issue de Acuerdo), <b>antes del 25/11</b>.</p>
          <p className="fragment">Sirve para que el código que se ensaya el 27/11 sea el mismo que se demuestra el 30/11.</p>
        </div>
        <Tabla small head={['Después del congelamiento', '¿Entra?']} rows={[
          ['Una corrección (ISSUE-<n>/bug/…)', 'Sí'],
          ['La rama de versión del módulo', 'Sí'],
          ['El MR del practitioner con los pom.xml', 'Sí'],
          ['Una historia nueva', 'No'],
          ['Un commit directo en main', 'Nunca'],
        ]} />
      </Dos>
    </>,
    <>
      <T tema="t3" eti="Cómo nos organizamos">Scrum con LeSS en la semana de integración</T>
      <Tabla head={['Pieza', 'En el capstone']} rows={[
        ['Hito', 'Integración, pruebas y demo: solo lo que se termina; lo demás vuelve al backlog'],
        ['Planning', 'Objetivo SMART de la semana en la epic del equipo'],
        ['Coordinación entre equipos', 'Reunión de SM con acta y un issue de Acuerdo por cada decisión'],
        ['Errores', 'Un issue con la plantilla Bug y una rama ISSUE-<n>/bug/…'],
        ['Registro', 'Actas en Actas/Integracion y avance en Seguimiento/Integracion'],
      ]} />
    </>,
    <>
      <T tema="t3" eti="Métricas">MR fusionados en main por sprint</T>
      <Dos r="1.1fr 1fr">
        <BarrasSprint />
        <div className="d-def">
          <p>Contado con <M>git rev-list --merges</M> entre los tags.</p>
          <p className="fragment"><b>Sprint 2</b> concentró el trabajo: se cerraron los contratos y muchas historias del Sprint 1.</p>
          <p className="fragment">En la integración la métrica cambia: <b>errores abiertos y cerrados</b>, pipelines de los módulos en <M>main</M> y contratos conectados.</p>
        </div>
      </Dos>
    </>,
    <>
      <T tema="t3" eti="Diagrama">Riesgos de esta semana</T>
      <Dos r="1.25fr 1fr">
        <MatrizRiesgo />
        <Lista frag items={[
          <><b>Evitar</b>: contratos con <i>fallback</i> en core, para que nadie quede bloqueado.</>,
          <><b>Reducir</b>: rebase y MR pequeños; el pipeline del MR en verde antes de fusionar.</>,
          <><b>Repartir</b>: cada integrante responde por una parte de la demo.</>,
          <><b>Vigilar</b>: el ensayo del 27/11 con MySQL, no el día de la demo.</>,
        ]} />
      </Dos>
    </>,
    <>
      <T tema="t3" eti="Lecciones">Lo que nos enseñó el capstone</T>
      <Cards cols={2}>
        <Card t="Lo que funcionó" c="#C6F33A">Contratos en core con fallback, el pipeline en cada MR, TDD con commits separados, la revisión de código entre compañeros.</Card>
        <Card t="Lo que costó" c="#FF6B8B" frag>Historias cerradas sin MR fusionado, hitos desordenados, actas sin grabación, objetivos SMART sin publicar, la reunión de SM.</Card>
        <Card t="Lo que cambia el resultado" c="#6EA8FF" frag>Historias pequeñas, integrar todos los días y que cada uno documente lo suyo el mismo día.</Card>
        <Card t="La regla de oro" c="#FFD166" frag>Si no está en GitLab o en la wiki, para el proyecto no pasó.</Card>
      </Cards>
    </>,
    <YCapstone key="y" tema="t3" items={[
      ['…los SM no acuerdan el congelamiento antes del 25/11?', 'Nadie puede subir la versión: no hay rama de versión ni Release. El acuerdo es la primera tarea de la semana.'],
      ['…un contrato no llega a main?', 'Se activa el plan: fallback, aviso en la reunión de SM y un issue para cerrarlo antes del ensayo.'],
      ['…una historia no se termina el 29/11?', 'Vuelve al backlog con el motivo y se dice en la demo. No se cierra sin MR.'],
    ]} tarea="acta de la reunión de SM con el congelamiento, objetivo SMART de la semana en la epic y Seguimiento/Integracion al día." />,
  ] },

  ACT.a3,

  /* ───────────── TEMA 4 · LA EVALUACIÓN FINAL ───────────── */
  { id: 't4', tema: 't4', titulo: 'Evaluación', slides: [
    <Portada key="p" tema="t4" pregunta="Si te piden cambiar una regla de negocio en vivo, ¿sabes en qué capa va?" />,
    <>
      <T tema="t4" eti="E.10 · Cronograma">Tres días de evaluación</T>
      <Tabla head={['Día', 'Qué se evalúa', 'Cómo']} rows={[
        ['Lunes 30/11 · 2 h', 'Demo del producto (equipo)', '15 min por equipo desde main con MySQL, y 5 min de preguntas: cada integrante responde al menos una de arquitectura'],
        ['Martes 1/12 · 2 h', 'Revisión técnica (individual)', 'Unos 8 min por estudiante en su máquina: su aporte, un cambio pequeño en vivo y las integraciones de su módulo'],
        ['Miércoles 2/12', 'Sesión conjunta', 'El producto integrado ante dos secciones; otro practitioner pregunta y sus observaciones se suman a la evaluación'],
      ]} />
      <p className="d-sub fragment">Requisito: el <b>75 %</b> de los labs 1 a 9 y del midterm. Quien no lo alcance y haya demostrado avance real en su trabajo individual puede presentar su desarrollo.</p>
    </>,
    <>
      <T tema="t4" eti="E.10 · Rúbrica">Cómo se reparten los 100 puntos</T>
      <Tabla head={['Actividad', 'Criterio', 'Pts']} rows={[
        ['1 · Demo (equipo)', 'Demo funcional desde main', '15'],
        ['', 'Cobertura de lo desarrollado y documentación (wiki del Sprint 1 a la demo)', '10'],
        ['', 'Presentación y tiempo', '15'],
        ['2 · Revisión técnica (individual)', 'Teoría y arquitectura', '15'],
        ['', 'Defensa de su aporte', '15'],
        ['', 'Implementación en vivo', '20'],
        ['', 'Integraciones', '10'],
      ]} small />
      <p className="d-sub fragment">Niveles: Muy bueno (completo) · Aceptable (≈ 2/3) · Necesita mejorar (≈ 1/3) · No se presentó (0).</p>
    </>,
    <>
      <T tema="t4" eti="E.10 · Documentación">La wiki completa, del Sprint 1 a la demo</T>
      <Tabla head={['Periodo', 'Páginas que deben estar completas']} rows={[
        ['Inicio del proyecto', '4Ps, Casos-de-uso, Plan-de-accion y POCs'],
        ['Sprints 1 a 4', 'Actas de cada sprint (Planning con objetivo SMART, Daily, Refinamiento, Review y Retrospectiva, con el enlace de cada reunión) y Seguimiento de cada sprint'],
        ['Laboratorios 6 a 8', 'Patrones, Pruebas-unitarias, Pipeline-CI, Revision-de-codigo y las páginas individuales de cada laboratorio'],
        ['Integración y demo', 'Actas/Integracion, Seguimiento/Integracion, Demo y Release-1.0.0'],
      ]} />
      <p className="d-sub fragment">Hasta el <b>domingo 29/11, 23:59</b>. Se revisa en el criterio de cobertura y documentación: la wiki debe coincidir con GitLab y con la demo. Ejemplo completo: <M>Modulos/Usuarios</M>.</p>
    </>,
    <>
      <T tema="t4" eti="Teoría">Arquitectura limpia y hexagonal</T>
      <Dos r="1fr 1.1fr">
        <div className="d-def">
          <Cita fuente="Robert C. Martin · Clean Architecture (2017)">Las dependencias del código fuente solo pueden apuntar hacia adentro. Nada en un círculo interno puede saber algo de un círculo externo.</Cita>
          <p className="fragment"><b>Hexagonal</b> (Cockburn, 2005): la aplicación habla con el mundo por <b>puertos</b> (interfaces) y el mundo se conecta con <b>adaptadores</b> (UI, base de datos, otros módulos).</p>
        </div>
        <Tabla small head={['Capa', 'Qué contiene', 'En el capstone']} rows={[
          ['Entidad', 'Datos y reglas de negocio', 'Product.disable(), Order.getDeliveryCode()'],
          ['Caso de uso', 'Un flujo de la aplicación', 'AddProductToCartUseCase, CancelOrderUseCase'],
          ['Puerto', 'Interfaz que el caso de uso necesita u ofrece', 'CartRepositoryPort · CatalogService (contrato de core)'],
          ['Adaptador', 'Implementación técnica del puerto', 'InMemory… · OrderPersistenceAdapter (JPA) · controladores JavaFX'],
        ]} />
      </Dos>
    </>,
    <>
      <T tema="t4" eti="Teoría">Puertos y adaptadores entre módulos</T>
      <Dos r="1.2fr 1fr">
        <Code small lang="java" titulo="core-module y catalog-module">{`
// core-module: el contrato (puerto) que consumen los demás
public interface CatalogService {
    Optional<ProductInfo> findProduct(UUID productId);
    default List<ProductInfo> findAvailableProducts() { return List.of(); }
}

// core-module: respaldo si catalog-module no está
public class FallbackCatalogService implements CatalogService { ... }

// catalog-module: el adaptador real
public class CatalogServiceAdapter implements CatalogService { ... }`}</Code>
        <Lista frag items={[
          <>Order depende del <b>contrato</b>, nunca de <M>catalog-module</M>.</>,
          <>Sin el módulo real, arranca el <b>fallback</b>: la app no se cae.</>,
          <>En persistencia pasa lo mismo: adaptador en memoria o JPA; <M>MissingJpaAdaptersAutoConfiguration</M> cubre los que faltan.</>,
        ]} />
      </Dos>
    </>,
    <>
      <T tema="t4" eti="Implementación en vivo">Cómo resolver un cambio pequeño en 8 minutos</T>
      <Dos r="1fr 1.1fr">
        <Lista frag items={[
          <><b>Ubica la capa</b>: ¿es una regla (entidad), un flujo (caso de uso), un dato que falta (puerto y adaptador) o un contrato (integración)?</>,
          <><b>Rama</b>: <M>FEAT-&lt;n&gt;/…</M> desde <M>main</M> actualizado.</>,
          <><b>Prueba primero</b>: escríbela y mírala fallar (rojo).</>,
          <><b>El código mínimo</b> para que pase (verde) y, si hace falta, refactor.</>,
          <><b>Commit</b> <M>FEAT-&lt;n&gt;: …</M> y explica qué hiciste y por qué en esa capa.</>,
        ]} />
        <Code small lang="java" titulo="ejemplo · regla en la entidad">{`
@Test
void cannotCancelADeliveredOrder() {
    Order order = deliveredOrder();
    assertThrows(DomainException.class,
        () -> order.cancel("ya no lo quiero"));
}

// Order.java
public void cancel(String reason) {
    if (status == OrderStatus.DELIVERED) {
        throw new DomainException("A delivered order cannot be cancelled");
    }
    ...
}`}</Code>
      </Dos>
    </>,
    <>
      <T tema="t4" eti="Preguntas de ejemplo">Lo que te pueden preguntar</T>
      <Lista frag items={[
        <>¿Por qué <M>CatalogService</M> está en <M>core-module</M> y <M>CatalogServiceAdapter</M> en <M>catalog-module</M>?</>,
        <>¿Dónde va la regla «un comercio deshabilitado no se modifica»: en la entidad o en el caso de uso?</>,
        <>¿Qué cambia entre el adaptador en memoria y el JPA? ¿Qué pruebas pasan con los dos?</>,
        <>¿Por qué <M>TransactionRunner</M> es un puerto de core y no se usa <M>@Transactional</M> en el caso de uso?</>,
        <>¿Qué contrato ofrece tu módulo, cuál consume y qué pasa si el otro módulo no está?</>,
      ]} />
      <p className="d-sub">Todas las preguntas y los ejemplos de ejercicios por equipo: <b>jcgi.lat/sd2_pendientes/evaluacion-final.html</b>.</p>
    </>,
    <>
      <T tema="t4" eti="Diagrama">Qué se entrega y dónde</T>
      <Entregables />
    </>,
    <>
      <T tema="t4" eti="DoD del proyecto">El proyecto está terminado cuando…</T>
      <Lista frag items={[
        <>Los <b>requerimientos FUN e INT</b> del módulo tienen historia cerrada con su MR fusionado, o se explica por qué quedaron fuera.</>,
        <>El <b>pipeline de main está en verde</b>: linter con 0 infracciones, pruebas y cobertura ≥ 80 % en dominio y aplicación.</>,
        <><M>delivery-system</M> <b>arranca con MySQL</b> y todos los módulos, y el flujo de punta a punta funciona.</>,
        <>La <b>wiki del módulo</b> está completa desde el Sprint 1 hasta la demo, incluidas Demo y Release-1.0.0 (hasta el 29/11).</>,
        <>Existe el <b>tag v1.0.0</b> y su <b>Release</b> con las notas de la versión.</>,
      ]} />
    </>,
    <YCapstone key="y" tema="t4" items={[
      ['…en la revisión técnica no sabes en qué capa va el cambio?', 'Pregúntate quién decide la regla: si es el negocio, va en la entidad; si es el orden de los pasos, en el caso de uso.'],
      ['…te preguntan por código que no escribiste?', 'Explica cómo se integra con el tuyo: el contrato y el puerto. Del tuyo, cada línea.'],
      ['…el ejercicio en vivo no compila?', 'Lee el error en voz alta y explica qué intentabas: también se evalúa cómo razonas.'],
    ]} tarea="cada integrante repasa su código, sus MR y los contratos de su módulo, y practica un cambio pequeño con prueba primero." />,
  ] },

  ACT.a4,

  /* ───────────── CIERRE ───────────── */
  { id: 'cierre', titulo: 'Cierre', slides: [
    <>
      <T eti="Cierre">Cuatro ideas para llevarse</T>
      <div className="d-ocho cinco">
        {[
          ['01', 'La demo muestra software funcionando desde main, con MySQL, un guion y un plan B.', '#FF8A3D'],
          ['02', 'La versión 1.0.0 se prepara con GitHub Flow: congelamiento, MR pequeños y un tag sobre lo ensayado.', '#C6F33A'],
          ['03', 'Antes de entregar se estabiliza: el alcance se congela, la calidad no se negocia.', '#6EA8FF'],
          ['04', 'En la revisión cuenta lo que sabes explicar y cambiar de tu propio código.', '#B78CFF'],
        ].map(([n, t, c]) => <div key={n} className="fragment" style={{ borderColor: c }}><span className="mono" style={{ color: c }}>{n}</span><p>{t}</p></div>)}
      </div>
    </>,
    <>
      <T eti="Referencias">Para seguir leyendo</T>
      <Dos>
        <Lista items={[
          <>Wiki del capstone: <a href={`${WIKI}/Gu%C3%ADas/Laboratorio-semana-9`} target="_blank" rel="noreferrer">guía del Laboratorio semana 9</a>.</>,
          <>Evaluación final: <a href="https://jcgi.lat/sd2_pendientes/evaluacion-final.html" target="_blank" rel="noreferrer">qué se evalúa, rúbrica y preguntas</a>.</>,
          <>Entrega del Lab 9: <b>domingo 29/11</b>. Demo: <b>lunes 30/11</b>.</>,
        ]} />
        <ul className="d-refs">
          <li>Schwaber, K. y Sutherland, J. (2020). The Scrum Guide.</li>
          <li>Preston-Werner, T. Semantic Versioning 2.0.0. semver.org</li>
          <li>Martin, R. C. (2017). Clean Architecture.</li>
          <li>Cockburn, A. (2005). Hexagonal Architecture (Ports and Adapters).</li>
          <li>Larman, C. y Vodde, B. (2016). Large-Scale Scrum (LeSS).</li>
          <li>PMI (2021). PMBOK Guide, 7.ª edición.</li>
          <li>GitLab Docs · Tags and Releases.</li>
        </ul>
      </Dos>
    </>,
    <div className="d-final" key="f">
      <p className="d-eti">Fin de la clase</p>
      <h1>¡Gracias! Este es el <em>podio</em></h1>
      <PodioFinal />
    </div>,
  ] },
];

export const TEMA_COL = Object.fromEntries(COLS.map((c, i) => [c.tema, i]).filter(([k]) => k));
export const ACT_COL = Object.fromEntries(COLS.map((c, i) => [c.act, i]).filter(([k]) => k));
