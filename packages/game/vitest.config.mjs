import { resolve } from 'node:path';
import { defineConfig, mergeConfig } from 'vitest/config';
import baseConfig from '@repo/vitest-config/base';

export default mergeConfig(
  baseConfig,
  defineConfig({
    resolve: {
      alias: { '@': resolve(__dirname, './src') },
    },
  }),
);
