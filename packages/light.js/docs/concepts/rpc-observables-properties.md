# RpcObservables Properties

`RpcObservables` are built with the idea that we should make the _minimum_ amount of JSONRPC calls to achieve what we want in our dapp.

## Observables are cold

The underlying JSONRPC method is only called if there's at least one subscriber.

```javascript
import { balanceOf$ } from '@susy-js/light.js';

const myObs$ = balanceOf$('0x123');
// Observable created, but `sof_getBalance` not called yet
const subscription = myObs$.subscribe(console.log);
// `sof_getBalance` called for the 1st time

// Some other code...

subscription.unsubscribe();
// `sof_getBalance` stops being called
```

## Observables are PublishReplay(1)

Let's take `blockNumber$()` which fires blocks 7, 8 and 9, and has 3 subscribers that don't subscribe at the same time.

We have the following marble diagram (`^` denotes when the subscriber subscribes).

```
blockNumber$(): -----7----------8------9-----|
subscriber1:    -^---7----------8------9-----|
subscriber2:    ------------^7--8------9-----|
subscriber3:    --------------------------^9-|
```

Note: the default behavior for Observables is without PublishReplay, i.e.

```
blockNumber$(): -----7----------8------9-----|
subscriber1:    -^---7----------8------9-----|
subscriber2:    ------------^---8------9-----|
subscriber3:    --------------------------^--|
```

But Observables in this library are PublishReplay(1). [Read more](https://blog.angularindepth.com/rxjs-how-to-use-refcount-73a0c6619a4e) about PublishReplay.

### Underlying API calls are not unnecessarily repeated

```javascript
const obs1$ = balanceOf$('0x123');
const obs2$ = balanceOf$('0x123');

obs1$.subscribe(console.log);
obs1$.subscribe(console.log);
obs2$.subscribe(console.log);
// Logs 3 times the balance
// But only one call to `sof_getBalance` has been made

const obs3$ = balanceOf$('0x456');
// Logs a new balance, another call to `sof_getBalance` is made
```

## Underlying PubSub subscriptions are dropped after 2 seconds with no subscribers

```javascript
import { blockNumber$ } from '@susy-js/light.js';

const myObs$ = blockNumber$();
console.log(blockNumber$.frequency); // [onEveryBlock$]
// Note: onEveryBlock$ creates a pubsub on `sof_blockNumber`

const subscription = myObs$.subscribe(console.log);
// Creates a pubsub subscription

// Some other code...

subscription.unsubscribe();
// Pubsub subscription is dropped if the observable remains without subscribers for two seconds
```
