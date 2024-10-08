# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.22.1](https://github.com/rafamel/riseup/compare/v0.22.0...v0.22.1) (2024-08-19)

### Bug Fixes

* **packages:** update dependencies ([1bd5a3c](https://github.com/rafamel/riseup/commit/1bd5a3c750b3b6ee8f61d08d25f10d3d5bbb4409))
* **packages:** update kpo to v0.28.0 ([f14f909](https://github.com/rafamel/riseup/commit/f14f909e761bbc607f8601d0267510ad208a9f22))

# [0.22.0](https://github.com/rafamel/riseup/compare/v0.21.0...v0.22.0) (2024-07-11)

### Bug Fixes

* **packages:** update dependencies ([7ba8841](https://github.com/rafamel/riseup/commit/7ba8841e351d0a2c1c698305e3b72c85844fc29c))
* **packages:** update dependencies ([0f96337](https://github.com/rafamel/riseup/commit/0f963370f04664290fffcc4886fe8956f55530c6))
* **packages:** update kpo version ([e9f6ad5](https://github.com/rafamel/riseup/commit/e9f6ad5ac3688141facab0efd155af4e2d315ee0))
* **packages:** update kpo version ([f53b5fb](https://github.com/rafamel/riseup/commit/f53b5fb63885c1a86d90849c9ad06ee550a0ad03))
* **packages:** update node version ([89d4e13](https://github.com/rafamel/riseup/commit/89d4e13a9767bb641ae5ce7e90e46e17f63915a8))

### Code Refactoring

* **packages:** revert utils rename to core ([e4c5aed](https://github.com/rafamel/riseup/commit/e4c5aedd887347a8248582c5b1e46cdf05294451))
* **packages:** use kpo's tmp instead of own getTmpDir ([cc3c4f9](https://github.com/rafamel/riseup/commit/cc3c4f90d696b560b9b7066980495b240afc44c9))
* renames utils package to core and tooling to universal ([7e9caac](https://github.com/rafamel/riseup/commit/7e9caacc6c88265f5739ebd82ed7bd460ddb9574))
* simplify project and remove main tooling tasks ([c62dc39](https://github.com/rafamel/riseup/commit/c62dc397800204f3dc507bfd9388dd15c696db46))

### Features

* **packages:** preset no longer has a configure field ([0f6d978](https://github.com/rafamel/riseup/commit/0f6d9782085475ac0d8bfe34e93f74527edc7d4f))
* **packages:** use npm workspaces instead of lerna ([a700ebc](https://github.com/rafamel/riseup/commit/a700ebccb822c1be02db27331686beb56968941e))

### BREAKING CHANGES

* **packages:** utils package doesn't export getTmpDir
* **packages:** riseup supports node >= 22
* **packages:** Preset class no longer has a configure field, and hence also lacks the retrieve and
intercept methods
* **packages:** no longer using lerna for monorepos
* **packages:** core package will remain as utils
* See commit description.
* See commit description.

# [0.21.0](https://github.com/rafamel/riseup/compare/v0.20.0...v0.21.0) (2022-06-01)

### Bug Fixes

* **packages:** update dependencies ([d95b5a1](https://github.com/rafamel/riseup/commit/d95b5a108b659deb5d362f43d84b05fa889b4082))

# [0.20.0](https://github.com/rafamel/riseup/compare/v0.19.0...v0.20.0) (2022-05-30)

### Bug Fixes

* **packages:** enable .cts and .mts extensions as defaults ([37dc2ba](https://github.com/rafamel/riseup/commit/37dc2baa96ce77f5f8c6679546c40bddf83e9437))

# [0.19.0](https://github.com/rafamel/riseup/compare/v0.18.0...v0.19.0) (2022-05-27)

### Bug Fixes

* bump engine to node 18 ([6056bf7](https://github.com/rafamel/riseup/commit/6056bf7513de2f0627222480ea0efaa30dd83528))
* update dependencies ([675ade5](https://github.com/rafamel/riseup/commit/675ade5cc60898765cb1fefdcc56afecb141e31f))

### BREAKING CHANGES

* engine bumped to node 18

# [0.18.0](https://github.com/rafamel/riseup/compare/v0.17.0...v0.18.0) (2022-05-24)

### Bug Fixes

* **packages:** update dependencies ([7f8d067](https://github.com/rafamel/riseup/commit/7f8d067e4842828800231cc8eff390ef6f2922f5))

# [0.17.0](https://github.com/rafamel/riseup/compare/v0.16.0...v0.17.0) (2022-04-04)

### Bug Fixes

* update dependencies ([4892adb](https://github.com/rafamel/riseup/commit/4892adb01f2ce2837bba4a40017fcc076d437620))
* update dependencies ([3d17e1b](https://github.com/rafamel/riseup/commit/3d17e1b70c6a90f4233bff55f2bb5b2f165ab44d))

# [0.16.0](https://github.com/rafamel/riseup/compare/v0.15.0...v0.16.0) (2022-03-24)

**Note:** Version bump only for package @riseup/utils

# [0.15.0](https://github.com/rafamel/riseup/compare/v0.14.0...v0.15.0) (2022-03-22)

### Bug Fixes

* **packages:** update dependencies ([6b49a4c](https://github.com/rafamel/riseup/commit/6b49a4c17d6c70b0a3974102215923f01929c8ed))

### Features

* **packages:** throw on non serializable configurations ([f7903bc](https://github.com/rafamel/riseup/commit/f7903bc87e0931e3d9d71f04b185479fd7d07a5d))

# [0.14.0](https://github.com/rafamel/riseup/compare/v0.13.1...v0.14.0) (2022-03-16)

### Features

* **packages:** project redesign and rewrite ([28e03c9](https://github.com/rafamel/riseup/commit/28e03c9ba72dcbd4388a954be282a86b4411e23f))

### BREAKING CHANGES

* **packages:** project has been almost entirely rewritten; please check latest documentation

## [0.13.1](https://github.com/rafamel/riseup/compare/v0.12.0...v0.13.1) (2021-09-28)

**Note:** Version bump only for package @riseup/utils

# [0.12.0](https://github.com/rafamel/riseup/compare/v0.11.0...v0.12.0) (2021-09-16)

**Note:** Version bump only for package @riseup/utils

# [0.11.0](https://github.com/rafamel/riseup/compare/v0.10.0...v0.11.0) (2021-09-15)

**Note:** Version bump only for package @riseup/utils

# [0.10.0](https://github.com/rafamel/riseup/compare/v0.9.2...v0.10.0) (2021-09-14)

### Bug Fixes

* **packages/utils:** fix getBin resolution for ES modules ([ce13637](https://github.com/rafamel/riseup/commit/ce13637b6d743606a9bbd2948a9d46129b334aae))
* **packages:** update dependencies ([fda9969](https://github.com/rafamel/riseup/commit/fda9969aaf64671eccaea5916f80eaa8867dc9e0))

## [0.9.1](https://github.com/rafamel/riseup/compare/v0.9.0...v0.9.1) (2021-06-28)

### Bug Fixes

* **packages:** update dependencies ([d8fabf9](https://github.com/rafamel/riseup/commit/d8fabf9d8cfb5180ecba281c3ac1194268dda2e8))
* **packages/utils:** fix intercept in Windows ([9485cb7](https://github.com/rafamel/riseup/commit/9485cb7485aa70a0ccc1daa3a73354a415c5a97b))

# [0.9.0](https://github.com/rafamel/riseup/compare/v0.8.0...v0.9.0) (2021-06-22)

**Note:** Version bump only for package @riseup/utils

# [0.8.0](https://github.com/rafamel/riseup/compare/v0.7.0...v0.8.0) (2021-06-20)

### Features

* **packages/utils:** interceptor sets up an in memory fs; defaults to the filesystem; wider compatibility ([5de75d4](https://github.com/rafamel/riseup/commit/5de75d4d327c18cc8a472d8847895148a451e31e))
* **packages/utils:** rename tmpTask to temporal; files are overriden by existing files ([f5e389b](https://github.com/rafamel/riseup/commit/f5e389b497e941c2352c715ac0eeec96c8b03876))

# [0.7.0](https://github.com/rafamel/riseup/compare/v0.6.0...v0.7.0) (2021-06-18)

### Bug Fixes

* **packages:** update dependencies ([f92c5a9](https://github.com/rafamel/riseup/commit/f92c5a98cc97f463f21001b62ff4a02c012aa563))

### Features

* **packages/utils:** intercept can take an array of file path pairs ([b680edf](https://github.com/rafamel/riseup/commit/b680edff8dc071f6138ede5fe2e1275e18c300ea))

# [0.6.0](https://github.com/rafamel/riseup/compare/v0.5.0...v0.6.0) (2021-06-13)

### Bug Fixes

* **deps:** update dependencies ([093f636](https://github.com/rafamel/riseup/commit/093f6369aa90d2f9d22e4b9f16121bf7141abd61))
* **deps:** update dependencies ([43a2692](https://github.com/rafamel/riseup/commit/43a2692fc36e278d1adc952a01c264cf02c8995c))
* **deps:** update kpo ([b8b9b66](https://github.com/rafamel/riseup/commit/b8b9b66aed7fe8e113fe8047e3528df1515853dc))
* **deps:** update kpo to v0.20.0 ([27fb782](https://github.com/rafamel/riseup/commit/27fb7827a67ba2e8c3bcc0ad9c517774faaa1cf3))
* **deps:** update type-core ([4633acf](https://github.com/rafamel/riseup/commit/4633acf1fc9eec966f1a4d402e1b9cee1a0c0bab))
* **packages:** resolve bins from origin package ([ee63ed3](https://github.com/rafamel/riseup/commit/ee63ed30eb79d915481a56844bdf0f8a1549bb3d))
* **packages:** update dependencies ([17e8b0b](https://github.com/rafamel/riseup/commit/17e8b0be83bb857e038b8298b5bd5e584c4f5bba))
* **packages:** update dependencies ([f520850](https://github.com/rafamel/riseup/commit/f520850d78b7889d3bf1b2020973430b6c914ccd))
* **packages/utils:** fix getBin for esm packages ([2eeb3ee](https://github.com/rafamel/riseup/commit/2eeb3ee439c292e823a85043bc0f86a3b9bb1549))
* **packages/utils:** getBin recovers path when pkg.bin is a string ([d7cf077](https://github.com/rafamel/riseup/commit/d7cf0776134c5096807da6a84140605dff24b875))

### Features

* **pacakges:** add context to reconfigure callbacks ([acf6383](https://github.com/rafamel/riseup/commit/acf638387cf02ac00d5d394d7da5933d48477779))
* **packages/utils:** add getBin ([8a969cc](https://github.com/rafamel/riseup/commit/8a969cc1736bfbee37364050bb6e1afd0658034b))
* **packages/utils:** add getConfiguration ([34112f0](https://github.com/rafamel/riseup/commit/34112f06533943f2c348a992a3018dcda06a8d64))
* **packages/utils:** add getLerna ([c359305](https://github.com/rafamel/riseup/commit/c359305948d6925a62601feb3f85e61f9273e410))
* **packages/utils:** add getMonorepoRoot ([89b3b08](https://github.com/rafamel/riseup/commit/89b3b084bdcd1fc5dfe22f1adb62f77eee9b23e5))
* **packages/utils:** add getPackage ([ea1d002](https://github.com/rafamel/riseup/commit/ea1d00272e460fd36a37a8799405b7f79a6fb85b))
* **packages/utils:** add getTypescript ([0de99fd](https://github.com/rafamel/riseup/commit/0de99fd076a433af284a1c088c277db5b745ca1e))
* **packages/utils:** add intercept ([d6ed762](https://github.com/rafamel/riseup/commit/d6ed7623ec1a35306c2ee11e50b48f59c7b933f9))
* **packages/utils:** add tmpFile function ([aaf7640](https://github.com/rafamel/riseup/commit/aaf76404f99eb07d9147250b9947bbbd4e5e247d))
* **packages/utils:** add tmpPath ([9b95ca6](https://github.com/rafamel/riseup/commit/9b95ca6ed05e5c40f271521362cfc4a3b457655a))
* **packages/utils:** add tmpTask ([0607b1f](https://github.com/rafamel/riseup/commit/0607b1f6011d09294fbb6d806980c75775373f17))
* **packages/utils:** export constants ([75bc2c5](https://github.com/rafamel/riseup/commit/75bc2c59df14b7924f35ef018ba7a17ae540806c))
* **packages/utils:** exports interceptor path and environment variables ([15d773b](https://github.com/rafamel/riseup/commit/15d773b849f059d3ff40e73cd2e4bd816a0a91cd))
* **packages/utils:** take file extension on tmpTask ([19f14d9](https://github.com/rafamel/riseup/commit/19f14d957fe24de22f0078bf0abf72b536fc0105))
