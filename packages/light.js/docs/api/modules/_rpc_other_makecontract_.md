

# Index

### Interfaces

* [MakeContract](../interfaces/_rpc_other_makecontract_.makecontract.md)

### Functions

* [makeContract](_rpc_other_makecontract_.md#makecontract-1)

---

# Functions

<a id="makecontract-1"></a>

## `<Const>` makeContract

▸ **makeContract**(address: *[Address](_types_.md#address)*, abiJson: *`any`[]*, options?: *`object`*): [MakeContract](../interfaces/_rpc_other_makecontract_.makecontract.md)

*Defined in [rpc/other/makeContract.ts:121](https://octonion.institute/susytech/js-libs/blob/9a82e16/packages/light.js/src/rpc/other/makeContract.ts#L121)*

Create a contract.

**Parameters:**

**address: [Address](_types_.md#address)**

The contract address.

**abiJson: `any`[]**

The contract abi.

**`Default value` options: `object`**

The options to pass in when creating the contract.

| Name | Type |
| ------ | ------ |
| `Optional` provider | `any` |

**Returns:** [MakeContract](../interfaces/_rpc_other_makecontract_.makecontract.md)
- An object whose keys are all the functions of the
contract, and each function return an Observable which will fire when the
function resolves.

___

