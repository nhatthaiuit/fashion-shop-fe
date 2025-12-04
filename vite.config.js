import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      {
        name: 'custom-logger',
        configureServer(server) {
          const _printUrls = server.printUrls
          server.printUrls = () => {
            // _printUrls() // Không gọi hàm mặc định để tránh lặp
            const deployUrl = env.VITE_DEPLOY_URL || "https://fashion-shop-frontend.vercel.app" // Fallback or empty

            console.log(`  ➜  🚀 LOCAL:      http://localhost:${server.config.server.port || 5173}/`)
            if (deployUrl) {
              console.log(`  ➜  🌍 DEPLOYMENT: ${deployUrl}/`)
            }
            console.log(`  ➜  👉 Press h + enter to show help`)
          }
        }
      }
    ],
  }
})
