// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import React, { Component } from 'react';
import { map } from 'rxjs/operators';
import { balanceOf$ } from '@susy-js/light.js';
import light from '@susy-js/light.js-react';

// NOTE: with the right Babel configuration (or TypeScript), 
// you can use use `light` as a decorator:
// @light({
//   balance: ownProps =>
//     balanceOf$(ownProps.address).pipe(
//       map(_ => +_)
//     )
// })
class BalanceOfAddress extends Component {
  render() {
    const { address, balance } = this.props;
    return (
      <p>
        Balance of <code>{address}</code>: {balance} wei.
      </p>
    );
  }
}

BalanceOfAddress = light({
  balance: ownProps =>
    balanceOf$(ownProps.address).pipe(
      map(_ => +_)
    )
})(BalanceOfAddress);

export default BalanceOfAddress;
