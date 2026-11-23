// Temas de la Semana 9 (DS2): cerrar el proyecto. Del Sprint 4 a la demo final del Capstone Delivery System (30/11/2026).
// Orden lógico: gestionar la última semana → versionar lo que se entrega → definir los entregables → demostrarlo.
export const TEMAS = [
  { id: 't1', n: 1, titulo: 'Gestión de proyectos de software: la recta final', corto: 'Gestión', color: '#FFD166', min: 20 },
  { id: 't2', n: 2, titulo: 'Versionado de software', corto: 'Versionado', color: '#C6F33A', min: 20 },
  { id: 't3', n: 3, titulo: 'Entregables del proyecto', corto: 'Entregables', color: '#B78CFF', min: 18 },
  { id: 't4', n: 4, titulo: 'Demostración del producto', corto: 'Demo', color: '#FF8A3D', min: 23 },
];
export const TEMA = Object.fromEntries(TEMAS.map((t) => [t.id, t]));
