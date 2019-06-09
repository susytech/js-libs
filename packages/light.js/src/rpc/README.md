# `rpc/` folder

This folder hosts all the (RPC Observables)[https://octonion.institute/susytech/js-libs/src/branch/master/packages/light.js/src/types.d.ts#L38] that are exposed by `@susy-js/light.js`.

## Folder structure

The `sof/`, `net/`, `susy/` folders contain all RPC Observables whose underlying API calls start respectively with `sof_`, `net_` and `susy_`.

The `other` folder contains RPC Observables that are complex (like `post$`) or objects containing RPC Observables (like `makeContract$`).

The `utils` folder contains utility functions used in the `rpc/` folder.
