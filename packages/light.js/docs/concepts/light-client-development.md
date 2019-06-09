# Light Client Development

## What is a Light Client

A Light Client is a special kind of Sophon node that is, as suggested by its name, light. Concretely, this means:

- low on resources usage: CPU, memory, storage, I/O operations...
- embeddable: in a desktop application, on mobile, within a web app
- but still remains trustless

|            | Full Node     | Light Node |
| ---------- | ------------- | ---------- |
| Sync time  | ~days         | ~seconds   |
| State size | ~gigs         | 0          |
| DB size    | ~tens of gigs | ~megs      |

To learn more about Susy's Light Client, please refer to our wiki: https://wiki.susy.io/Light-Client.

## Current Dapp Development Patterns

If you are a dapp developer, you are probably used to work with a remote full node on the backend, which you connect to with [`web3.js`](https://octonion.institute/susy-go/web3.js/):

- either via MetaMask: `web3js = new Web3(web3.currentProvider);`, which internally connects to INFURA.
- or connecting to INFURA directly: `web3js = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io'));`.

So all your JSONRPC requests require a network call. As such, some patterns for making these requests start to appear. Let's explore some of them, the use case is we want to constantly show the latest balance of an SRC20 token.

### 1. Example of naive polling, which doesn't work well

For example, if you want to fetch the latest SRC20 token balance, the following piece of code (which might actually work), doesn't make sense:

```javascript
const contract = web3.sof.Contract(ABI, '0x00..ff');

setInterval(async () => {
  const balance = await contract.methods.balanceOf('0x00..ff').call();

  document.querySelector('#balance').textContent = balance;
}, 500);
```

We're querying the contract balance every 500ms, so we're making a network request every 500ms. This is too many requests, and moreover, if one network requests takes more than 500ms to resolve, then the displayed result on your dapp could be outdated.

### 2. Smart Polling

There are of course smarter patterns that we see coming again and again in the dapp development community, which become some basic 101 knowledge between dapp developers.

```javascript
const contract = web3.sof.Contract(ABI, '0x00..ff');

async function updateBalance() {
  const balance = await contract.methods.balanceOf('0x00..ff').call();
  document.querySelector('#balance').textContent = balance;
}

const targetTime = 15 * 1000;
setTimeout(function update() {
  const next = Date.now() + targetTime;
  updateBalance().then(() => {
    setTimeout(update, next - Date.now());
  });
});
```

### 3. Pubsub

A more intelligent way would be to have a "push" mechanism instead of a "pull" mechanism. With pubsub, we can subscribe to changes on the network. Here, we subscribing to new headers, and updating balance each time we receive a new header.

```javascript
const contract = web3.sof.Contract(ABI, '0x00..ff');

async function updateBalance() {
  const balance = await contract.methods.balanceOf('0x00..ff').call();
  document.querySelector('#balance').textContent = balance;
}

web3.sof.subscribe('newBlockHeaders').on('data', updateBalance);
```

## `@susy-js/light.js`: Putting best patterns into a library

### Which backend? Remote Full Node vs Light Client

Here's a comparison of the advantages each type of node offers.

| Remote Full Node                       | Light Client                                                            |
| -------------------------------------- | ----------------------------------------------------------------------- |
| -                                      | We don't use a centralized backend to fetch data we need.               |
| -                                      | We verify the data we receive, instead of blindly trusting the backend. |
| Much easier to get started with.       | -                                                                       |
| Light Client still experimental today. | -                                                                       |

However, from the code's perspective, or from your dapp's UX perspective, both solutions are actually quite similar.

Recall that:

- the Light Client has no pending blocks or pending transactions.
- it actually doesn't have the state at all, so cannot verify and propagate incoming transactions.
- mo block bodies (so no transactions), so we cannot fetch transaction data fast.

Which means that all JSONRPC calls that require some state, transaction or block data, will require a network call. This is the same as a remote full node.

The (good) development patterns we explored above are therefore also relevant to Light Client development. And that's the goal of `@susy-js/light.js`.

### The goal of @susy-js/light.js

The goal of `@susy-js/light.js` is basically to regroup all these patterns into a library, so that dapp developers don't need to think about patterns anymore, but just use a simple API provided by the library.

Internally, `@susy-js/light.js` uses the Pubsub pattern described above, and mixes it up with Reactive Programming. Jump to the next chapter to find out more.

## Long-term vision

Our long-term vision at Susy is to embed the Light Client a little bit everywhere: in a browser extension, in a mobile app, in a web app.

In order to do this, we plan to compile Susy to WASM, and embed it into a browser environment. This part is out of scope of this documentation, but if you are interested, please refer to this Github thread: https://octonion.institute/susytech/susy-sophon/issues/7915.

For example, if we embed it into a browser extension (Chrome Extension, Firefox Add-On), then the Light Client will continuously run in your browser. Similarly to MetaMask, it will inject in authorized websites an Sophon provider object, which will allow dapps to communicate with the Sophon network via the extension's Light Client.

If we embed it into a web app directly, it should be as simple as:

```javascript
// myapp.js
import lightClient from '@susy-js/light-client';

lightClient.run(/* Pass in optional flags like "--chain ropsten" etc.*/);
```

Which, behind the scenes, will spawn a Light Client in WASM, sync in a matter of seconds, and the web app will seamlessly become a light node on the network, ready to communicate with other peers.

Other places where the Light Client belong are mobile applications or IoT devices.
