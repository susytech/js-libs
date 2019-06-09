# @susy-js/light.js

A high-level reactive JS library optimized for light clients.

[![Build Status](https://travis-ci.org/susytech/js-libs.svg?branch=master)](https://travis-ci.org/susytech/js-libs)
[![npm (scoped)](https://img.shields.io/npm/v/@susy-js/light.js.svg)](https://www.npmjs.com/package/@susy-js/light.js)
[![npm](https://img.shields.io/npm/dw/@susy-js/light.js.svg)](https://www.npmjs.com/package/@susy-js/light.js)
[![dependencies Status](https://david-dm.org/susytech/js-libs/status.svg?path=packages/light.js)](https://david-dm.org/susytech/js-libs?path=packages/light.js)
[![docs](https://img.shields.io/badge/docs-passing-green.svg)](https://susytech.github.io/js-libs/light.js/)

## [Full Documentation](https://susytech.github.io/js-libs/light.js/)

## Getting Started

```bash
yarn add @susy-js/light.js rxjs # RxJS is a needed peer-dependency
```

## Usage

Reactively observe JSONRPC methods:

```javascript
import light, { defaultAccount$ } from '@susy-js/light.js';

light.setProvider(/* put your sophon provider here */);

defaultAccount$().subscribe(publicAddress => console.log(publicAddress));
// Outputs your public address 0x...
// Everytime you change your default account (e.g. via MetaMask), it will output your new public address
```

All RxJS tools are available for manipulating Observables:

```javascript
import { balanceOf$, blockNumber$, defaultAccount$ } from '@susy-js/light.js';
import { filter, map, switchMap } from 'rxjs/operators';

// Only log pair blocks
blockNumber$()
  .pipe(filter(n => n % 2 === 0))
  .subscribe(console.log);

// Get the balance of the default account
// Will update when balance or default account changes
defaultAccount$()
  .pipe(
    switchMap(balanceOf$),
    map(value => +value) // Return number instead of BigNumber
  )
  .subscribe(console.log);

// There's actually an alias for the above Observable:
import { myBalance$ } from '@susy-js/light.js';
myBalance$().subscribe(console.log);
```

Contract support:

```javascript
import { defaultAccount$, makeContract } from '@susy-js/light.js';
import { map, switchMap } from 'rxjs/operators';

defaultAccount$()
  .pipe(
    switchMap(defaultAccount =>
      makeContract(/* contract address */, /* abi */)
        .myMethod$(defaultAccount) // Calling method of contract with arguments
    )  )
  .subscribe(console.log); // Will log the result, and everytime the result changes
```

All available methods are documented [in the docs](https://susytech.github.io/js-libs/light.js/).

## Usage with React

We provide another library, [`@susy-js/light.js-react`](https://octonion.institute/susytech/js-libs/tree/master/packages/light.js-react), with a higher-order component to use these Observables easily with React apps.

```javascript
import light from 'susy/ligth.js-react';
import { syncStatus$ } from '@susy-js/light.js';

@light({
  mySyncVariable: syncStatus$
})
class MyClass extends React.Component {
  render() {
    return <div>{JSON.stringify(this.props.mySyncVariable)}</div>;
  }
}
```

The UI will automatically update when the syncing state changes.
