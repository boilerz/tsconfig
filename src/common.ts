import merge from 'lodash.merge';
import type { TsConfigJson } from 'type-fest';

import { relativePathToPackage } from './helper';

export interface Config {
  description: string;
  suffix?: string;
  base: TsConfigJson;
  production: TsConfigJson;
}

const base: TsConfigJson = {
  compilerOptions: {
    sourceMap: true,
    noImplicitThis: true,
    noImplicitAny: true,
    noUnusedLocals: true,
    importHelpers: true,
    strictNullChecks: true,
    pretty: true,
    allowSyntheticDefaultImports: true,
    resolveJsonModule: true,
  },
};

const production: TsConfigJson = merge<
  Record<string, unknown>,
  TsConfigJson,
  TsConfigJson
>({}, base, {
  compilerOptions: {
    sourceMap: false,
  },
  exclude: relativePathToPackage([
    'node_modules',
    'examples',
    'coverage',
    'dist',
    'jest.config.js',
    'src/**/*.spec.ts',
    'src/**/*.spec.tsx',
    'src/**/*.stories.tsx',
  ]),
});

const config: Config = {
  description: 'Common config',
  base,
  production,
};

export default config;
