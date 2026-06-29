# Git Flow Guide — F&F-MEDIC

## Ramas

| Rama | Base | Protegida | Propósito | Merge strategy |
|------|------|-----------|-----------|----------------|
| `main` | — | Sí | Producción, solo recibe releases | Merge commit desde develop |
| `develop` | `main` | Sí | Integración de features en desarrollo | Squash merge desde feat/fix/chore |
| `feat/*` | `develop` | No | Nueva funcionalidad | Squash merge a develop |
| `fix/*` | `develop` | No | Corrección de bug | Squash merge a develop |
| `chore/*` | `develop` | No | CI, config, dependencias | Squash merge a develop |
| `release/x.y.z` | `develop` | No | Preparación de release | Merge commit a main y develop |
| `hotfix/*` | `main` | No | Bug crítico en producción | Merge commit a main y develop |

## Ciclo de feature

1. `git checkout develop && git pull`
2. `git checkout -b feat/mi-feature`
3. Codear y committear (varios commits)
4. `git push -u origin feat/mi-feature`
5. Abrir PR a develop
6. CI corre automáticamente
7. Code review (si aplica)
8. Squash merge → 1 commit en develop
9. Borrar branch local y remota

## Ciclo de release

1. `git checkout develop && git pull`
2. `git checkout -b release/x.y.z`
3. Solo bugfixes, no features nuevas
4. PR release/x.y.z → main (merge commit)
5. `git tag vx.y.z` en main
6. PR release/x.y.z → develop (merge commit)
7. Borrar branch

## Ciclo de hotfix

1. `git checkout main && git pull`
2. `git checkout -b hotfix/descripcion`
3. Arreglar, committear
4. PR hotfix → main (merge commit)
5. `git tag vx.y.z+1` en main
6. PR hotfix → develop (merge commit)
7. Borrar branch

## Conventional Commits

Formato: `tipo(alcance): mensaje en imperativo presente`

### Tipos

| Tipo | Uso |
|------|-----|
| `feat` | Nueva funcionalidad para el usuario |
| `fix` | Corrección de bug |
| `build` | Dependencias, scripts, herramientas de build |
| `chore` | Mantenimiento interno, configs, CI |
| `docs` | Documentación |
| `refactor` | Cambio que no agrega feature ni arregla bug |
| `test` | Tests |
| `style` | Formato, linting |

### Reglas

- Todo en minúsculas
- Sin punto final
- Sin emojis ni corchetes
- Alcance opcional, en kebab-case, indica el módulo
- Descripción en imperativo presente: `add`, `fix`, `update`, `remove`, `migrate`

## Conventional Branches

Formato: `tipo/descripcion-corta`

- Solo se usan `feat/`, `fix/`, `chore/`, `release/`, `hotfix/`
- No se incluye alcance en el nombre de la branch
- La branch agrupa cambios relacionados en una unidad de trabajo lógica

## Estrategias de merge

| Escenario | Estrategia | Historial |
|-----------|-----------|-----------|
| feat/fix/chore → develop | Squash merge | 1 commit plano por feature |
| develop → main | Merge commit | Preserva ramas, marca releases |
| hotfix → main | Merge commit | Preserva ramas |
| release → develop | Merge commit | Sincroniza cambios |

## CI (Continuous Integration)

- Se activa en cada PR a develop y main
- Corre: lint, build, tests
- Si falla → el PR no se puede mergear
- Herramientas: GitHub Actions (`.github/workflows/ci.yml`)

## PR (Pull Request)

- Solicitud de integración de una rama a otra
- Sirve para: code review, CI automático, discusión línea por línea, registro histórico
- En proyectos individuales: auto-aprobación (pero se mantiene el proceso)
- En proyectos en equipo: requiere al menos 1 approval de alguien que no sea el autor

## GitHub Rulesets (protección de ramas)

Se configuran en Settings → Rulesets del repositorio.

### Reglas para ramas protegidas (main + develop) — core-branches

| Regla | Estado |
|-------|--------|
| Restrict creations | Activo |
| Restrict updates | Activo |
| Restrict deletions | Activo |
| Require a pull request before merging | Activo (1 approval, stale approvals, approve latest push) |
| Require status checks to pass | Pendiente (activar tras primera ejecución de CI) |
| Require branches to be up to date | Pendiente |
| Block force pushes | Activo |

### Orden de configuración

1. Crear ruleset con reglas básicas (sin status checks) — OK
2. Crear workflow CI (`.github/workflows/ci.yml`)
3. Hacer un PR para que el CI se ejecute y genere checks
4. Volver al ruleset y activar "Require status checks to pass" seleccionando los checks existentes
5. Activar "Require branches to be up to date"

## Reglas generales

- `main` y `develop` siempre protegidas
- Nadie pushea directo (solo PRs)
- CI debe pasar antes de mergear
- Branches se borran después del merge
