# @susy-js/electron

Control the Susy Sophon client from electron.

[![Build Status](https://travis-ci.org/susytech/js-libs.svg?branch=master)](https://travis-ci.org/susytech/js-libs) [![npm (scoped)](https://img.shields.io/npm/v/@susy-js/electron.svg)](https://www.npmjs.com/package/@susy-js/electron) [![npm](https://img.shields.io/npm/dw/@susy-js/electron.svg)](https://www.npmjs.com/package/@susy-js/electron) [![dependencies Status](https://david-dm.org/susytech/js-libs/status.svg?path=packages/electron)](https://david-dm.org/susytech/js-libs?path=packages/electron)

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

## Index

### Interfaces

- [CheckClockSyncResult](docs/interfaces/checkclocksyncresult.md)
- [FetchSusyOptions](docs/interfaces/fetchsusyoptions.md)
- [IsSusyRunningOptions](docs/interfaces/issusyrunningoptions.md)
- [SusyElectronOptions](docs/interfaces/susyelectronoptions.md)
- [RunSusyOptions](docs/interfaces/runsusyoptions.md)

### Functions

- [checkClockSync](#checkclocksync)
- [defaultSusyPath](#defaultsusypath)
- [deleteSusy](#deletesusy)
- [fetchSusy](#fetchsusy)
- [getSusyPath](#getsusypath)
- [isSusyRunning](#issusyrunning)
- [killSusy](#killsusy)
- [susyElectron](#susyelectron)
- [runSusy](#runsusy)
- [signerNewToken](#signernewtoken)

---

## Functions

<a id="checkclocksync"></a>

### checkClockSync

▸ **checkClockSync**(): `Promise`<[CheckClockSyncResult](docs/interfaces/checkclocksyncresult.md)>

_Defined in [checkClockSync.ts:21](https://octonion.institute/susytech/js-libs/blob/6933cc7/packages/electron/src/checkClockSync.ts#L21)_

Use SNTP to check if the local clock is synchronized; return the time drift.

**Returns:** `Promise`<[CheckClockSyncResult](docs/interfaces/checkclocksyncresult.md)>

---

<a id="defaultsusypath"></a>

### defaultSusyPath

▸ **defaultSusyPath**(): `Promise`<`string`>

_Defined in [getSusyPath.ts:23](https://octonion.institute/susytech/js-libs/blob/6933cc7/packages/electron/src/getSusyPath.ts#L23)_

The default path to install susy, in case there's no other instance found on the machine.

**Returns:** `Promise`<`string`>

---

<a id="deletesusy"></a>

### deleteSusy

▸ **deleteSusy**(): `Promise`<`void`>

_Defined in [fetchSusy.ts:84](https://octonion.institute/susytech/js-libs/blob/6933cc7/packages/electron/src/fetchSusy.ts#L84)_

Remove susy binary or partial binary in the userData folder, if it exists.

**Returns:** `Promise`<`void`>

---

<a id="fetchsusy"></a>

### fetchSusy

▸ **fetchSusy**(mainWindow: _`BrowserWindow`_, options?: _[FetchSusyOptions](docs/interfaces/fetchsusyoptions.md)_): `Promise`<`string`>

_Defined in [fetchSusy.ts:106](https://octonion.institute/susytech/js-libs/blob/6933cc7/packages/electron/src/fetchSusy.ts#L106)_

Downloads Susy, saves it to Electron's `userData` folder, and returns the path to the downloaded binary once finished.

**Parameters:**

| Param                   | Type                                                        | Default value                                                                             |
| ----------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| mainWindow              | `BrowserWindow`                                             | -                                                                                         |
| `Default value` options | [FetchSusyOptions](docs/interfaces/fetchsusyoptions.md) | {onProgress: () &#x3D;&gt; {/_ Do nothing by defaut. _/},susyChannel: &#x27;beta&#x27;} |

**Returns:** `Promise`<`string`>

---

<a id="getsusypath"></a>

### getSusyPath

▸ **getSusyPath**(): `Promise`<`string`>

_Defined in [getSusyPath.ts:104](https://octonion.institute/susytech/js-libs/blob/6933cc7/packages/electron/src/getSusyPath.ts#L104)_

Returns the path to Susy, or throws if susy is not found.

**Returns:** `Promise`<`string`>

---

<a id="issusyrunning"></a>

### isSusyRunning

▸ **isSusyRunning**(options?: _[IsSusyRunningOptions](docs/interfaces/issusyrunningoptions.md)_): `Promise`<`boolean`>

_Defined in [isSusyRunning.ts:20](https://octonion.institute/susytech/js-libs/blob/6933cc7/packages/electron/src/isSusyRunning.ts#L20)_

Detect if another instance of susy is already running or not. To achieve that, we just ping on the common hosts.

**Parameters:**

| Param                   | Type                                                                | Default value                                                 |
| ----------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------- |
| `Default value` options | [IsSusyRunningOptions](docs/interfaces/issusyrunningoptions.md) | {wsInterface: &#x27;127.0.0.1&#x27;,wsPort: &#x27;8546&#x27;} |

**Returns:** `Promise`<`boolean`>

---

<a id="killsusy"></a>

### killSusy

▸ **killSusy**(): `Promise`<`void`>

_Defined in [runSusy.ts:118](https://octonion.institute/susytech/js-libs/blob/6933cc7/packages/electron/src/runSusy.ts#L118)_

If a Susy process has been spawned with runSusy, then it kills this process. However, there's no guarantee that Susy has been cleanly killed, and the Promise resolves instantly.

**Returns:** `Promise`<`void`>

---

<a id="susyelectron"></a>

### susyElectron

▸ **susyElectron**(options?: _[SusyElectronOptions](docs/interfaces/susyelectronoptions.md)_): `void`

_Defined in [index.ts:25](https://octonion.institute/susytech/js-libs/blob/6933cc7/packages/electron/src/index.ts#L25)_

Set default options for @susy-js/electron. Can be skipped if we don't want to override default options.

**Parameters:**

| Param                   | Type                                                              | Default value     |
| ----------------------- | ----------------------------------------------------------------- | ----------------- |
| `Default value` options | [SusyElectronOptions](docs/interfaces/susyelectronoptions.md) | { logger: debug } |

**Returns:** `void`

---

<a id="runsusy"></a>

### runSusy

▸ **runSusy**(options?: _[RunSusyOptions](docs/interfaces/runsusyoptions.md)_): `Promise`<`void`>

_Defined in [runSusy.ts:44](https://octonion.institute/susytech/js-libs/blob/6933cc7/packages/electron/src/runSusy.ts#L44)_

Spawns a child process to run Susy.

**Parameters:**

| Param                   | Type                                                    | Default value                                                         |
| ----------------------- | ------------------------------------------------------- | --------------------------------------------------------------------- |
| `Default value` options | [RunSusyOptions](docs/interfaces/runsusyoptions.md) | {flags: [],onSusyError: () &#x3D;&gt; {/_ Do nothing if error. _/}} |

**Returns:** `Promise`<`void`>

---

<a id="signernewtoken"></a>

### signerNewToken

▸ **signerNewToken**(): `Promise`<`string`>

_Defined in [signerNewToken.ts:16](https://octonion.institute/susytech/js-libs/blob/6933cc7/packages/electron/src/signerNewToken.ts#L16)_

Runs susy signer new-token and resolves with a new secure token to be used in a dapp. Rejects if no token could be extracted.

**Returns:** `Promise`<`string`>

---
