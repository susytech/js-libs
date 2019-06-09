

# Hierarchy

**Event**

# Constructors

<a id="constructor"></a>

##  constructor

⊕ **new Event**(abi: *[AbiItem](../interfaces/_types_.abiitem.md)*): [Event](_spec_event_event_.event.md)

*Defined in [spec/event/event.ts:20](https://octonion.institute/susytech/js-libs/blob/9a82e16/packages/abi/src/spec/event/event.ts#L20)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| abi | [AbiItem](../interfaces/_types_.abiitem.md) |

**Returns:** [Event](_spec_event_event_.event.md)

___

# Accessors

<a id="anonymous"></a>

##  anonymous

**get anonymous**(): `boolean`

*Defined in [spec/event/event.ts:36](https://octonion.institute/susytech/js-libs/blob/9a82e16/packages/abi/src/spec/event/event.ts#L36)*

**Returns:** `boolean`

___
<a id="id"></a>

##  id

**get id**(): `string`

*Defined in [spec/event/event.ts:40](https://octonion.institute/susytech/js-libs/blob/9a82e16/packages/abi/src/spec/event/event.ts#L40)*

**Returns:** `string`

___
<a id="inputs"></a>

##  inputs

**get inputs**(): [EventParam](_spec_event_eventparam_.eventparam.md)[]

*Defined in [spec/event/event.ts:44](https://octonion.institute/susytech/js-libs/blob/9a82e16/packages/abi/src/spec/event/event.ts#L44)*

**Returns:** [EventParam](_spec_event_eventparam_.eventparam.md)[]

___
<a id="name"></a>

##  name

**get name**(): `undefined` \| `string`

*Defined in [spec/event/event.ts:48](https://octonion.institute/susytech/js-libs/blob/9a82e16/packages/abi/src/spec/event/event.ts#L48)*

**Returns:** `undefined` \| `string`

___
<a id="signature"></a>

##  signature

**get signature**(): `string`

*Defined in [spec/event/event.ts:52](https://octonion.institute/susytech/js-libs/blob/9a82e16/packages/abi/src/spec/event/event.ts#L52)*

**Returns:** `string`

___

# Methods

<a id="decodelog"></a>

##  decodeLog

▸ **decodeLog**(topics: *`string`[]*, data: *`string`*): [DecodedLog](_spec_event_decodedlog_.decodedlog.md)

*Defined in [spec/event/event.ts:68](https://octonion.institute/susytech/js-libs/blob/9a82e16/packages/abi/src/spec/event/event.ts#L68)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| topics | `string`[] |
| data | `string` |

**Returns:** [DecodedLog](_spec_event_decodedlog_.decodedlog.md)

___
<a id="indexedparams"></a>

##  indexedParams

▸ **indexedParams**(indexed: *`boolean`*): [EventParam](_spec_event_eventparam_.eventparam.md)[]

*Defined in [spec/event/event.ts:64](https://octonion.institute/susytech/js-libs/blob/9a82e16/packages/abi/src/spec/event/event.ts#L64)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| indexed | `boolean` |

**Returns:** [EventParam](_spec_event_eventparam_.eventparam.md)[]

___
<a id="inputparamnames"></a>

##  inputParamNames

▸ **inputParamNames**(): (`undefined` \| `string`)[]

*Defined in [spec/event/event.ts:60](https://octonion.institute/susytech/js-libs/blob/9a82e16/packages/abi/src/spec/event/event.ts#L60)*

**Returns:** (`undefined` \| `string`)[]

___
<a id="inputparamtypes"></a>

##  inputParamTypes

▸ **inputParamTypes**(): [ParamType](_spec_paramtype_paramtype_.paramtype.md)[]

*Defined in [spec/event/event.ts:56](https://octonion.institute/susytech/js-libs/blob/9a82e16/packages/abi/src/spec/event/event.ts#L56)*

**Returns:** [ParamType](_spec_paramtype_paramtype_.paramtype.md)[]

___

