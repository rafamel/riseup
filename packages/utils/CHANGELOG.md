# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
