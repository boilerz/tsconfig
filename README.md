# @boilerz/tsconfig

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/boilerz/tsconfig/blob/master/LICENSE)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/boilerz/tsconfig)](https://www.npmjs.com/package/@boilerz/tsconfig)

> TS Config.

### Install

````bash
yarn add -D @boilerz/tsconfig
````

### Usage

`tsconfig.json` example:

```json
{
  "extends": "@boilerz/tsconfig"
}
```

`tsconfig.production.json` example (exclude a set of non-necessary assets from the build):

```json
{
  "extends": "@boilerz/tsconfig/production"
}
```

[@boilerz/build-tools](https://github.com/boilerz/build-tools) will use `tsconfig.production.json` when detected.

### Release

```bash
yarn version
yarn publish --access public
```
