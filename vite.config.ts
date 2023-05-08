// vite.config.ts
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import { babel } from '@rollup/plugin-babel'

export default defineConfig({
  plugins: [
    reactRefresh(),
    babel({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      configFile: true,
      babelHelpers: 'bundled',
      skipPreflightCheck: true
    })
  ]
})
