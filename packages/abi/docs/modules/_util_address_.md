

# Functions

<a id="isaddress"></a>

## `<Const>` isAddress

▸ **isAddress**(address?: *`undefined` \| `string`*): `boolean`

*Defined in [util/address.ts:36](https://octonion.institute/susytech/js-libs/blob/9a82e16/packages/abi/src/util/address.ts#L36)*

Verify that an address is a valid Sophon address.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` address | `undefined` \| `string` |  The address to verify. |

**Returns:** `boolean`

___
<a id="ischecksumvalid"></a>

## `<Const>` isChecksumValid

▸ **isChecksumValid**(address: *`string`*): `boolean`

*Defined in [util/address.ts:13](https://octonion.institute/susytech/js-libs/blob/9a82e16/packages/abi/src/util/address.ts#L13)*

Verify that an address has a valid checksum.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| address | `string` |  The Sophon address to verify. |

**Returns:** `boolean`

___
<a id="tochecksumaddress"></a>

## `<Const>` toChecksumAddress

▸ **toChecksumAddress**(address?: *`string` \| `null`*): `string`

*Defined in [util/address.ts:58](https://octonion.institute/susytech/js-libs/blob/9a82e16/packages/abi/src/util/address.ts#L58)*

Convert an Sophon address to its checksum-valid version.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| `Optional` address | `string` \| `null` |  The address to convert. |

**Returns:** `string`

___

