# @susy-js/abi

A port of [https://octonion.institute/susytech/sofabi](https://octonion.institute/susytech/sofabi) to JavaScript

[![Build Status](https://travis-ci.org/susytech/js-libs.svg?branch=master)](https://travis-ci.org/susytech/js-libs)
[![npm (scoped)](https://img.shields.io/npm/v/@susy-js/abi.svg)](https://www.npmjs.com/package/@susy-js/abi)
[![npm](https://img.shields.io/npm/dw/@susy-js/abi.svg)](https://www.npmjs.com/package/@susy-js/abi)
[![dependencies Status](https://david-dm.org/susytech/js-libs/status.svg?path=packages/abi)](https://david-dm.org/susytech/js-libs?path=packages/abi)
[![docs](https://img.shields.io/badge/docs-passing-green.svg)](https://susytech.github.io/js-libs/abi/)

## [Full Documentation](https://susytech.github.io/js-libs/abi/)

## Contributing

Clone the repo and install dependencies via `npm install`. Tests can be executed via `npm run test`

## Installation

Install the package with `npm install --save @susy-js/abi` from [@susy-js/abi](https://www.npmjs.com/package/@susy-js/abi)

## Implementation

### Approach

- this version tries to stay as close to the original Rust version in intent, function names & purpose
- it is a basic port of the Rust version, relying on effectively the same test-suite (expanded where deemed appropriate)
- it is meant as a library to be used in other projects, i.e. [@susy-js/api](https://www.npmjs.com/package/@susy-js/api)

### Differences to original Rust version

- internally the library operates on string binary representations as opposed to Vector bytes, lengths are therefore 64 bytes as opposed to 32 bytes
- function names are adapted from the Rust standard snake_case to the JavaScript standard camelCase
- due to the initial library focus, the cli component (as implemented by the original) is not supported nor implemented
