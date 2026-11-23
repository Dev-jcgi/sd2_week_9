import { T, Portada, Arch, Code, Cards, Card, YPixPro as YCapstone } from './piezas.jsx';
import { Receso, Agenda } from './extras.jsx';
import { ACTIVIDAD } from '../data/actividades.js';
import { QRClase, PreguntaSlide } from './vivo.jsx';
import Recorte from '../components/Recorte.jsx';
import Versionador from '../components/Versionador.jsx';
import Semaforo from '../components/Semaforo.jsx';
import EnsayoDemo from '../components/EnsayoDemo.jsx';

/* Presentación de la Semana 9 · DS2 · Cerrar el proyecto: del Sprint 4 a la demo final del Capstone Delivery System.
   Hilo: «quedan pocos días para la demo del 30/11 y todos los pom.xml dicen 0.0.1-SNAPSHOT».
   Orden: gestionar la recta final → versionar lo que se entrega → definir los entregables → demostrarlo.
   Cada columna (→) es un tema o una actividad; sus diapositivas (↓) profundizan. */

const Lista = ({ items, frag }) => <ul className="d-list">{items.map((x, i) => <li key={i} className={frag ? 'fragment' : ''}>{x}</li>)}</ul>;
const Tabla = ({ head, rows, small }) => (
  <table className={`d-tabla ${small ? 'sm' : ''}`}><thead><tr>{head.map((h) => <th key={h}>{h}</th>)}</tr></thead>
    <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody></table>
);
const Dos = ({ children, r = '1fr 1fr' }) => <div className="d-dos" style={{ gridTemplateColumns: r }}>{children}</div>;
const Analogia = ({ titulo, children }) => <div className="d-analogia"><span className="mono">Analogía</span><h3>{titulo}</h3>{children}</div>;
const Puente = ({ children }) => <p className="d-puente"><span className="mono">Siguiente →</span> {children}</p>;
const Dato = ({ n, t, c }) => <div className="d-dato" style={{ '--c': c }}><b>{n}</b><span>{t}</span></div>;

function Actividad({ id, como }) {
  const a = ACTIVIDAD[id];
  return (
    <div className="d-act" style={{ '--c': a.color }}>
      <p className="d-eti"><span className="pill">ACTIVIDAD {a.n} DE 4</span> {a.momento} · {a.min} min</p>
      <h1>{a.nombre}</h1>
      <Dos r="1.3fr 1fr">
        <div className="d-act-modos">
          <div><span className="mono">Cómo funciona</span><p>Si ya entraste a la clase, no escanees otra vez: las preguntas te llegan solas al celular, cada una con su tiempo.</p></div>
          <div><span className="mono">Al terminar el tiempo</span><p>Se revela la respuesta en la pantalla y en tu celular, con la explicación y tus puntos.</p></div>
          <div><span className="mono">Qué repasa</span><p>{como}</p></div>
        </div>
        <QRClase size={250} libre={`#/actividades?a=${id}`} pie={`#/actividades · ${a.preguntas.length} preguntas`} />
      </Dos>
    </div>
  );
}
const preguntas = (id) => ACTIVIDAD[id].preguntas.map((q) => <PreguntaSlide key={q.id} q={q} actividad={id} />);

export const COLS = [
  /* ───────────── INICIO ───────────── */
  { id: 'inicio', titulo: 'Inicio', slides: [
    <div className="d-hero" key="p">
      <p className="d-eti">Desarrollo de Software 2 · Sección E · Semana 9</p>
      <h1>De sprint a <em>producto</em></h1>
      <p className="d-preg">La demo final del Delivery System es el <b>30 de noviembre</b>. Hoy todos los <span className="mono">pom.xml</span> dicen <span className="mono">0.0.1-SNAPSHOT</span>. ¿Cómo llegamos con un producto que se pueda entregar y mostrar?</p>
      <div className="d-hero-tags mono"><span>Gestión</span><span>Versionado</span><span>Entregables</span><span>Demo</span></div>
      <p className="d-nav mono">→ avanzar · ↓ profundizar · ESC vista general</p>
    </div>,
    <>
      <T eti="Agenda">Cuatro temas en el orden en que los van a vivir esta semana</T>
      <Agenda />
    </>,
    <>
      <T eti="Dónde estamos">El calendario del capstone</T>
      <div className="d-datos">
        <Dato n="Sprints 1–3" t="19 oct – 15 nov · módulos y contratos" c="#6EA8FF" />
        <Dato n="Sprint 4" t="16 – 22 nov · últimas historias" c="#C6F33A" />
        <Dato n="23 – 29 nov" t="integración, pruebas y ensayo" c="#FFD166" />
        <Dato n="30 nov" t="demo final" c="#FF8A3D" />
      </div>
      <Dos r="1.15fr 1fr">
        <Lista items={[
          <>Cinco módulos (usuarios, catálogo, pedidos, pagos, entregas) que tienen que funcionar <b>juntos</b>.</>,
          <>Hoy: cómo <b>gestionar</b> la última semana, <b>versionar</b> lo que se entrega, qué <b>entregables</b> van y cómo hacer una buena <b>demo</b>.</>,
          <>Escaneen el código <b>una sola vez</b>: con él responden las 4 actividades.</>,
        ]} />
        <QRClase size={250} pie="#/actividades · déjenla abierta" />
      </Dos>
    </>,
  ] },

  /* ───────────── TEMA 1 · GESTIÓN ───────────── */
  { id: 't1', tema: 't1', slides: [
    <Portada key="p" tema="t1" pregunta="Quedan pocos días para la demo. ¿Cómo saben si van a llegar… antes de que sea tarde?" />,
    <>
      <T tema="t1" eti="El triángulo">Fecha fija, equipo fijo: lo que se mueve es el alcance</T>
      <Dos r="1fr 1.1fr">
        <div className="d-triangulo">
          <svg viewBox="0 0 400 340" role="img" aria-label="Triángulo de alcance, tiempo y equipo con la calidad al centro">
            <polygon points="200,20 380,320 20,320" className="tri" />
            <text x="200" y="14" className="tri-v">ALCANCE · se ajusta</text>
            <text x="380" y="338" className="tri-f" textAnchor="end">EQUIPO · fijo</text>
            <text x="20" y="338" className="tri-f" textAnchor="start">TIEMPO · 30/11</text>
            <text x="200" y="230" className="tri-c">calidad</text>
          </svg>
        </div>
        <Lista items={[
          <><b>Tiempo:</b> la demo es el 30 de noviembre. No se mueve.</>,
          <><b>Equipo:</b> son los mismos cuatro equipos. Agregar gente a última hora retrasa (ley de Brooks).</>,
          <><b>Alcance:</b> qué historias entran. <b>Es lo único que se ajusta</b>.</>,
          <><b>Calidad</b> al centro: si se sacrifica, el producto falla en la demo.</>,
        ]} />
      </Dos>
    </>,
    <>
      <T tema="t1" eti="Medir">¿Cómo sé si voy a llegar?</T>
      <Cards cols={3}>
        <Card t="Velocidad" c="#C6F33A"><p>Puntos que el equipo <b>cierra</b> por sprint (el campo Weight de GitLab).</p><p>Sirve para planearse a sí mismo; <b>no</b> para comparar equipos.</p></Card>
        <Card t="Burndown" c="#FFD166"><p>Trabajo que <b>falta</b> día a día contra una línea ideal.</p><p>Si la real va por encima, van atrasados: recortar <b>ya</b>.</p></Card>
        <Card t="Board" c="#6EA8FF"><p>Open → To Do → In Progress → Review → Closed.</p><p>Muchas cosas en Review = cuello de botella en la aprobación.</p></Card>
      </Cards>
      <p className="d-capstone"><b>Hecho</b> = fusionado en main, con revisión, pipeline en verde y DoD marcada. Lo que está «casi» no cuenta.</p>
    </>,
    <>
      <T tema="t1" eti="Priorizar">MoSCoW: qué entra si no alcanza</T>
      <Tabla head={['Prioridad', 'Significa', 'En el Delivery System']} rows={[
        ['Must', 'Sin esto la demo no tiene sentido', 'Pedido de punta a punta: login, catálogo con stock, pedido, pago, entrega con código'],
        ['Should', 'Importante, pero la demo vive sin eso', 'Cancelar pedido (D-06), historial de pagos sin doble cobro'],
        ['Could', 'Deseable si sobra tiempo', 'Cupones (D-03 ya los marcó opcionales), historial de entregas, MySQL completo'],
        ['Won’t (por ahora)', 'Se dice en voz alta que no entra', 'App móvil, pagos reales'],
      ]} />
    </>,
    <>
      <T tema="t1" eti="Simulador · ¿llegamos a la demo?" sub="Las historias que faltan para el 30/11. Toca una para sacarla del alcance, mueve la capacidad y agrega un imprevisto.">Recorta el alcance hasta que lleguen</T>
      <Recorte />
    </>,
    <>
      <T tema="t1" eti="Riesgos">Lo que puede salir mal, antes de que salga mal</T>
      <Tabla small head={['Riesgo', 'Probabilidad', 'Impacto', 'Qué hacemos']} rows={[
        ['Un módulo no se integra con los demás', 'Media', 'Alto', 'Integrar el lunes, no el viernes; los contratos de core tienen fallback (D-00)'],
        ['Un MR rompe main el día antes', 'Media', 'Alto', 'Congelar alcance; solo correcciones con pipeline verde'],
        ['MySQL o Docker no arranca en el salón', 'Media', 'Medio', 'Demo con perfil de memoria (-Pmemory) y video de respaldo'],
        ['Falta alguien el día de la demo', 'Baja', 'Medio', 'Dos personas saben operar la demo de cada módulo'],
        ['Historias «casi listas» sin pruebas', 'Alta', 'Medio', 'No entran a v1.0.0: se mencionan en «qué sigue»'],
      ]} />
    </>,
    <>
      <T tema="t1" eti="Coordinar varios equipos (LeSS)">Un producto, un Product Owner, una Sprint Review</T>
      <Dos r="1fr 1fr">
        <Lista items={[
          <><b>Integración diaria:</b> todos fusionan a main cada día; el pipeline compila los siete proyectos juntos.</>,
          <><b>Dependencias:</b> catálogo → pedidos → pagos → entregas. Si catálogo se atrasa, todos esperan.</>,
          <><b>Fallback de core (D-00):</b> si un contrato no está listo, hay datos de prueba y un WARN: la demo no se cae.</>,
        ]} />
        <Card t="Esta semana" c="#FFD166">
          <p>Daily corta por equipo + <b>una sincronización entre equipos</b> para la integración.</p>
          <p>Sprint Review conjunta: el ensayo de la demo.</p>
          <p className="fragment">Retrospectiva general después del 30: ¿qué repetirían en su próximo proyecto?</p>
        </Card>
      </Dos>
    </>,
    <YCapstone key="y" tema="t1" items={[
      ['…el viernes descubren que pedidos y pagos no se entienden?', 'Si integraban desde el lunes, lo habrían visto con días de margen. Integrar temprano y seguido.'],
      ['…a una historia Must le faltan pruebas el jueves?', 'Se prioriza sobre cualquier Could. Si no se termina, se cuenta honestamente en la demo.'],
      ['…el PO quiere agregar algo nuevo el miércoles?', 'Se responde con el triángulo: entra algo nuevo solo si sale otra cosa del mismo tamaño.'],
    ]} cierre="gestionar la recta final es decidir qué NO entra, a tiempo y en voz alta." />,
  ] },

  { id: 'a1', titulo: 'Actividad 1', kind: 'act', slides: [
    <Actividad key="a" id="a1" como="Qué se ajusta cuando la fecha es fija, MoSCoW, velocidad y cómo leer un burndown." />,
    ...preguntas('a1'),
  ] },

  /* ───────────── TEMA 2 · VERSIONADO ───────────── */
  { id: 't2', tema: 't2', slides: [
    <Portada key="p" tema="t2" pregunta="Todos los módulos dicen 0.0.1-SNAPSHOT. ¿Qué versión le van a entregar al cliente el 30?" />,
    <>
      <T tema="t2" eti="¿Qué es una versión?">Un nombre para un estado exacto del código</T>
      <Dos r="1fr 1fr">
        <Analogia titulo="Las ediciones de un libro">
          <p>Si alguien dice «en la página 40 de la 2.ª edición», todos encuentran lo mismo. Si dice «en el libro», nadie sabe cuál.</p>
          <p>Una versión hace eso con el software: <b>v1.0.0</b> apunta a un commit exacto que cualquiera puede descargar y ejecutar.</p>
        </Analogia>
        <Lista frag items={[
          <>Permite <b>reproducir</b>: «la demo usó v1.0.0» = ese commit, ese código.</>,
          <>Permite <b>comunicar</b>: el número dice si el cambio rompe algo o no.</>,
          <>Permite <b>regresar</b>: si v1.1.0 falla, se vuelve a v1.0.0.</>,
        ]} />
      </Dos>
    </>,
    <>
      <T tema="t2" eti="Versionado semántico">MAJOR . MINOR . PATCH</T>
      <div className="d-semver mono"><span className="M">1</span>.<span className="m">4</span>.<span className="p">2</span></div>
      <Cards cols={3}>
        <Card t="MAJOR: rompe" c="#FF6B8B">Cambias algo que otros ya usan y tienen que cambiar su código. En el capstone: la firma de un <b>contrato de core</b>.</Card>
        <Card t="MINOR: agrega" c="#C6F33A">Agregas una función compatible. Quien no la usa no se entera. Al subir MINOR, PATCH vuelve a 0.</Card>
        <Card t="PATCH: corrige" c="#6EA8FF">Solo arreglas un error, sin cambiar cómo se usa.</Card>
      </Cards>
      <p className="d-capstone"><b>0.y.z</b> = todo puede cambiar. <b>1.0.0</b> = «esta es nuestra API pública y la vamos a respetar». La demo es el momento de la 1.0.0.</p>
    </>,
    <>
      <T tema="t2" eti="Explicador (Archify)">Qué número le toca a cada cambio y cómo se publica</T>
      <Arch src="versiones" h={640} nota="Tabla con ejemplos del capstone y el flujo de SNAPSHOT a release" />
    </>,
    <>
      <T tema="t2" eti="Simulador · máquina de versiones" sub="Seis cambios reales del Delivery System. Elige cuánto sube la versión; si aciertas, se crea el tag y la línea del CHANGELOG.">¿MAJOR, MINOR o PATCH?</T>
      <Versionador />
    </>,
    <>
      <T tema="t2" eti="SNAPSHOT, pre-release y tags">Las etiquetas que van a usar esta semana</T>
      <Tabla head={['Etiqueta', 'Significa', 'Cuándo']} rows={[
        ['0.0.1-SNAPSHOT', 'En construcción (Maven): puede cambiar en cualquier momento', 'Hoy, mientras desarrollan'],
        ['1.0.0-rc.1', 'Candidato: la versión que se ensaya', 'Al congelar el alcance'],
        ['1.0.0', 'Versión final estable', 'La que se muestra el 30'],
        ['1.0.1', 'Corrección después de publicar', 'Si aparece un error en el ensayo'],
      ]} />
    </>,
    <>
      <T tema="t2" eti="En la terminal y en GitLab">Del pom.xml al release</T>
      <Dos r="1.25fr 1fr">
        <Code lang="bash" titulo="Publicar v1.0.0">{`
# 1. En una rama y por MR, en cada módulo:
./mvnw versions:set -DnewVersion=1.0.0 -DgenerateBackupPoms=false

# 2. Ya fusionado y con pipeline verde en main:
git switch main && git pull --rebase origin main
git tag -a v1.0.0 -m "Delivery System 1.0.0 · demo final"
git push origin v1.0.0

# 3. GitLab: Deploy > Releases > New release
#    Tag v1.0.0 · notas copiadas del CHANGELOG`}</Code>
        <Lista items={[
          <>El cambio de versión <b>también va por MR</b>, como todo en GitHub Flow.</>,
          <>Tag <b>anotado</b> (-a): guarda autor, fecha y mensaje.</>,
          <>El <b>release</b> de GitLab agrega notas y enlaces al tag.</>,
          <>Un tag no se mueve: si hay que corregir, es <b>v1.0.1</b>.</>,
        ]} />
      </Dos>
    </>,
    <>
      <T tema="t2" eti="CHANGELOG">Las notas que alguien sí va a leer</T>
      <Dos r="1.2fr 1fr">
        <Code lang="markdown" titulo="CHANGELOG.md">{`
# Changelog

## [1.0.0] - 2026-11-29
### Added
- [ORD] Crear pedido con dirección y costo de envío.
- [PAY] Pago simulado con el último método registrado (D-04).
- [DEL] Confirmar entrega con código de 4 caracteres (D-02).
### Fixed
- [CAT] El stock se libera al cancelar un pedido (D-09).

## [Unreleased]
- [PAY] Cupones y promociones (D-03).`}</Code>
        <Lista items={[
          <>Formato <b>Keep a Changelog</b>: Added, Changed, Fixed, Removed.</>,
          <>Escrito para personas: qué cambió para el usuario, no la lista de commits.</>,
          <>Sale fácil de sus títulos de historia <span className="mono">[MÓDULO] Verbo + qué</span>.</>,
          <><b>Unreleased</b>: lo que viene. Honesto y útil para «qué sigue» en la demo.</>,
        ]} />
      </Dos>
    </>,
    <YCapstone key="y" tema="t2" items={[
      ['…el equipo de pagos encuentra un error el 29 por la noche?', 'MR con la corrección, pipeline verde y tag v1.0.1. La demo usa v1.0.1; v1.0.0 sigue existiendo.'],
      ['…cada módulo quiere su propia versión?', 'Para la demo, una sola versión del producto (todo en 1.0.0) es más simple de explicar y de reproducir.'],
      ['…alguien cambia la firma de UserService después de la 1.0.0?', 'Eso sería 2.0.0 y obliga a los otros cuatro equipos a cambiar. Por eso los contratos se cuidan.'],
    ]} cierre="la versión es una promesa: este número, este código, siempre." />,
  ] },

  { id: 'a2', titulo: 'Actividad 2', kind: 'act', slides: [
    <Actividad key="a" id="a2" como="MAJOR, MINOR o PATCH con cambios del capstone, SNAPSHOT y los pasos para publicar v1.0.0." />,
    ...preguntas('a2'),
  ] },

  { id: 'receso', titulo: 'Receso', kind: 'act', slides: [<Receso key="r" />] },

  /* ───────────── TEMA 3 · ENTREGABLES ───────────── */
  { id: 't3', tema: 't3', slides: [
    <Portada key="p" tema="t3" pregunta="El 30 no solo se muestra una demo. ¿Qué más se entrega, y cómo sabemos que está completo?" />,
    <>
      <T tema="t3" eti="Seis grupos (Archify)">Qué se entrega el 30 de noviembre</T>
      <Arch src="entregables" h={600} nota="Producto, código, documentación, proceso, demo e individual" />
    </>,
    <>
      <T tema="t3" eti="Cada grupo">Qué es y cómo se ve terminado</T>
      <Tabla small head={['Entregable', 'Se ve terminado cuando…']} rows={[
        ['Producto', 'Hay un tag v1.0.0 y un release en GitLab; se ejecuta con ./mvnw javafx:run -Pmemory'],
        ['Código', 'Todo está en main por MR revisado, con pipeline en verde y pruebas de los casos de uso'],
        ['Documentación', 'README con cómo ejecutar y probar; wiki del módulo: 4Ps, plan de acción, casos de uso y decisiones'],
        ['Proceso', 'Issues cerrados con DoD marcada, milestones por sprint, actas de review y retrospectiva'],
        ['Demo', 'Guion de 10 minutos ensayado y un video de respaldo'],
        ['Individual', 'Sus commits, MRs y revisiones muestran su parte'],
      ]} />
      <p className="d-capstone">Esta es una lista de trabajo para el equipo. <b>La rúbrica oficial del curso manda</b>: compárenla con ella.</p>
    </>,
    <>
      <T tema="t3" eti="La prueba del recién llegado">¿Alguien que no es del equipo lo puede ejecutar?</T>
      <Dos r="1.1fr 1fr">
        <Code lang="markdown" small titulo="README.md · lo mínimo">{`
## Requisitos
- JDK 25 (java y javac), Git

## Ejecutar la versión de la demo
git clone <repo> && cd capstone
git switch --detach v1.0.0
# compilar los módulos en orden (ver README)
cd delivery-system
./mvnw javafx:run -Pmemory

## Usuarios de prueba
- 5 usuarios: 00000000-0000-0000-0000-00000000000N
  (roles en SampleUsers de core-module)

## Recorrido sugerido
1. Entrar como cliente y crear un pedido…`}</Code>
        <Lista frag items={[
          <>Den el README a alguien de <b>otro equipo</b>.</>,
          <>Que descargue el <b>tag</b> en una máquina limpia y lo ejecute <b>sin preguntarles nada</b>.</>,
          <>Cada pregunta que haga = algo que falta en el README.</>,
          <>«En mi máquina funciona» no es un entregable.</>,
        ]} />
      </Dos>
    </>,
    <>
      <T tema="t3" eti="Semáforo de entrega" sub="La lista del equipo. Las ★ bloquean la entrega. Se guarda solo en este navegador: úsenla en su celular.">¿Están listos para entregar?</T>
      <Semaforo />
    </>,
    <>
      <T tema="t3" eti="Hecho vs. entregado">Definition of Done de la historia y del producto</T>
      <Dos r="1fr 1fr">
        <Card t="DoD de una historia" c="#6EA8FF"><p>Criterios Dado/Cuando/Entonces cumplidos, pruebas, MR revisado y aprobado por el Scrum Master, pipeline verde, issue cerrado.</p></Card>
        <Card t="DoD del producto (release)" c="#B78CFF"><p>Todas las Must hechas, <b>integradas entre módulos</b>, versión sin SNAPSHOT, tag y release, README probado por alguien de fuera, demo ensayada.</p></Card>
      </Dos>
      <p className="d-capstone">Cinco historias «hechas» por separado no son un producto si no funcionan <b>juntas</b>.</p>
    </>,
    <YCapstone key="y" tema="t3" items={[
      ['…el README dice «correr con MySQL» y en el salón no hay Docker?', 'Documenten el perfil de memoria como camino principal y MySQL como opcional.'],
      ['…la wiki del módulo no se actualiza desde el Sprint 2?', 'Es un documento vivo: actualicen casos de uso, decisiones y actas antes del 30.'],
      ['…una historia está hecha pero no se usa en la demo?', 'Sigue siendo entregable: va en el CHANGELOG y en el release, aunque no se muestre.'],
    ]} cierre="un entregable está completo cuando otra persona puede usarlo sin ustedes." />,
  ] },

  { id: 'a3', titulo: 'Actividad 3', kind: 'act', slides: [
    <Actividad key="a" id="a3" como="Los grupos de entregables, la prueba del recién llegado y la Definition of Done." />,
    ...preguntas('a3'),
  ] },

  /* ───────────── TEMA 4 · DEMO ───────────── */
  { id: 't4', tema: 't4', slides: [
    <Portada key="p" tema="t4" pregunta="¿Qué tienen en común una buena demo y una buena película? Una historia… y un plan por si algo falla." />,
    <>
      <T tema="t4" eti="Qué es (y qué no es)">Una demo muestra valor, no pantallas</T>
      <Dos r="1fr 1fr">
        <Card t="Sí es" c="#C6F33A"><Lista items={[
          <>Mostrar que el producto <b>resuelve el problema</b> de alguien.</>,
          <>Un recorrido <b>real</b>, de punta a punta, en la versión entregada.</>,
          <>Honestidad: qué funciona y qué quedó fuera.</>,
        ]} /></Card>
        <Card t="No es" c="#FF6B8B"><Lista items={[
          <>Un recorrido por el código línea por línea.</>,
          <>Abrir cada pantalla «para que vean que existe».</>,
          <>Mostrar algo que no está en main ni en v1.0.0.</>,
        ]} /></Card>
      </Dos>
    </>,
    <>
      <T tema="t4" eti="Dos historias famosas">Lo que enseñan las demos de las grandes empresas</T>
      <Cards cols={2}>
        <Card t="iPhone, 2007: el «camino dorado»" c="#C6F33A"><p>El prototipo fallaba si se usaba en otro orden. El equipo ensayó una secuencia exacta de pasos que sí funcionaba, y la demo salió perfecta.</p><p><b>Lección:</b> guion preciso y ensayado.</p></Card>
        <Card t="Cybertruck, 2019: la ventana" c="#FF6B8B"><p>En la presentación lanzaron una bola de metal para mostrar la ventana «blindada»… y se estrelló. Se volvió viral.</p><p><b>Lección:</b> ensayar en las condiciones reales y tener un plan B.</p></Card>
      </Cards>
    </>,
    <>
      <T tema="t4" eti="Explicador (Archify)">El recorrido que muestra los cinco módulos juntos</T>
      <Arch src="recorrido-demo" h={640} nota="Un pedido de punta a punta, tiempos sugeridos y preparación" />
    </>,
    <>
      <T tema="t4" eti="El guion">Diez minutos, cinco partes</T>
      <ol className="d-pasos">
        <li><b>Problema y usuario (1 min):</b> «María quiere pedir comida a un comercio de su colonia…».</li>
        <li className="fragment"><b>Recorrido feliz (4–5 min):</b> entra, elige, paga, el comercio marca listo, el repartidor entrega con el código.</li>
        <li className="fragment"><b>Una regla de negocio (1–2 min):</b> intentar cancelar un pedido ya en camino → el sistema no lo permite (D-06).</li>
        <li className="fragment"><b>Cómo está hecho (1–2 min):</b> monolito modular, contratos en core, un diagrama, no el código.</li>
        <li className="fragment"><b>Qué sigue y preguntas (1 min):</b> lo del Unreleased, con honestidad.</li>
      </ol>
    </>,
    <>
      <T tema="t4" eti="Roles y preparación">Quién hace qué el día de la demo</T>
      <Dos r="1fr 1fr">
        <Cards cols={2}>
          <Card t="Narrador" c="#FF8A3D">Cuenta la historia y mira al público, no a la pantalla.</Card>
          <Card t="Operador" c="#6EA8FF">Maneja el teclado siguiendo el guion exacto.</Card>
          <Card t="Plan B" c="#B78CFF">Tiene listo el video y los datos de respaldo.</Card>
          <Card t="Tiempo" c="#C6F33A">Avisa a los 5 y a los 8 minutos.</Card>
        </Cards>
        <Lista items={[
          <><b>Datos listos:</b> usuarios de prueba (SampleUsers), comercios y productos cargados.</>,
          <><b>Arranque en limpio</b> desde el tag v1.0.0, esa misma mañana.</>,
          <><b>Pantalla:</b> zoom al 125 %, notificaciones apagadas, ventanas cerradas.</>,
          <><b>Ensayo:</b> dos veces con cronómetro, en la máquina de la demo.</>,
        ]} />
      </Dos>
    </>,
    <>
      <T tema="t4" eti="Simulador · ensaya tu demo" sub="Arma el guion tocando bloques (máximo 10 min), mira la atención del público y enfrenta imprevistos según lo que prepararon.">¿Su demo sobrevive?</T>
      <EnsayoDemo />
    </>,
    <>
      <T tema="t4" eti="Cuando algo falla en vivo">Plan B y preguntas difíciles</T>
      <Tabla small head={['Si pasa…', 'Hacen…']} rows={[
        ['La aplicación no arranca', 'Video de respaldo y siguen narrando sin pedir perdón diez veces'],
        ['Sale un error en un paso', '«Esto lo vimos en el ensayo; así se ve cuando funciona» y pasan al video de ese paso'],
        ['Preguntan algo que no saben', '«Buena pregunta, no lo sé; lo revisamos y les respondemos»'],
        ['Preguntan por algo que no entró', 'Lo explican con el triángulo: qué priorizaron y por qué'],
        ['Se acaba el tiempo', 'Saltan a «qué sigue»: mejor terminar a tiempo que completo'],
      ]} />
    </>,
    <YCapstone key="y" tema="t4" items={[
      ['…el módulo de un equipo no quedó completo?', 'El fallback de core (D-00) mantiene el recorrido; lo cuentan como «qué sigue», sin esconderlo.'],
      ['…cada equipo quiere mostrar su módulo por separado?', 'Mejor un solo recorrido donde cada equipo narra su parte: así se ve que es un producto.'],
      ['…el profesor pregunta «¿por qué hexagonal?»', 'Respuesta corta y con ejemplo: «pudimos cambiar memoria por MySQL sin tocar los casos de uso».'],
    ]} cierre="una buena demo es una historia ensayada, con un plan B y la versión que entregaron." />,
  ] },

  /* ───────────── ACTIVIDAD 4 + CIERRE ───────────── */
  { id: 'a4', titulo: 'Actividad 4', kind: 'act', slides: [
    <Actividad key="a" id="a4" como="El orden de una demo, qué hacer si falla y qué sí y qué no se muestra." />,
    ...preguntas('a4'),
  ] },

  { id: 'cierre', titulo: 'Cierre', slides: [
    <>
      <T eti="Explicador (Archify)">El plan de aquí al 30 de noviembre</T>
      <Arch src="camino-entrega" h={600} nota="Integrar, congelar, candidato, ensayo y release" />
    </>,
    <>
      <T eti="Cierre">Cuatro ideas para esta semana</T>
      <div className="d-ocho cuatro">
        {[['Recorten a tiempo', 'Fecha y equipo fijos: el alcance es lo que se ajusta.', '#FFD166'],
          ['Una versión es una promesa', 'Sin SNAPSHOT, con tag v1.0.0 y release.', '#C6F33A'],
          ['Entregable = otro lo puede usar', 'README probado por alguien de fuera.', '#B78CFF'],
          ['La demo es una historia', 'Ensayada, de 10 minutos y con plan B.', '#FF8A3D']].map(([t, s, c]) => (
          <div key={t} style={{ borderTopColor: c }}><span>{t}</span><p>{s}</p></div>
        ))}
      </div>
      <p className="d-capstone"><b>Tarea de hoy:</b> cada equipo llena el semáforo de entrega y decide su lista MoSCoW antes de mañana.</p>
    </>,
    <>
      <T eti="Referencias">Para seguir aprendiendo</T>
      <ul className="d-refs">
        <li>Semantic Versioning 2.0.0 · semver.org/lang/es.</li>
        <li>Keep a Changelog 1.1.0 · keepachangelog.com/es-ES.</li>
        <li>GitLab Docs: Releases (Deploy → Releases) y Git: tags anotados (git-scm.com).</li>
        <li>Maven: versiones SNAPSHOT y versions-maven-plugin (versions:set).</li>
        <li>The Scrum Guide y Large-Scale Scrum (LeSS): Sprint Review con varios equipos.</li>
        <li>Fred Brooks, «The Mythical Man-Month»: agregar gente tarde retrasa más.</li>
        <li>Capstone Delivery System: requerimientos y decisiones D-00 a D-09 (guía de la sección).</li>
      </ul>
      <p className="d-sub">Repaso: actividades en #/actividades y simuladores en #/simuladores.</p>
    </>,
  ] },
];

export const TEMA_COL = Object.fromEntries(COLS.map((c, i) => [c.tema || c.id, i]));
