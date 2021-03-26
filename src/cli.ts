import merge from 'lodash.merge';
import type { TsConfigJson } from 'type-fest';

import { Config } from './common';
import defaultConfig from './default';

const node10Config: TsConfigJson = {
  extends: '@tsconfig/node10',
};

const base: TsConfigJson = merge<
  Record<string, unknown>,
  TsConfigJson,
  TsConfigJson
>({}, defaultConfig.base, node10Config);

const production: TsConfigJson = merge<
  Record<string, unknown>,
  TsConfigJson,
  TsConfigJson
>({}, defaultConfig.production, node10Config);

const config: Config = {
  description: 'CLI TS Config',
  suffix: 'cli',
  base,
  production,
};

export default config;
