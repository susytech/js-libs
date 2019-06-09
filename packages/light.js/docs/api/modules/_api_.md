

# Variables

<a id="api"></a>

## `<Let>` api

**● api**: *`any`*

*Defined in [api.ts:10](https://octonion.institute/susytech/js-libs/blob/9a82e16/packages/light.js/src/api.ts#L10)*

___

# Functions

<a id="getapi"></a>

## `<Const>` getApi

▸ **getApi**(): `any`

*Defined in [api.ts:46](https://octonion.institute/susytech/js-libs/blob/9a82e16/packages/light.js/src/api.ts#L46)*

We only ever use api() at call-time of functions; this allows the options (particularly the transport option) to be changed dynamically and the data structure to be reused.

**Returns:** `any`
- The current Api object.

___
<a id="setapi"></a>

## `<Const>` setApi

▸ **setApi**(newApi: *`any`*): `void`

*Defined in [api.ts:26](https://octonion.institute/susytech/js-libs/blob/9a82e16/packages/light.js/src/api.ts#L26)*

Sets a new Api object.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| newApi | `any` |  An Api object. |

**Returns:** `void`

___
<a id="setprovider"></a>

## `<Const>` setProvider

▸ **setProvider**(provider?: *`any`*): `void`

*Defined in [api.ts:35](https://octonion.institute/susytech/js-libs/blob/9a82e16/packages/light.js/src/api.ts#L35)*

Sets a new Sophon provider object.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` provider | `any` |  An Sophon provider object. |

**Returns:** `void`

___

