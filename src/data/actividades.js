// Actividades de la Semana 9 (SD2). Se juegan en la sesión que crea el profesor (#/profesor): un solo QR
// (#/vivo?s=<sesión>) y cada actividad aparece sola en los celulares al llegar a su diapositiva.
// "codigo" es el respaldo para un celular que no logra conectarse: abre la actividad sin la sesión.
// Tipos: quiz · tf · classify (tarjetas a categorías) · order (ordenar) · scale (termómetro, sin respuesta correcta).
// En "order", "o" ya viene desordenado y "a" es el orden correcto (índices de "o").

const TERMO = ['La demo (Lab 9)', 'La versión 1.0.0', 'El congelamiento', 'Arquitectura para la revisión técnica'];

export const ACTIVIDADES = [
  { id: 'a1', codigo: 'DEMO', n: 1, nombre: '¿Qué hace una buena demo?', momento: 'inicio', min: 8, color: '#FF8A3D', preguntas: [
    { id: 'a1q1', type: 'quiz', t: 25, q: '¿Para qué sirve la demo final del capstone?',
      o: ['Mostrar al Product Owner el software funcionando y el valor que entrega', 'Explicar el código línea por línea', 'Presentar las diapositivas del curso', 'Mostrar cuántas horas trabajó cada integrante'],
      a: 0, e: 'Una demo muestra el producto funcionando, con los flujos que pidió el negocio. El código y el proceso se defienden en las preguntas, no se leen en pantalla.' },
    { id: 'a1q2', type: 'order', t: 40, q: 'Ordena el flujo de punta a punta del Delivery System', o: ['El repartidor toma el pedido y lo entrega con el código', 'El cliente arma su carrito con productos del catálogo', 'El comercio marca el pedido como listo para entrega', 'El cliente paga y el pedido queda confirmado'],
      a: [1, 3, 2, 0], e: 'Catálogo → Pedidos → Pagos → Pedidos (listo) → Entregas. Cada paso cruza un contrato de core: CatalogService, PaymentService y OrderService.' },
    { id: 'a1q3', type: 'tf', t: 15, q: 'Si algo falla en vivo, lo mejor es seguir sin decir nada.', o: ['Verdadero', 'Falso'],
      a: 1, e: 'Falso. Se dice qué pasó, se pasa al plan B (otro dato de prueba o la grabación del ensayo) y se sigue. Esconder el error resta credibilidad.' },
    { id: 'a1q4', type: 'scale', t: 40, q: 'Termómetro: ¿qué tan seguro te sientes con cada tema de hoy?', o: TERMO, lo: 'nada', hi: 'podría explicarlo' },
  ] },
  { id: 'a2', codigo: 'TAGS', n: 2, nombre: 'Ponle número a la versión', momento: 'antes del receso', min: 12, color: '#C6F33A', preguntas: [
    { id: 'a2q1', type: 'quiz', t: 25, q: 'La versión es 1.0.0. Corriges un bug sin cambiar ningún contrato. ¿Qué versión sigue?',
      o: ['1.0.1', '1.1.0', '2.0.0', '1.0.0 otra vez'], a: 0, e: 'Un arreglo compatible sube el PATCH: 1.0.0 → 1.0.1.' },
    { id: 'a2q2', type: 'quiz', t: 25, q: 'Agregas a CatalogService un método nuevo con implementación por defecto (como findAvailableProducts). ¿Qué parte sube?',
      o: ['MINOR: funcionalidad nueva y compatible', 'PATCH', 'MAJOR', 'Ninguna'], a: 0, e: 'Algo nuevo que no rompe a nadie sube el MINOR y el PATCH vuelve a 0: 1.0.1 → 1.1.0.' },
    { id: 'a2q3', type: 'quiz', t: 30, q: 'Tu equipo sube order-module a 1.0.0 en su pom.xml, pero delivery-system sigue pidiendo 0.0.1-SNAPSHOT. ¿Qué pasa en main?',
      o: ['Falla assemble-system: pide la versión exacta del módulo', 'Nada, Maven toma la más reciente', 'Solo falla el linter', 'Se publica el Release'], a: 0, e: 'assemble-system arma la aplicación con la versión exacta de cada módulo que dice delivery-system/pom.xml. Por eso todos los pom.xml se cambian juntos, en un solo MR del practitioner.' },
    { id: 'a2q4', type: 'tf', t: 15, q: 'Si un tag quedó en el commit equivocado, se mueve con git tag -f y listo.', o: ['Verdadero', 'Falso'],
      a: 1, e: 'Falso. Un tag publicado no se mueve: otros ya lo descargaron. Se crea una versión nueva (por ejemplo, 1.0.1) en el commit correcto.' },
  ] },
  { id: 'a3', codigo: 'PLAN', n: 3, nombre: 'El congelamiento', momento: 'después del tema 3', min: 5, color: '#6EA8FF', preguntas: [
    { id: 'a3q1', type: 'classify', t: 45, q: 'Después del congelamiento de main, ¿qué entra y qué no?', bins: ['Entra', 'No entra'],
      o: ['Una corrección en ISSUE-<n>/bug/…', 'Una historia nueva', 'La rama de versión del módulo', 'Un commit directo en main', 'El MR del practitioner con los pom.xml'],
      a: [0, 1, 0, 1, 0], e: 'Desde el congelamiento solo entran correcciones y los cambios de la versión, siempre con un MR. Las historias nuevas vuelven al backlog.' },
    { id: 'a3q2', type: 'quiz', t: 30, q: 'Es jueves 26/11 y el contrato OrderService todavía no está en main. ¿Qué hace el equipo de Entregas?',
      o: ['Prepara la demo con el fallback de core, lo dice en voz alta y lo lleva a la reunión de SM', 'Copia el código de Pedidos en su módulo', 'Cancela su parte de la demo', 'Espera sin avisar'], a: 0, e: 'El fallback existe para que nadie quede bloqueado. El riesgo se gestiona: se avisa, se registra un issue y se explica en la demo qué falta.' },
  ] },
  { id: 'a4', codigo: 'ENTR', n: 4, nombre: '¿En qué capa va?', momento: 'antes de terminar', min: 5, color: '#B78CFF', preguntas: [
    { id: 'a4q1', type: 'classify', t: 60, q: '¿En qué capa de la arquitectura va cada pieza del capstone?', bins: ['Entidad', 'Caso de uso', 'Puerto', 'Adaptador'],
      o: ['La regla «un pedido entregado no se cancela»', 'El contrato CatalogService de core', 'La persistencia JPA de los pedidos', 'El flujo «agregar al carrito»', 'La interfaz del repositorio del carrito', 'El controlador JavaFX de una pantalla'],
      a: [0, 2, 3, 1, 2, 3], e: 'Las reglas de negocio viven en la entidad; los flujos, en el caso de uso; las interfaces que se necesitan u ofrecen son puertos; y lo técnico (JPA, JavaFX, otros módulos) son adaptadores.' },
    { id: 'a4q2', type: 'scale', t: 40, q: 'Termómetro final: ¿y ahora qué tan seguro te sientes?', o: TERMO, lo: 'nada', hi: 'podría explicarlo', compare: 'a1q4' },
  ] },
];
export const ACTIVIDAD = Object.fromEntries(ACTIVIDADES.map((a) => [a.id, a]));
export const LETRAS = ['A', 'B', 'C', 'D', 'E'];
export const EQUIPOS = [
  { id: 'A', nombre: 'Equipo A', modulo: 'delivery-module', color: '#FF8A3D' },
  { id: 'B', nombre: 'Equipo B', modulo: 'order-module', color: '#6EA8FF' },
  { id: 'C', nombre: 'Equipo C', modulo: 'catalog-module', color: '#C6F33A' },
  { id: 'D', nombre: 'Equipo D', modulo: 'payment-module', color: '#B78CFF' },
];
export const TIPO = { quiz: 'Quiz', tf: 'Verdadero o falso', classify: 'Clasifica', order: 'Ordena', scale: 'Termómetro' };

/** Puntaje 0..100 de una respuesta (null en el termómetro). */
export function puntaje(q, r) {
  if (q.type === 'scale') return null;
  if (r == null) return 0;
  if (q.type === 'classify') return Math.round((100 * q.a.reduce((s, b, i) => s + (r[i] === b ? 1 : 0), 0)) / q.a.length);
  if (q.type === 'order') return Array.isArray(r) && r.every((v, i) => v === q.a[i]) ? 100 : 0;
  return r === q.a ? 100 : 0;
}
