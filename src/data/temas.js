// Temas de la Semana 9 de Desarrollo de Software 2: Laboratorio 9 (demo y versión 1.0.0), la semana de integración y la evaluación final.
export const TEMAS = [
  { id: 't1', n: 1, titulo: 'La demo del producto: Laboratorio 9, Actividad 1', corto: 'Demo', color: '#FF8A3D', min: 20 },
  { id: 't2', n: 2, titulo: 'La versión 1.0.0: SemVer, GitHub Flow y Release (Lab 9, Actividad 2)', corto: 'Versiones', color: '#C6F33A', min: 20 },
  { id: 't3', n: 3, titulo: 'Gestión de la semana de integración: congelamiento y riesgos', corto: 'Gestión', color: '#6EA8FF', min: 20 },
  { id: 't4', n: 4, titulo: 'La evaluación final: demo y revisión técnica', corto: 'Evaluación', color: '#B78CFF', min: 18 },
];
export const TEMA = Object.fromEntries(TEMAS.map((t) => [t.id, t]));
