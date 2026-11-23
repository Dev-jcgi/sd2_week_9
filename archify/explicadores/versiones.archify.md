# ¿Qué número de versión le toca a cada cambio del Delivery System? {#versiones}

Con **versionado semántico** (MAJOR.MINOR.PATCH): si rompes lo que otros módulos usan sube **MAJOR**, si agregas algo compatible sube **MINOR** y si solo corriges sube **PATCH**. Hoy todo está en 0.0.1-SNAPSHOT; la demo debería mostrar **1.0.0**.

- La versión 1.0.0 define la API pública; en 0.y.z cualquier cosa puede cambiar.[](source:semver)
- En Maven, SNAPSHOT significa «en construcción»: la versión final no lo lleva.[](source:maven)
- Un CHANGELOG agrupa los cambios en Added, Changed, Fixed y Removed para cada versión.[](source:kac)

@answer scope="Versionado del Capstone Delivery System"
@meta locale=es
@source semver title="Semantic Versioning 2.0.0 (español)" url=https://semver.org/lang/es/
@source maven title="Maven: What is a SNAPSHOT version?" url=https://maven.apache.org/guides/getting-started/index.html#what-is-a-snapshot-version
@source kac title="Keep a Changelog (español)" url=https://keepachangelog.com/es-ES/1.1.0/

## ¿Cómo se lee una versión? {#lectura}

| Parte | Sube cuando… | Ejemplo en el capstone |
| --- | --- | --- |
| MAJOR | Rompes un contrato que otros usan | Cambiar la firma de UserService.isActiveWithRole {bad:Rompe} |
| MINOR | Agregas algo sin romper nada | Agregar findCommerceIdsByMerchant a CatalogService {good:Compatible} |
| PATCH | Solo corriges un error | Corregir el costo de envío copiado de ReadyOrder {good:Seguro} |
| Pre-release | Aún se está probando | 1.0.0-rc.1 antes de la demo {caution:Ensayo} |

## ¿Cómo se publica una versión? {#publicar}

@workflow id=publicar-flujo title="De SNAPSHOT a release"
| pom | Quitar -SNAPSHOT en los pom | backend |
| mr | MR aprobado y fusionado | backend |
| ci | Pipeline en verde en main | security |
| tag | Tag anotado v1.0.0 | external |
| rel | Release en GitLab con notas | database |
| pom > mr | | |
| mr > ci | | |
| ci > tag | | |
| tag > rel | | emphasis |

@steps id=publicar-pasos
| v1 | Cambiar la versión | ./mvnw versions:set -DnewVersion=1.0.0 en cada módulo, por MR como cualquier cambio. | publicar-flujo | pom |
| v2 | Fusionar | El Scrum Master aprueba y el MR entra a main. | publicar-flujo | mr |
| v3 | Verificar | El pipeline compila los siete proyectos en verde. | publicar-flujo | ci |
| v4 | Etiquetar | git tag -a v1.0.0 -m "Demo final" y git push origin v1.0.0. | publicar-flujo | tag |
| v5 | Publicar | Deploy → Releases → New release, con las notas del CHANGELOG. | publicar-flujo | rel |

```bash title="Comandos del release"
./mvnw versions:set -DnewVersion=1.0.0 -DgenerateBackupPoms=false
git tag -a v1.0.0 -m "Delivery System 1.0.0 · demo final"
git push origin v1.0.0
```

## ¿Qué revisamos antes de etiquetar? {#checklist}

- [ ] ¿Ningún pom dice SNAPSHOT?
- [ ] ¿El tag apunta al commit de main con pipeline en verde?
- [ ] ¿El CHANGELOG lista lo que entra en esta versión?
- [ ] ¿Cualquiera puede descargar el tag y ejecutarlo con el README?
