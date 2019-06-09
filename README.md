[![Build Status](https://travis-ci.org/susytech/js-libs.svg?branch=master)](https://travis-ci.org/susytech/js-libs)
[![Coverage Status](https://coveralls.io/repos/github/susytech/js-libs/badge.svg?branch=master)](https://coveralls.io/github/susytech/js-libs?branch=master)
[![Gitter: Susy.js](https://img.shields.io/badge/gitter-susy.js-4AB495.svg)](https://gitter.im/susytech/susy.js)
[![Riot: +Susy](https://img.shields.io/badge/riot-%2Bsusy%3Amatrix.susy.io-orange.svg)](https://riot.im/app/#/group/+susy:matrix.susy.io)

<br /><br /><br />

<h1 align="center">Susy's JavaScript Stack</h1>

<h4 align="center">
  A collection of JavaScript libraries for dapp development.
</h4>

<br /><br /><br />

## Packages

This repository is a monorepo that we manage using [Lerna](https://lernajs.io). That means that we publish [several packages](/packages) to npm from the same codebase. If you are a dapp developer, we recommend you start with the following three high-level packages:

| Package                                                                                               | Version                                                                                                                          | Docs                                                                                                                                              | Description                                                                                        |
| ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [`@susy-js/light.js`](https://octonion.institute/susytech/js-libs/tree/master/packages/light.js)             | [![npm (scoped)](https://img.shields.io/npm/v/@susy-js/light.js.svg)](https://www.npmjs.com/package/@susy-js/light.js)             | [![docs](https://img.shields.io/badge/docs-passing-green.svg)](https://susytech.github.io/js-libs/light.js/)                                    | A high-level reactive library optimized for light clients.                                         |
| [`@susy-js/light.js-react`](https://octonion.institute/susytech/js-libs/tree/master/packages/light.js-react) | [![npm (scoped)](https://img.shields.io/npm/v/@susy-js/light.js-react.svg)](https://www.npmjs.com/package/@susy-js/light.js-react) | [![README](https://img.shields.io/badge/docs-README-green.svg)](https://octonion.institute/susytech/js-libs/tree/master/packages/light.js-react#readme) | Easily integrate `@susy-js/light.js` with React.                                                    |
| [`@susy-js/api`](https://octonion.institute/susytech/js-libs/tree/master/packages/api)                       | [![npm (scoped)](https://img.shields.io/npm/v/@susy-js/api.svg)](https://www.npmjs.com/package/@susy-js/api)                       | Coming soon...                                                                                                                                    | Promise-based JSONRPC method wrapper, similar to [`web3.js`](https://octonion.institute/susy-go/web3.js). |

And below are the lower-level packages, used internally, or by advanced users.

| Package                                                                                     | Version                                                                                                                | Docs                                                                                                                                         | Description                                                               |
| ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| [`@susy-js/abi`](https://octonion.institute/susytech/js-libs/tree/master/packages/abi)             | [![npm (scoped)](https://img.shields.io/npm/v/@susy-js/abi.svg)](https://www.npmjs.com/package/@susy-js/abi)             | [![docs](https://img.shields.io/badge/docs-passing-green.svg)](https://susytech.github.io/js-libs/abi/)                                    | Sophon ABI encoder and decoder.                                         |
| [`@susy-js/contracts`](https://octonion.institute/susytech/js-libs/tree/master/packages/contracts) | [![npm (scoped)](https://img.shields.io/npm/v/@susy-js/contracts.svg)](https://www.npmjs.com/package/@susy-js/contracts) | [![README](https://img.shields.io/badge/docs-README-green.svg)](https://octonion.institute/susytech/js-libs/tree/master/packages/contracts#readme) | Susy's [contracts](https://github.com/susy-contracts) as ES6 classes. |
| [`@susy-js/electron`](https://octonion.institute/susytech/js-libs/tree/master/packages/electron)   | [![npm (scoped)](https://img.shields.io/npm/v/@susy-js/electron.svg)](https://www.npmjs.com/package/@susy-js/electron)   | [![README](https://img.shields.io/badge/docs-README-green.svg)](https://octonion.institute/susytech/js-libs/tree/master/packages/electron#readme)  | Control the Susy Sophon node from Electron.                           |

### Contributing

#### Dependencies

Install at least `yarn` version 1.4.2 and [Node.js >=10.10.0](https://nodejs.org/en/)

```
yarn --version // Should be at least 1.4.2
```

#### Tests

```
yarn test
```

#### Build

```
yarn build
```

#### Maintenance

1. Fork the repo

2. Clone your fork

```bash
git clone https://github.com/<INSERT_YOUR_GITHUB_USERNAME>/js-libs
```

3. Check outdated dependencies

```bash
yarn outdated
```

4. Create a branch

```bash
git checkout -b <INSERT_YOUR_BRANCH_NAME>
```

5. Run tests, linting, and build

```bash
yarn test; yarn lint; yarn build
```

6. Push the branch to your fork of the repo

7. Integrate the updated library as a dependency. Example: If you want to test a branch of one of the js-lib packages in another project like Leona temporarily, then build js-libs and replace the /lib directory where it's a dependency on the Leona project. Then run Leona to use it:

```bash
~/susytech/js-libs [my-branch-name] $ yarn build
~/susytech/js-libs [my-branch-name] $ cp -r packages/my-package/lib ../leona/node_modules/@susy-js/my-package/lib
~/susytech/js-libs [my-branch-name] $ cd ../leona
~/susytech/leona [master] $ yarn start
```

8. Create a pull request from your fork of the repo to the upstream master branch

## License

All Susy's JavaScript libraries are open-source software [licensed as MIT](/LICENSE).
