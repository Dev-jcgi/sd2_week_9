# DS2 · Semana 9 · Laboratorio 9, demo, versión 1.0.0 y evaluación final

**Desarrollo de Software 2 · Sección E · Capstone Delivery System**

Sesión de 2 horas con receso de 10 minutos para cerrar el proyecto: qué se entrega en el Laboratorio 9, cómo se prepara la demo, cómo se publica la versión 1.0.0 y cómo se evalúa el 30/11, el 1/12 y el 2/12. Todo es estático (GitHub Pages), sin servidor propio: el navegador del profesor es el centro de la sesión y los celulares se conectan directo a él con [PeerJS](https://peerjs.com) (WebRTC). **Un solo QR para toda la clase.**

| Parte | Ruta | Qué es |
|---|---|---|
| Inicio | `#/` | Los 4 temas y los enlaces del capstone (guía del Lab 9, tags, pendientes de integración, evaluación final, SemVer). |
| Presentación 2D | `#/presentacion` | reveal.js: una columna por tema (→) y detalle hacia abajo (↓). Diagramas animados con HTML y CSS. **P** abre el marcador de equipos, **ESC** la vista general. |
| Profesor | `#/profesor` | **Crear sesión** → aparece el QR. Al llegar a la diapositiva de una actividad, **se lanza sola** en los celulares. **P** muestra el podio. |
| Mi sesión (estudiante) | `#/vivo?s=<sesión>` | Escanea el QR, escribe su nombre y elige su equipo. Si su red no conecta, usa el código de respaldo de la diapositiva. |

## Temas y agenda

| Min | Qué |
|---|---|
| 0–10 | Inicio (calendario hasta el 2/12) + **Actividad 1 · ¿Qué hace una buena demo?** (código DEMO) |
| 10–30 | Tema 1 · La demo (Lab 9, Actividad 1): flujo de punta a punta, guion de 15 minutos, entregables del 29/11, preparación con MySQL y cómo se califica |
| 30–50 | Tema 2 · La versión 1.0.0 (Lab 9, Actividad 2): SemVer, GitHub Flow con congelamiento, los pom.xml, el pipeline de la versión y el paso a paso del equipo |
| 50–60 | **Actividad 2 · Ponle número a la versión** (código TAGS) |
| 60–70 | Receso (diapositiva con cuenta regresiva) |
| 70–90 | Tema 3 · Gestión de la semana de integración: triple restricción, congelamiento, Scrum con LeSS, métricas y riesgos de la semana |
| 90–95 | **Actividad 3 · El congelamiento** (código PLAN) |
| 95–113 | Tema 4 · La evaluación final: cronograma y rúbrica del E.10, arquitectura limpia y hexagonal, puertos y adaptadores, cómo resolver un cambio en vivo y la DoD |
| 113–118 | **Actividad 4 · ¿En qué capa va?** (código ENTR) |
| 118–120 | Cierre y podio de equipos |

## Publicar en GitHub Pages

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. Cualquier push a `main` (o **Actions → Publicar en GitHub Pages → Run workflow**) publica el sitio en `https://<dominio>/sd2_week_9/`.

## Desarrollo local

```bash
npm install
npm run dev
```
