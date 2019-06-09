# Tutorial Part 5: Work with Contracts

Contract API basically comes in three pieces:

- there is inspection of the contract state through calling constant functions.
- there's state-changing transactions like transferring tokens to a counter-party.
- there's event reception and reporting that (usually) happen when such a state change occurs

As of version v1.0.4 of `@susy-js/light.js`, the library only supports the two first functionalities. Let's see how they work. But before that, let's create a contract object.

## Our first contract

Let's deal with the SRC20 contract, which is quite possible the most famous contract. We'll use the `GavCoin` contract, a test SRC20 contract deployed on Kovan at the address `0x4733659a5cB7896A65c918Add6f59C5148FB5ffa`.

The ABI of a classic SRC20 can be found in a lot of places, for example within the [`@susy-js/contracts`](https://octonion.institute/susytech/js-libs/tree/master/packages/contracts) npm module.

So let's instantiate a contract object:

```javascript
import src20Abi from '@susy-js/contracts/lib/abi/sip20';
import { makeContract } from '@susy-js/light.js';

const gavcoinContract = makeContract(
  '0x4733659a5cB7896A65c918Add6f59C5148FB5ffa',
  src20Abi
);
```

And done! `gavcoinContract` is now a javascript object, where all the keys are the functions in the contract with a `$` sign at the end:

```javascript
{
  abi: {...}, // @susy-js/abi Abi object, only needed for advanced usage
  address: '0x4733659a5cB7896A65c918Add6f59C5148FB5ffa',
  allowance$(): ...,
  approve$(): ...,
  balanceOf$(): ...,
  contractObject: {...}, // @susy-js/api Contract object, only needed for advanced usage
  totalSupply$(): ...,
  transfer$(): ...,
  transferFrom$(): ...
}
```

The functions defined in the ABI are defined in this object too. We won't go into details about the `abi` and `contractObject` fields, but have a look at [`@susy-js/abi`](https://octonion.institute/susytech/js-libs/tree/master/packages/abi) and [`@susy-js/api`](https://octonion.institute/susytech/js-libs/tree/master/packages/api) respectively if interested.

## Calling constant functions

In the SRC20 ABI, the `balanceOf` function is a constant function, which means that it doesn't modify the Sophon state. Calling such a function with return a RpcObservable that will update when the token balance of a account changes.

```javascript
gavcoinContract
  .balanceOf$('0x407d73d8a49eeb85d32cf465507dd71d507100c1')
  .subscribe(balance => console.log('balance', balance));
```

See this snippet in action: https://codesandbox.io/s/mq8rwkqzxp.

## Calling state-changing function

The usage is exactly the same as with constant functions, but the returned RpcObservable is the same as the one returned by `post$` (see [previous chapter](/guides/tutorial4-send-a-transaction.html)).

```javascript
gavcoinContract
  .transfer$(
    [
      '0x407d73d8a49eeb85d32cf465507dd71d507100c1', // The "to" address
      new BigNumber(2.01) // The amount to transfer
    ],
    // This 2nd argument is an options object containing the following fields:
    {
      from: "0x...",
      passphrase: "mypassphrase",
      gasPrice: ...
    }
  )
  .subscribe(transfer => console.log('transfer$', transfer));

// Logs:
// transfer$ { signed: '0x123...ff' }
// transfer$ { sent: '0x456...ff' }
// transfer$ { confirmed: {/* receipt object */} }
```
