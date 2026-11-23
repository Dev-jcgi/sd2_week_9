// Actividades de la Semana 9 (DS2). En vivo: el profesor las lanza desde #/profesor y llegan a los celulares (un solo QR).
// Sin sala: cada estudiante practica en #/actividades y ve al momento si acertó.
// Tipos: quiz · tf · classify (tarjetas a categorías) · order (ordenar) · scale (termómetro, sin respuesta correcta).
// En "order", "o" ya viene desordenado y "a" es el orden correcto (índices de "o").

const TERMO = ['Gestionar la última semana del proyecto', 'Versionar con MAJOR.MINOR.PATCH', 'Saber qué se entrega el 30/11', 'Hacer una buena demo'];

export const ACTIVIDADES = [
  { id: 'a1', n: 1, nombre: '¿Llegamos?', momento: 'después de gestión', min: 6, color: '#FFD166', preguntas: [
    { id: 'a1q0', type: 'scale', t: 40, q: 'Termómetro: ¿qué tan seguro te sientes con cada tema de hoy?', o: TERMO, lo: 'nada', hi: 'podría explicarlo' },
    { id: 'a1q1', type: 'quiz', t: 25, q: 'La fecha de la demo y los equipos ya no cambian. ¿Qué se puede ajustar?',
      o: ['La fecha', 'El alcance: qué historias entran', 'Saltarse las pruebas', 'Agregar personas al equipo'],
      a: 1, e: 'Con tiempo y equipo fijos, lo único que se mueve sin bajar la calidad es el alcance. Saltarse pruebas «ahorra» hoy y explota en la demo.' },
    { id: 'a1q2', type: 'classify', t: 60, q: 'Prioridad MoSCoW para la demo del Delivery System', bins: ['Must', 'Should', 'Could'],
      o: ['Crear un pedido con envío', 'Cupones y promociones (D-03)', 'Pago simulado', 'Cancelar pedido (D-06)', 'Historial de entregas del repartidor', 'Repartidor confirma con código (D-02)'],
      a: [0, 2, 0, 1, 2, 0], e: 'Must: lo que el recorrido de la demo necesita (pedido, pago, entrega con código). Should: importante pero la demo vive sin eso (cancelar). Could: deseable (cupones, historial). D-03 ya decía que los cupones son opcionales.' },
    { id: 'a1q3', type: 'tf', t: 20, q: 'Si el equipo A cerró 20 puntos y el B 12, el equipo A trabaja más.', o: ['Verdadero', 'Falso'],
      a: 1, e: 'Falso. Los puntos son relativos a cada equipo (cada uno estima con su propia escala). La velocidad sirve para que un equipo se planee a sí mismo, no para compararse.' },
    { id: 'a1q4', type: 'quiz', t: 25, q: 'En el burndown, la línea real va por ENCIMA de la ideal a mitad de semana. ¿Qué significa?',
      o: ['Van adelantados', 'Van atrasados: queda más trabajo del planeado', 'Terminaron', 'El gráfico está mal'],
      a: 1, e: 'Encima = queda más trabajo del que debería a esa altura. Es la señal para recortar alcance hoy, no el día antes de la demo.' },
  ] },
  { id: 'a2', n: 2, nombre: '¿Qué versión es?', momento: 'antes del receso', min: 5, color: '#C6F33A', preguntas: [
    { id: 'a2q1', type: 'classify', t: 60, q: 'Estás en 1.4.2. ¿Qué parte sube con cada cambio?', bins: ['MAJOR', 'MINOR', 'PATCH'],
      o: ['Cambiar la firma de isActiveWithRole en UserService', 'Agregar un método nuevo a CatalogService', 'Corregir el cálculo del costo de envío', 'Renombrar el paquete core.contract', 'Agregar la pantalla de historial de pagos', 'Corregir un texto mal escrito'],
      a: [0, 1, 2, 0, 1, 2], e: 'MAJOR: rompes lo que otros módulos usan (firma, paquete). MINOR: agregas algo compatible. PATCH: solo corriges.' },
    { id: 'a2q2', type: 'quiz', t: 20, q: 'Estás en 1.4.2 y corriges un error. ¿Cuál es la siguiente versión?',
      o: ['1.4.3', '1.5.0', '2.0.0', '1.4.2.1'],
      a: 0, e: 'Una corrección sube PATCH: 1.4.3.' },
    { id: 'a2q3', type: 'quiz', t: 25, q: '¿Qué significa 0.0.1-SNAPSHOT en los pom.xml del capstone?',
      o: ['Que ya está listo para producción', 'Que es una versión en construcción que puede cambiar', 'Que es la versión 1', 'Que tiene errores'],
      a: 1, e: 'SNAPSHOT en Maven = «en construcción». Para la demo se quita: 1.0.0.' },
    { id: 'a2q4', type: 'order', t: 45, q: 'Ordena cómo se publica la versión 1.0.0',
      o: ['Crear el tag anotado v1.0.0 en ese commit', 'Quitar -SNAPSHOT de los pom.xml en un MR', 'Publicar el release en GitLab con las notas', 'Pipeline en verde en main', 'El Scrum Master aprueba y se fusiona el MR'],
      a: [1, 4, 3, 0, 2], e: 'Cambiar la versión por MR → aprobar y fusionar → pipeline en verde → tag en ese commit → release con notas. El tag siempre apunta a algo que ya pasó el pipeline.' },
  ] },
  { id: 'a3', n: 3, nombre: 'Lista para entregar', momento: 'después de entregables', min: 5, color: '#B78CFF', preguntas: [
    { id: 'a3q1', type: 'classify', t: 60, q: '¿A qué grupo de entregables pertenece cada cosa?', bins: ['Producto', 'Documentación', 'Proceso'],
      o: ['Release v1.0.0 en GitLab', 'README con cómo ejecutar', 'Issues cerrados con DoD marcada', 'CHANGELOG de la versión', 'Casos de uso en la wiki', 'Actas de la retrospectiva'],
      a: [0, 1, 2, 0, 1, 2], e: 'Producto: lo que se ejecuta y su release. Documentación: cómo usarlo y por qué está hecho así. Proceso: la evidencia de cómo trabajaron.' },
    { id: 'a3q2', type: 'tf', t: 15, q: 'Si funciona en mi computadora, ya está listo para entregar.', o: ['Verdadero', 'Falso'],
      a: 1, e: 'Falso. Está listo cuando funciona desde el tag, en una máquina limpia, siguiendo solo el README: la prueba del recién llegado.' },
    { id: 'a3q3', type: 'quiz', t: 25, q: '¿Qué es la «prueba del recién llegado»?',
      o: ['Una prueba unitaria nueva', 'Que alguien que no está en el equipo descargue el tag y lo ejecute solo con el README', 'Preguntarle al profesor si está bien', 'Revisar el código del último commit'],
      a: 1, e: 'Si una persona nueva no puede ejecutarlo sin preguntarles, al README o al release les falta algo.' },
    { id: 'a3q4', type: 'quiz', t: 25, q: 'Una historia está «hecha» cuando…',
      o: ['El código está en mi rama', 'Se fusionó en main con revisión, pipeline en verde y DoD cumplida', 'La mostré en la daily', 'El issue está en la columna Review'],
      a: 1, e: 'Es la Definition of Done del capstone: si no está en main con pipeline verde, no entra en v1.0.0 ni en la demo.' },
  ] },
  { id: 'a4', n: 4, nombre: 'Demo sin sustos', momento: 'antes de terminar', min: 6, color: '#FF8A3D', preguntas: [
    { id: 'a4q1', type: 'order', t: 45, q: 'Ordena una demo de 10 minutos',
      o: ['Cómo está hecho (módulos y contratos)', 'Problema y usuario', 'Qué sigue y preguntas', 'Recorrido feliz de punta a punta', 'Una regla de negocio importante'],
      a: [1, 3, 4, 0, 2], e: 'Primero el para qué, luego el valor (recorrido feliz), una regla que muestra calidad, un poco de cómo está hecho y al final qué sigue.' },
    { id: 'a4q2', type: 'quiz', t: 25, q: 'En plena demo la aplicación no arranca. ¿Qué haces?',
      o: ['Intentar arreglarlo frente a todos', 'Pasar al video de respaldo y seguir narrando', 'Cancelar la demo', 'Pedir disculpas y explicar el código'],
      a: 1, e: 'El plan B existe para eso: se cambia sin drama y la historia sigue. Arreglar en vivo se come el tiempo y los nervios.' },
    { id: 'a4q3', type: 'classify', t: 60, q: '¿Sí o no en la demo final?', bins: ['Sí', 'No'],
      o: ['Contar el recorrido como la historia de un cliente', 'Recorrer el código línea por línea', 'Usar usuarios de prueba ya cargados', 'Explicar cada tabla de la base de datos', 'Ensayar dos veces con cronómetro', 'Mostrar funciones que no están en main'],
      a: [0, 1, 0, 1, 0, 1], e: 'Una demo muestra valor con una historia, preparada y ensayada. Código línea por línea y tablas aburren; y lo que no está en main no es parte de v1.0.0.' },
    { id: 'a4q4', type: 'scale', t: 40, q: 'Termómetro final: ¿y ahora qué tan seguro te sientes?', o: TERMO, lo: 'nada', hi: 'podría explicarlo', compare: 'a1q0' },
  ] },
];
export const ACTIVIDAD = Object.fromEntries(ACTIVIDADES.map((a) => [a.id, a]));
export const LETRAS = ['A', 'B', 'C', 'D', 'E'];
export const TIPO = { quiz: 'Quiz', tf: 'Verdadero o falso', classify: 'Clasifica', order: 'Ordena', scale: 'Termómetro' };

/** Puntaje 0..100 de una respuesta (null en el termómetro). */
export function puntaje(q, r) {
  if (q.type === 'scale') return null;
  if (r == null) return 0;
  if (q.type === 'classify') return Math.round((100 * q.a.reduce((s, b, i) => s + (r[i] === b ? 1 : 0), 0)) / q.a.length);
  if (q.type === 'order') return Array.isArray(r) && r.every((v, i) => v === q.a[i]) ? 100 : 0;
  return r === q.a ? 100 : 0;
}
