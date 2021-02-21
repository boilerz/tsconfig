import merge from 'lodash.merge';
import type { TsConfigJson } from 'type-fest';

import commonConfig, { Config } from './common';

const base: TsConfigJson = merge<
  Record<string, unknown>,
  TsConfigJson,
  TsConfigJson
>(
  {},
  {
    extends: '@tsconfig/node14',
    compilerOptions: {
      noEmit: true,
    },
  },
  commonConfig.base,
);

const production: TsConfigJson = merge<
  Record<string, unknown>,
  TsConfigJson,
  TsConfigJson,
  TsConfigJson
>({}, base, commonConfig.production, {
  compilerOptions: {
    rootDir: 'src',
    outDir: 'dist',
    noEmit: false,
    declaration: true,
  },
});

const config: Config = {
  description: 'Node TS Config',
  base,
  production,
};

export default config;
