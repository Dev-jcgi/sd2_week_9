# DS2 · Semana 9 · De sprint a producto

**Desarrollo de Software 2 · Sección E · Capstone Delivery System**

Sesión de 2 horas (con receso de 10 minutos) para la recta final del capstone: de la última semana de trabajo a la demo del 30 de noviembre.

| Tema | Qué se ve |
|---|---|
| 1 · Gestión de proyectos | Triángulo alcance–tiempo–equipo, velocidad, burndown, MoSCoW, riesgos y coordinación LeSS |
| 2 · Versionado | SemVer (MAJOR.MINOR.PATCH), SNAPSHOT y pre-release, tags anotados, releases de GitLab y CHANGELOG |
| 3 · Entregables | Producto, código, documentación, proceso, demo e individual; prueba del recién llegado; DoD del producto |
| 4 · Demostración | Guion de 10 minutos con un pedido de punta a punta, roles, preparación y plan B |

- `#/profesor` · **modo profesor**: inicias sesión, se abre una sala con un solo QR/PIN y lanzas cada actividad desde la barra de abajo.
- `#/sala` · el celular del estudiante (apodo + PIN, una sola vez).
- `#/presentacion` · la presentación pública (→ temas, ↓ profundizar). `?t=t2` abre un tema.
- `#/actividades` · las 4 actividades para practicar por cuenta propia, con autocorrección.
- `#/simuladores` · ¿llegamos a la demo?, máquina de versiones, semáforo de entrega y ensayo de demo.
- `public/diagramas/` · diagramas de Archify (fuentes en `archify/`).

## Desarrollo

```bash
npm install
npm run dev
```

## Publicar en GitHub Pages

1. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. **Settings → Secrets and variables → Actions → Variables**: las mismas 5 variables de Firebase de los otros cursos
   (`VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_APP_ID`, `VITE_HOST_EMAIL`).
3. Cada push a `main` publica el sitio (o **Actions → Publicar en GitHub Pages → Run workflow**).

Las salas se marcan con `curso: 'ds2'` y `week: 9`, así que no se cruzan con las de DS5.
Sin las variables, el sitio funciona en **modo demo local** (la sala solo conecta pestañas del mismo navegador).
