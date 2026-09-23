import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['three'],
  },
  optimizeDeps: {
    include: [
      'three',
      'three/addons/geometries/RoundedBoxGeometry.js',
      'three/addons/environments/RoomEnvironment.js',
      'three/addons/postprocessing/EffectComposer.js',
      'three/addons/postprocessing/RenderPass.js',
      'three/addons/postprocessing/UnrealBloomPass.js',
      'three/addons/postprocessing/OutputPass.js',
      'three/addons/postprocessing/GTAOPass.js',
    ],
  },
  build: {
    target: 'es2022',
    cssTarget: 'safari16',
    assetsInlineLimit: 2048,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) return 'three'
          if (id.includes('node_modules/motion')) return 'motion'
        },
      },
    },
  },
})
