import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For a user site (JulesCollenne.github.io), base must be '/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})

