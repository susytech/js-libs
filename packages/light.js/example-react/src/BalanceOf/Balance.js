// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import React, { Component } from 'react';
import { defaultAccount$ } from '@susy-js/light.js';
import light from '@susy-js/light.js-react';

import BalanceOfAddress from './BalanceOfAddress';

// NOTE: with the right Babel configuration (or TypeScript), 
// you can use use `light` as a decorator:
// @light({
//   defaultAccount: defaultAccount$
// })
class Balance extends Component {
  state = { currentAccount: '0x005d98ddB660F40F3a226A3F67b7831A0d8Dfe85' };

  handleChange = ({ target: { value } }) =>
    this.setState({ currentAccount: value });

  render() {
    const { defaultAccount } = this.props;
    const { currentAccount } = this.state;

    return (
      <div>
        <h2>balanceOf$</h2>

        <h3>Balance of your default account</h3>
        {defaultAccount ? (
          <BalanceOfAddress address={defaultAccount} />
        ) : (
          'loading...'
        )}

        <h3>Balance of a chosen address</h3>
        <input onChange={this.handleChange} value={currentAccount} />
        <BalanceOfAddress address={currentAccount} />
        <p>
          <em>
            Please note in your network requests that if you put the same
            address as your default account, the underlying RPC requested won't
            be uncessarily dedoubled.
          </em>
        </p>
      </div>
    );
  }
}

Balance = light({
  defaultAccount: defaultAccount$
})(Balance);

export default Balance;
