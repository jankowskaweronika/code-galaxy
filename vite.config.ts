import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

const surgeDeploy = () => {
  return {
    name: 'surge-deploy',
    closeBundle: async () => {
      const distDir = path.resolve('dist');
      const indexPath = path.join(distDir, 'index.html');
      const surgePath = path.join(distDir, '200.html');

      try {
        const indexContent = await fs.promises.readFile(indexPath, 'utf-8');
        await fs.promises.writeFile(surgePath, indexContent);
        console.log('Created 200.html for Surge deployment');
      } catch (error) {
        console.error('Error creating 200.html:', error);
      }
    }
  };
};

export default defineConfig({
  plugins: [react(), surgeDeploy()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});