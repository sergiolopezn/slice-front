# SliceOS Frontend

React + TypeScript + Vite app for the SliceOS kitchen and manager UI.

## API configuration

The frontend reads the backend base URL from `VITE_API_BASE_URL`.

```bash
cp .env.example .env.local
npm run dev
```

| Target | `VITE_API_BASE_URL` |
| --- | --- |
| Azure dev | `https://func-sliceos-api-dev-5663.azurewebsites.net` |
| Local Functions | `http://localhost:7071` |

If unset, the client defaults to `http://localhost:7071`.

### CORS when using the Azure dev API from localhost

With `npm run dev`, the app runs at **http://localhost:5173** and calls the Azure API directly from the browser. That is a cross-origin request, so the Function App must allow `http://localhost:5173` in **CORS**:

1. Azure Portal → Function App `func-sliceos-api-dev-5663` → **CORS**
2. Add `http://localhost:5173` to allowed origins and save

Backend infra sets `Cors__AllowedOrigin` / App Service CORS to `http://localhost:5173` for dev deploys (`backend/infra/main.bicep`). If you still see `Access-Control-Allow-Origin` errors, confirm the deployed app matches that setting or redeploy infra.

**Symptoms:** Network tab shows `(blocked:cors)` or preflight `OPTIONS` failures on `/api/*` routes.

---

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
