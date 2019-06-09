// https://hackernoon.com/import-json-into-typescript-8d465beded79
declare module '*.json' {
  const value: any;
  export default value;
}

declare module '@susy-js/abi';
declare module '@susy-js/api/lib/util';
declare module '@susy-js/api/lib/util/format';
