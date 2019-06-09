# @susy-js/electron

Control the Susy Sophon client from electron.

[![Build Status](https://travis-ci.org/susytech/js-libs.svg?branch=master)](https://travis-ci.org/susytech/js-libs)
[![npm (scoped)](https://img.shields.io/npm/v/@susy-js/electron.svg)](https://www.npmjs.com/package/@susy-js/electron)
[![npm](https://img.shields.io/npm/dw/@susy-js/electron.svg)](https://www.npmjs.com/package/@susy-js/electron)
[![dependencies Status](https://david-dm.org/susytech/js-libs/status.svg?path=packages/electron)](https://david-dm.org/susytech/js-libs?path=packages/electron)

## Description

With this library, you will be able, from Electron, to:

- download Susy Sophon locally in Electron's user data folder.
- run/stop/check if Susy Sophon is running.
- get a secure token from Susy Sophon to access secure RPCs.

## Getting Started

```bash
yarn add @susy-js/electron
```

## Usage

```javascript
import susyElectron, { isSusyRunning } from '@susy-js/electron';

// Optional: override default options
susyElectron({
  logger: myCustomLoggerFunction // How do we want to log @susy-js/electron logs? Default is `debug`
})

isSusyRunning()
  .then(() => ...);
```
