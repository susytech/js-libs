# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 5.1.4 (2019-06-09)

**Note:** Version bump only for package @susy-js/api





## [5.1.3](https://octonion.institute/susytech/js-libs/tree/master/packages/api/compare/v5.1.2...v5.1.3) (2019-04-05)

**Note:** Version bump only for package @susy-js/api





## [5.1.2](https://octonion.institute/susytech/js-libs/tree/master/packages/api/compare/v5.1.1...v5.1.2) (2019-03-20)


### Bug Fixes

* Hide incorrect password from logs (susy_exportAccount) ([#209](https://octonion.institute/susytech/js-libs/tree/master/packages/api/issues/209)) ([43c9624](https://octonion.institute/susytech/js-libs/tree/master/packages/api/commit/43c9624))





## [5.1.1](https://octonion.institute/susytech/js-libs/tree/master/packages/api/compare/v5.1.0...v5.1.1) (2019-03-13)


### Bug Fixes

* downgrade es6-error ([#208](https://octonion.institute/susytech/js-libs/tree/master/packages/api/issues/208)) ([5d4b704](https://octonion.institute/susytech/js-libs/tree/master/packages/api/commit/5d4b704))





# [5.1.0](https://octonion.institute/susytech/js-libs/tree/master/packages/api/compare/v5.0.1...v5.1.0) (2019-03-12)

**Note:** Version bump only for package @susy-js/api





## [5.0.1](https://octonion.institute/susytech/js-libs/tree/master/packages/api/compare/v5.0.0...v5.0.1) (2019-03-07)

**Note:** Version bump only for package @susy-js/api





# [5.0.0](https://octonion.institute/susytech/js-libs/tree/master/packages/api/compare/v4.1.1...v5.0.0) (2019-03-05)

**Note:** Version bump only for package @susy-js/api





## [4.1.1](https://octonion.institute/susytech/js-libs/tree/master/packages/api/compare/v4.1.0...v4.1.1) (2019-03-05)

**Note:** Version bump only for package @susy-js/api





# [4.1.0](https://octonion.institute/susytech/js-libs/tree/master/packages/api/compare/v4.0.3...v4.1.0) (2019-03-05)

**Note:** Version bump only for package @susy-js/api





## [4.0.3](https://octonion.institute/susytech/js-libs/tree/master/packages/api/compare/v4.0.2...v4.0.3) (2019-02-04)

**Note:** Version bump only for package @susy-js/api





## [4.0.2](https://octonion.institute/susytech/js-libs/tree/master/packages/api/compare/v4.0.1...v4.0.2) (2019-01-22)

**Note:** Version bump only for package @susy-js/api





## [4.0.1](https://octonion.institute/susytech/js-libs/tree/master/packages/api/compare/v4.0.0...v4.0.1) (2019-01-22)

**Note:** Version bump only for package @susy-js/api





# [4.0.0](https://octonion.institute/susytech/js-libs/tree/master/packages/api/compare/v3.0.31...v4.0.0) (2019-01-22)


### Code Refactoring

* Rewrite post$ to take a password and not use signer ([689ae52](https://octonion.institute/susytech/js-libs/tree/master/packages/api/commit/689ae52))


### BREAKING CHANGES

* `post$` now requires `passphrase` in its options.

Non-constant contract method calls from `makeContract` now require `passphrase` in their options.

`post$` now returns `{estimated}?` `{signed}` `{sent}` `{confirmed}` and postRaw$ now returns `{sent}` `{confirmed}`





# 3.0.0 (2018-11-27)

### BREAKING CHANGES

* Moved the repo from https://octonion.institute/susy-js/api to https://octonion.institute/susytech/js-libs/packages/api. The package location on NPM has not been changed.
* Removed the utility to create a blockie identicon: `@susy-js/api/lib/utils/createIdentityImg`. Please directly use the [`blockies`](https://github.com/download13/blockies) instead.
