# ¿Cómo llegamos del Sprint 4 a la demo del 30 de noviembre? {#camino-entrega}

Con una semana de **integración y pruebas** con alcance cerrado: se congela lo que entra, se prueba el recorrido completo entre los cinco módulos, se marca la versión **v1.0.0** con un tag y se publica un **release** en GitLab; la demo muestra exactamente esa versión.

- El Sprint 4 cierra el 22 de noviembre; del 23 al 30 es integración, pruebas y demo.
- La fecha y los equipos ya no cambian: lo único que se ajusta es el alcance.
- Un tag de Git apunta a un commit exacto; el release le agrega notas y archivos.[](source:gitlab)

@answer scope="Capstone Delivery System · Sección E · noviembre de 2026"
@meta locale=es
@source gitlab title="GitLab Docs: Releases" url=https://docs.gitlab.com/user/project/releases
@source semver title="Semantic Versioning 2.0.0" url=https://semver.org/lang/es/

## ¿Qué pasa en la semana final? {#flujo}

@workflow id=entrega-flujo title="De main al release v1.0.0"
| cierre | Cierre del Sprint 4 | backend |
| integra | Integración de módulos | backend |
| congela | Congelar alcance | security |
| rc | Tag v1.0.0-rc.1 | external |
| ensayo | Ensayo de la demo | frontend |
| release | Release v1.0.0 | database |
| cierre > integra | | |
| integra > congela | | |
| congela > rc | | |
| rc > ensayo | | |
| ensayo > release | solo correcciones | emphasis |

@steps id=entrega-pasos
| e1 | Cerrar el Sprint 4 | Lo que no está fusionado en main con el pipeline en verde no cuenta como hecho. | entrega-flujo | cierre |
| e2 | Integrar | Probar el recorrido completo: usuario, catálogo, pedido, pago y entrega juntos. | entrega-flujo | integra |
| e3 | Congelar | Desde aquí solo entran correcciones, no funciones nuevas. | entrega-flujo | congela |
| e4 | Candidato | Un tag v1.0.0-rc.1 marca la versión que se ensaya. | entrega-flujo | rc |
| e5 | Ensayar | Correr la demo dos veces con cronómetro, en la máquina de la demo. | entrega-flujo | ensayo |
| e6 | Publicar | Tag v1.0.0 y release en GitLab con sus notas. | entrega-flujo | release |

## ¿Qué día va cada cosa? {#calendario}

@timeline id=entrega-calendario title="Propuesta de calendario"
| lane eq | Equipos |
| s4 | 2026-11-22T09:00:00-06:00 | Cierra el Sprint 4 | eq | action |
| int | 2026-11-23T09:00:00-06:00 | Integración y pruebas de punta a punta | eq | action |
| freeze | 2026-11-26T09:00:00-06:00 | Congelar alcance | eq | alert |
| rc1 | 2026-11-27T09:00:00-06:00 | v1.0.0-rc.1 y primer ensayo | eq | action |
| v1 | 2026-11-29T09:00:00-06:00 | v1.0.0 y ensayo general | eq | recovery |
| demo | 2026-11-30T09:00:00-06:00 | Demo final | eq | action |

Las fechas intermedias son una propuesta; la del 30 de noviembre es la de la demo.

## ¿Qué revisa cada equipo? {#checklist}

- [ ] ¿Todo lo de mi módulo está fusionado en main con pipeline en verde?
- [ ] ¿Mi módulo funciona junto con los demás, no solo con datos de prueba?
- [ ] ¿Sé qué historias no entran y lo dije en la Sprint Review?
- [ ] ¿Ensayamos la demo en la máquina donde la vamos a presentar?
