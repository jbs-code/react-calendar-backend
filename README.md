# React Calendar Backend

API de Express con TypeScript, Bun y MongoDB.

## Desarrollo local

1. Copia `.env.template` como `.env` y configura `PORT`, `DB_CNN` y `JWT_SECRET_SEED`.
2. Instala las dependencias con `bun install`.
3. Inicia el servidor con `bun run dev`.

## Despliegue en Vercel

Vercel detecta la aplicación Express exportada desde `index.ts`. `bun.lock` permite que Vercel use Bun para instalar las dependencias; las funciones se ejecutan con el runtime Node.js predeterminado.

1. Importa este repositorio como proyecto en Vercel y deja el directorio raíz del proyecto en la carpeta que contiene este `package.json`.
2. En **Settings → Environment Variables**, crea `DB_CNN` y `JWT_SECRET_SEED` para Production y, si corresponde, Preview/Development. No subas `.env` al repositorio.
3. En MongoDB Atlas, permite las conexiones entrantes desde Vercel (por ejemplo, `0.0.0.0/0` si no tienes una estrategia de allowlist de IP) y usa credenciales con privilegios mínimos.
4. Despliega desde Vercel o con `vercel --prod`.

Los archivos de `public/` se sirven como contenido estático de Vercel; Express solo sirve esa carpeta durante el desarrollo local. Las rutas de la API mantienen sus prefijos `/api/auth` y `/api/events`.
