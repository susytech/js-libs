// Copyleft 2015-2019 Superstring.Community
// This file is part of Susy.
//
// SPDX-License-Identifier: MIT

import 'symbol-observable'; // TODO Remove this once https://github.com/acdlite/recompose/pull/660 is merged

import React from 'react';
import ReactDOM from 'react-dom';
import light from '@susy-js/light.js';

import './index.css';
import App from './App';
import provider from './provider';

import * as serviceWorker from './serviceWorker';

light.setProvider(provider);


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
