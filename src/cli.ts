import merge from 'lodash.merge';
import type { TsConfigJson } from 'type-fest';

import { Config } from './common';
import defaultConfig from './default';

const nodeConfig: TsConfigJson = {
  extends: '@tsconfig/node12',
};

const base: TsConfigJson = merge<
  Record<string, unknown>,
  TsConfigJson,
  TsConfigJson
>({}, defaultConfig.base, nodeConfig);

const production: TsConfigJson = merge<
  Record<string, unknown>,
  TsConfigJson,
  TsConfigJson
>({}, defaultConfig.production, nodeConfig);

const config: Config = {
  description: 'CLI TS Config',
  suffix: 'cli',
  base,
  production,
};

export default config;
