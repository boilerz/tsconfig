import merge from 'lodash.merge';
import type { TsConfigJson } from 'type-fest';

import commonConfig, { Config } from './common';
import { relativePathToPackage } from './helper';

const base: TsConfigJson = merge<
  Record<string, unknown>,
  TsConfigJson,
  TsConfigJson
>(
  {},
  {
    extends: '@tsconfig/node16',
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
    rootDir: relativePathToPackage('src'),
    outDir: relativePathToPackage('dist'),
    noEmit: false,
    noEmitOnError: true,
    declaration: true,
  },
});

const config: Config = {
  description: 'Node TS Config',
  base,
  production,
};

export default config;
