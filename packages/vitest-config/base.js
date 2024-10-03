import { defineConfig } from 'vitest/config';

const baseConfig = defineConfig({
  test: {
    globals: true,
  },
});

export default baseConfig;
