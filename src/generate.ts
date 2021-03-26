import fs from 'fs';
import util from 'util';

import type { PackageJson } from 'type-fest';

import packageJson from '../package.json';
import cliConfig from './cli';
import { Config } from './common';
import defaultConfig from './default';
import reactNativeConfig from './react-native';

const mkdirAsync = util.promisify(fs.mkdir);
const writeFileAsync = util.promisify(fs.writeFile);
const rmdirAsync = util.promisify(fs.rmdir);
const readFileAsync = util.promisify(fs.readFile);

const {
  version,
  repository,
  author,
  license,
  dependencies,
} = packageJson as PackageJson;

let readme: string;

function createPackageFile(name: string, config: Config): PackageJson {
  return {
    name: `@boilerz/${name}`,
    version,
    description: config.description,
    repository,
    author,
    license,
    main: 'tsconfig.json',
    files: ['tsconfig.json'],
    dependencies: {
      ...(config.base.extends?.startsWith('@tsconfig')
        ? {
            [config.base.extends]: dependencies![config.base.extends],
          }
        : {}),
    },
  };
}

async function generatePackage(config: Config): Promise<void> {
  const packageName = `tsconfig${config.suffix ? `-${config.suffix}` : ''}`;
  const productionPackageName = `${packageName}-production`;
  const packageNames = [packageName, productionPackageName];
  await Promise.all(
    packageNames.map((name) =>
      mkdirAsync(`packages/${name}`, { recursive: true }),
    ),
  );
  await Promise.all(
    packageNames.map((name) =>
      Promise.all([
        writeFileAsync(
          `packages/${name}/README.md`,
          readme
            .replace(/@boilerz\/tsconfig/g, `@boilerz/${name}`)
            .replace('> TS Config.', `> ${config.description}`),
        ),
        writeFileAsync(
          `packages/${name}/tsconfig.json`,
          JSON.stringify(
            name.includes('production') ? config.production : config.base,
            null,
            2,
          ),
        ),
        writeFileAsync(
          `packages/${name}/package.json`,
          JSON.stringify(createPackageFile(name, config), null, 2),
        ),
      ]),
    ),
  );
}

async function generate(
  configs: Config[] = [defaultConfig, cliConfig, reactNativeConfig],
): Promise<void> {
  readme = (await readFileAsync('README.md')).toString('utf-8');
  await rmdirAsync('packages', { recursive: true });
  await Promise.all(configs.map(generatePackage));
}

generate().catch(console.error);
