# @susy-js/contracts

Susy's [contracts](https://github.com/susy-contracts) as ES6 classes.

[![Build Status](https://travis-ci.org/susytech/js-libs.svg?branch=master)](https://travis-ci.org/susytech/js-libs)
[![npm (scoped)](https://img.shields.io/npm/v/@susy-js/contracts.svg)](https://www.npmjs.com/package/@susy-js/contracts)
[![npm](https://img.shields.io/npm/dw/@susy-js/contracts.svg)](https://www.npmjs.com/package/@susy-js/contracts)
[![dependencies Status](https://david-dm.org/susytech/js-libs/status.svg?path=packages/contracts)](https://david-dm.org/susytech/js-libs?path=packages/contracts)

## Installation

```bash
yarn add @susy-js/contracts
```

## Usage

### The Contracts object

```javascript
import Api from '@susy-js/api';
import Contracts from '@susy-js/contracts';

const sophonProvider = ...; // Put your Sophon provider here, e.g. from MetaMask
const api = new Api(sophonProvider);

const contracts = Contracts.get(api);

// The contracts object exposes the following contracts:
contracts.badgerefg
contracts.dappref
contracts.githubhint
contracts.registry
contracts.signaturereg
contracts.tokenreg
```

See the [docs/](docs) folder to see the properties of each of those contracts.

### Import ABIs

```javascript
import { sip20 } from '@susy-js/contracts/lib/abi';
```

The list of available ABIs is in the [src/abi/](src/abi) folder.
