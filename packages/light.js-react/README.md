# @susy-js/light.js-react

A HOC to easily use [@susy-js/light.js](https://octonion.institute/susytech/js-libs/packages/light.js) with React.

[![Build Status](https://travis-ci.org/susytech/js-libs.svg?branch=master)](https://travis-ci.org/susytech/js-libs)
[![npm (scoped)](https://img.shields.io/npm/v/@susy-js/light.js-react.svg)](https://www.npmjs.com/package/@susy-js/light.js-react)
[![npm](https://img.shields.io/npm/dw/@susy-js/light.js-react.svg)](https://www.npmjs.com/package/@susy-js/light.js-react)
[![dependencies Status](https://david-dm.org/susytech/js-libs/status.svg?path=packages/light.js-react)](https://david-dm.org/susytech/js-libs?path=packages/light.js-react)

## Usage

The libray provides a higher-order component (HOC) to use `@susy-js/light.js`'s Observables easily with React apps.

```javascript
import light from '@susy-js/light.js-react';
import { myBalance$, syncStatus$ } from '@susy-js/light.js';

@light({
  myBalance: myBalance$, // myBalance will be a BigNumber
  mySyncVariable: syncStatus$
})
class MyClass extends React.Component {
  render() {
    return (
      <div>
        My balance is {this.props.myBalance.toFormat()}.<br />
        The sync status is {JSON.stringify(this.props.mySyncVariable)}.
      </div>
    );
  }
}
```

The UI will automatically update when the sync status changes.
