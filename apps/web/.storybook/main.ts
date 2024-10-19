import type { StorybookConfig } from '@storybook/experimental-nextjs-vite';

import { join, dirname, resolve } from 'node:path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(jsx|tsx)'],
  framework: {
    name: getAbsolutePath('@storybook/experimental-nextjs-vite'),
    options: {},
  },
  addons: [
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  viteFinal: async (config) => {
    const { mergeConfig } = await import('vite');
    return mergeConfig(config, {
      resolve: {
        alias: { '@': resolve(__dirname, '../src') },
      },
    });
  },
  features: {
    experimentalRSC: true,
  },
  staticDirs: ['../public'],
};

export default config;
