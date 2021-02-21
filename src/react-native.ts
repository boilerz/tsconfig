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
    extends: '@tsconfig/react-native',
  },
  commonConfig.base,
);

const production: TsConfigJson = merge<
  Record<string, unknown>,
  TsConfigJson,
  TsConfigJson,
  TsConfigJson
>({}, base, commonConfig.production, {
  exclude: ['babel.config.js', 'metro.config.js'],
});

const config: Config = {
  description: 'React-native TS Config',
  suffix: 'react-native',
  base,
  production,
};

export default config;
