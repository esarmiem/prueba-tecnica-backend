# Prueba Técnica — Backend

API REST para gestión de gastos personales. Está construida con Node.js, Express y TypeScript, con almacenamiento en memoria.

## Requisitos

- Node.js 18+
- pnpm

## Configuración de entorno

Crea el archivo `.env` a partir de `.env.example`:

```
PORT=3001
ALLOWED_ORIGIN=https://your-vercel-app.vercel.app
```

Notas:
- `ALLOWED_ORIGIN` debe ser el dominio exacto de Vercel.
- En producción, Render define `NODE_ENV=production`.

## Instalación y ejecución local

```bash
pnpm install
pnpm dev
```

## Build y ejecución en producción

```bash
pnpm build
pnpm start
```

## Endpoints

- GET `/api/expenses`
- POST `/api/expenses`
- PUT `/api/expenses/:id`
- DELETE `/api/expenses/:id`
- GET `/health`

## CORS

En `src/app.ts` se configura CORS para:

- `origin="*"` en desarrollo
- `origin=ALLOWED_ORIGIN` en producción

## Deploy en Render

Este proyecto incluye `render.yaml` en la raíz del backend. Verifica que:

- `rootDir` apunte a `pruebatecnicabackend`
- `ALLOWED_ORIGIN` coincida con tu dominio de Vercel (sin slash)
