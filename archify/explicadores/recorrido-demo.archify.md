# ¿Qué recorrido muestra la demo del Delivery System? {#recorrido-demo}

Un **pedido de punta a punta** contado como la historia de un cliente: entra, elige productos, paga, el comercio lo prepara y un repartidor lo entrega con su código. Así se ven **los cinco módulos trabajando juntos** en menos de cinco minutos.

- Cada paso usa un contrato de core-module: UserService, CatalogService, OrderService y PaymentService.
- El código de confirmación son los últimos 4 caracteres del id del pedido (decisión D-02).
- Pagos cobra con el último método de pago registrado (decisión D-04).

@answer scope="Guion del recorrido feliz para la demo final"
@meta locale=es
@source capstone title="Capstone Delivery System: decisiones de integración D-00 a D-09" url=https://jcgi.lat/guia_git_flow/requerimientos.html

## ¿Qué módulo entra en cada paso? {#secuencia}

@sequence id=demo-secuencia title="Un pedido de punta a punta"
| actor cli | Cliente | frontend |
| actor cat | Catálogo | backend |
| actor ord | Pedidos | backend |
| actor pay | Pagos | backend |
| actor del | Entregas | backend |
| phase | Elegir |
| cli | cat | ver comercios y productos disponibles |
| cli | ord | agregar al carrito y crear pedido |
| ord | cat | reservar stock (D-09) |
| phase | Pagar |
| ord | pay | cobrar con el último método (D-04) |
| pay | ord | pago aprobado | return |
| phase | Entregar |
| del | ord | repartidor toma el pedido |
| del | cli | pide el código (D-02) | emphasis |
| del | ord | entregado | return |

@steps id=demo-pasos
| d1 | Elegir | El cliente ve comercios habilitados y productos con stock. | demo-secuencia | cat |
| d2 | Pedir | Pedidos crea el pedido y reserva el stock en catálogo. | demo-secuencia | ord |
| d3 | Pagar | Pagos cobra con el último método registrado. | demo-secuencia | pay |
| d4 | Entregar | El repartidor avanza los estados y confirma con el código. | demo-secuencia | del |

## ¿Cuánto tiempo lleva cada parte? {#tiempos}

| Parte | Minutos | Qué se ve |
| --- | --- | --- |
| Problema y usuario | 1 | Para quién es y qué le resuelve |
| Recorrido feliz | 4–5 | El pedido de punta a punta {good:Centro} |
| Una regla de negocio | 1–2 | Cancelar solo en Creado o Listo (D-06) |
| Cómo está hecho | 1–2 | Monolito modular, contratos en core |
| Qué sigue y preguntas | 1 | Lo que quedó fuera y por qué {caution:Honestidad} |

## ¿Qué preparamos antes? {#checklist}

- [ ] Usuarios de prueba listos (SampleUsers) y datos cargados.
- [ ] Arranque en limpio con el perfil de memoria probado esa mañana.
- [ ] Video de respaldo del recorrido completo.
- [ ] Quién narra, quién maneja el teclado y quién cuida el tiempo.
