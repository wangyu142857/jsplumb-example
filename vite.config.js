import vue from '@vitejs/plugin-vue';
import path from 'path';

/**
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue()],
  alias: {
    '@': path.resolve(__dirname, 'src'),
    style: path.resolve(__dirname, 'src/style'),
  },
};
