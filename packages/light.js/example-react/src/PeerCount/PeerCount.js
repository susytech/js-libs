// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import React, { Component } from 'react';
import { peerCount$ } from '@susy-js/light.js';
import light from '@susy-js/light.js-react';

// NOTE: with the right Babel configuration (or TypeScript), 
// you can use use `light` as a decorator:
// @light({
//   peerCount: peerCount$
// })
class PeerCount extends Component {
  render() {
    const { peerCount } = this.props;

    return (
      <div>
        <h2>peerCount$</h2>

        <h3>Current peer count</h3>
        {+peerCount}
      </div>
    );
  }
}

PeerCount = light({
  peerCount: peerCount$
})(PeerCount);

export default PeerCount;
