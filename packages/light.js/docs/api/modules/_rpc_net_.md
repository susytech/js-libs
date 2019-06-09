

# Functions

<a id="pesrcount_"></a>

##  peerCount$

▸ **peerCount$**(options?: *[RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md)*): `Observable`<`BigNumber`>

*Defined in [rpc/net.ts:21](https://octonion.institute/susytech/js-libs/blob/9a82e16/packages/light.js/src/rpc/net.ts#L21)*

Get the amount of peers.

Calls `net_peerCount`

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` options | [RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md) |  Options to pass to [RpcObservableOptions](../interfaces/_types_.rpcobservableoptions.md). |

**Returns:** `Observable`<`BigNumber`>
- An Observable containing the number.

___

