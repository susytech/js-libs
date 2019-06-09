# Tutorial Part 6: Integrate with React

`@susy-js/light.js` easily integrates with React with the `@susy-js/light.js-react` extension. `@susy-js/light.js-react` expose one HOC, which you can attach to any of your React components.

This HOC will handle the subscription to RpcObservables under the hood, and will simply expose the values of these RpcObservables inside props. Concretely:

```javascript
import * as React from 'react';
import { balanceOf$ } from '@susy-js/light.js';
import light from '@susy-js/light.js-react';
import PropTypes from 'prop-types';

@light({
  myBalance: ({ myAddress }) => balanceOf(myAddress) // myAddress here is a prop passed directly to MyComponent
})
class MyComponent extends React.Component {
  static propTypes = {
    myAddress: PropTypes.string.required,
    myBalance: PropTypes.object.required // myBalance will be a BigNumber
  };

  render() {
    return (
      <div>
        The balance of {this.props.myAddress} is{' '}
        {this.props.myBalance.toFormat(2)}.
      </div>
    );
  }
}

export default MyComponent;

// Call MyComponent like this:
<MyComponent address="0x407d73d8a49eeb85d32cf465507dd71d507100c1">
```

Or, if you don't use the "`@`" decorator syntax,

```javascript
export default light({
  myBalance: ({ myAddress }) => balanceOf(myAddress)
})(MyComponent);
```

You can of course let your component subscribe to multiple RpcObservables:

```javascript
import React from 'react';
import {
  blockNumber$,
  makeContract,
} from '@susy-js/light.js';
import src20Abi from '@susy-js/contracts/lib/abi/sip20';
import { filter } from 'rxjs/operators';
import light from '@susy-js/light.js-react';

const MyComponent = ({ blockNumber, myAddress, myGavcoinBalance }) => {
  return (
    <div>
      <p>
        The gavcoin balance of {myAddress} is{' '}
        {myGavcoinBalance.div(10 ** 6).toFormat(2)}
        GAV.
      </p>
      <p>We are at block {blockNumber.toFormat(0)}.</p>
    </div>
  );
};

export default light({
  blockNumber: blockNumber$,
  myGavcoinBalance: ({ myAddress }) =>
    makeContract('0x4733659a5cB7896A65c918Add6f59C5148FB5ffa', src20Abi)
      .balanceOf$(myAddress)
})(MyComponent);
```

See the latest code in action: https://codesandbox.io/s/852wn25mj.
