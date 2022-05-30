# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.20.0](https://github.com/rafamel/riseup/compare/v0.19.0...v0.20.0) (2022-05-30)


### Bug Fixes

* **packages/tooling:** enable typescript isolatedModules -required do isolated transpiles ([7206607](https://github.com/rafamel/riseup/commit/7206607af8d840c51a8ac31ee78c1d8517a9fd54))
* **packages/tooling:** fix duplicate transpiles on Register ([50265aa](https://github.com/rafamel/riseup/commit/50265aa1d53e8132387096d4d6005bb6d9d7ac96))
* **packages/tooling:** fix Transpile file loader ([56d348b](https://github.com/rafamel/riseup/commit/56d348b2e92c45816b23199ef8021fbca9dc41a2))
* **packages/tooling:** fix Transpiler ESM to ESM import chains when transpiling to commonjs ([1f9f6d2](https://github.com/rafamel/riseup/commit/1f9f6d243026a6a8cab942d8513657a5fca38d9c))
* **packages/tooling:** fix Transpiler include option and consider it on resolve ([7dff14d](https://github.com/rafamel/riseup/commit/7dff14d0b658affba9dd6de2d32e71ab96013e71))
* **packages/tooling:** inject import.meta.url and __filename/__dirname shims on Transpiler ([4aa578e](https://github.com/rafamel/riseup/commit/4aa578e5f1d1a3ea51320f0683dcac7a9b32804d))
* **packages/tooling:** prefer default resolvers on transpile Loader, Register, and jest resolver ([85cdf2c](https://github.com/rafamel/riseup/commit/85cdf2c0bb8f0dd44d68964562c28f6b45c0d475))
* **packages/tooling:** use brute force approach on Transpile for cjs shims to prevent coverage reports ([b138b2b](https://github.com/rafamel/riseup/commit/b138b2bfa65ff92dd89599efcaade697fe5e23c5))
* **packages:** enable .cts and .mts extensions as defaults ([37dc2ba](https://github.com/rafamel/riseup/commit/37dc2baa96ce77f5f8c6679546c40bddf83e9437))


### Features

* **packages/tooling:** disable linter rule unicorn/no-useless-promise-resolve-reject ([8facc4b](https://github.com/rafamel/riseup/commit/8facc4b2c5e54184385984979e583e1e674c6acc))





# [0.19.0](https://github.com/rafamel/riseup/compare/v0.18.0...v0.19.0) (2022-05-27)


### Bug Fixes

* **packages/tooling:** fix json imports on jest ([ed62249](https://github.com/rafamel/riseup/commit/ed62249eefe854f0d86ee2381db2720437c71e14))
* update dependencies ([675ade5](https://github.com/rafamel/riseup/commit/675ade5cc60898765cb1fefdcc56afecb141e31f))


### Features

* **package/tooling:** disable eslint rule unicorn/consistent-function-scoping for arrow function ([5c9c30f](https://github.com/rafamel/riseup/commit/5c9c30f34d67c5cf1c8e97d1006f1e7e9f5dcf63))
* **package/tooling:** improve default eslint rules ([1741a67](https://github.com/rafamel/riseup/commit/1741a677d4a8ac93cc5ca4da947b39377194068f))
* **packages/tooling:** add package entrypoint for transpile loader ([eaf22b5](https://github.com/rafamel/riseup/commit/eaf22b5126543337a4f65d0e65f5a0eabc9c649d))





# [0.18.0](https://github.com/rafamel/riseup/compare/v0.17.0...v0.18.0) (2022-05-24)


### Bug Fixes

* **packages/tooling:** fix package tarballs requiring node_modules dependencies ([efb703f](https://github.com/rafamel/riseup/commit/efb703f927ba7e8a7540e799a5941ee024266c7f))
* **packages:** update dependencies ([7f8d067](https://github.com/rafamel/riseup/commit/7f8d067e4842828800231cc8eff390ef6f2922f5))


### Code Refactoring

* **packages:** move tarball task from library to tooling package ([1dbe8ce](https://github.com/rafamel/riseup/commit/1dbe8ce021b9b2b64c8c66ddfe915a4b87ccbc89))


### Features

* **packages/rooling:** allow package tarballs to have a modified package.json w/ a callback function ([3e6b26a](https://github.com/rafamel/riseup/commit/3e6b26ae2ff8416ce2c69194c42222cafaff0539))
* **packages/tooling:** soften several unicorn rules configuration ([4b3e082](https://github.com/rafamel/riseup/commit/4b3e0828bf7a2a4583058c7f882e4101b2c074f0))


### BREAKING CHANGES

* **packages:** the library package no longer provides the tarball task; it is now included in the
tooling package





# [0.17.0](https://github.com/rafamel/riseup/compare/v0.16.0...v0.17.0) (2022-04-04)


### Bug Fixes

* update dependencies ([4892adb](https://github.com/rafamel/riseup/commit/4892adb01f2ce2837bba4a40017fcc076d437620))
* update dependencies ([3d17e1b](https://github.com/rafamel/riseup/commit/3d17e1b70c6a90f4233bff55f2bb5b2f165ab44d))





# [0.16.0](https://github.com/rafamel/riseup/compare/v0.15.0...v0.16.0) (2022-03-24)


### Bug Fixes

* **packages/tooling:** fix build include/exclude patterns ([bf3d7a1](https://github.com/rafamel/riseup/commit/bf3d7a137e1ac0bff0b764f6adf26d5510e56ed9))


### Features

* **packages/tooling, templates/library:** enable code splitting by default on build ([e330369](https://github.com/rafamel/riseup/commit/e33036973386a1dd1c8f6da40766746ebacd87ab))
* **packages/tooling:** disable no static only class linter rule on default configuration ([1047d3f](https://github.com/rafamel/riseup/commit/1047d3f9014d9f66e2e81974552c748e237ba8c5))





# [0.15.0](https://github.com/rafamel/riseup/compare/v0.14.0...v0.15.0) (2022-03-22)


### Bug Fixes

* **packages/tooling:** fix lint task for typescript incremental configuration ([4e0a7e1](https://github.com/rafamel/riseup/commit/4e0a7e151e6f627858cf1c612af71568706b633e))
* **packages:** update dependencies ([6b49a4c](https://github.com/rafamel/riseup/commit/6b49a4c17d6c70b0a3974102215923f01929c8ed))


### Features

* **packages/tooling:** build, node, and test tasks take include/exclude string arrays ([6337e90](https://github.com/rafamel/riseup/commit/6337e9010fec4abbe1ddcbbb65aa49d52ecbf36f))
* **packages/tooling:** disable too restrictive linter rules ([da4c592](https://github.com/rafamel/riseup/commit/da4c5920a44e1dafac269f447dd0611631d7e7b7))
* **packages:** throw on non serializable configurations ([f7903bc](https://github.com/rafamel/riseup/commit/f7903bc87e0931e3d9d71f04b185479fd7d07a5d))


### BREAKING CHANGES

* **packages/tooling:** build, node, and test tasks no longer take params.exclude as a RegExp/boolean.
Please see latest documentation.





# [0.14.0](https://github.com/rafamel/riseup/compare/v0.13.1...v0.14.0) (2022-03-16)


### Features

* **packages:** project redesign and rewrite ([28e03c9](https://github.com/rafamel/riseup/commit/28e03c9ba72dcbd4388a954be282a86b4411e23f))


### BREAKING CHANGES

* **packages:** project has been almost entirely rewritten; please check latest documentation





## [0.13.1](https://github.com/rafamel/riseup/compare/v0.12.0...v0.13.1) (2021-09-28)


### Features

* **packages/tooling:** set allowDeclareFields as true for @babel/preset-typescript ([dff7d49](https://github.com/rafamel/riseup/commit/dff7d4945352a16f7f67ad44e1741b4359b26134))





# [0.12.0](https://github.com/rafamel/riseup/compare/v0.11.0...v0.12.0) (2021-09-16)

**Note:** Version bump only for package @riseup/tooling





# [0.11.0](https://github.com/rafamel/riseup/compare/v0.10.0...v0.11.0) (2021-09-15)

**Note:** Version bump only for package @riseup/tooling





# [0.10.0](https://github.com/rafamel/riseup/compare/v0.9.2...v0.10.0) (2021-09-14)


### Bug Fixes

* **packages:** update dependencies ([fda9969](https://github.com/rafamel/riseup/commit/fda9969aaf64671eccaea5916f80eaa8867dc9e0))


### Features

* **packages/tooling:** independent prettierignore resolution; parse formatting only with prettier ([1a32f85](https://github.com/rafamel/riseup/commit/1a32f851c5601bc90a9f5c549c275131b56c8123))





## [0.9.2](https://github.com/rafamel/riseup/compare/v0.9.1...v0.9.2) (2021-06-30)


### Bug Fixes

* **packages/tooling:** disable no-dupe-class-members eslint rule for typescript ([b12a622](https://github.com/rafamel/riseup/commit/b12a622dad4fefaa7ff0b6562a639f2e7a90131b))





## [0.9.1](https://github.com/rafamel/riseup/compare/v0.9.0...v0.9.1) (2021-06-28)


### Bug Fixes

* **packages:** update dependencies ([d8fabf9](https://github.com/rafamel/riseup/commit/d8fabf9d8cfb5180ecba281c3ac1194268dda2e8))





# [0.9.0](https://github.com/rafamel/riseup/compare/v0.8.0...v0.9.0) (2021-06-22)

**Note:** Version bump only for package @riseup/tooling





# [0.8.0](https://github.com/rafamel/riseup/compare/v0.7.0...v0.8.0) (2021-06-20)


### Features

* **packages/utils:** interceptor sets up an in memory fs; defaults to the filesystem; wider compatibility ([5de75d4](https://github.com/rafamel/riseup/commit/5de75d4d327c18cc8a472d8847895148a451e31e))
* **packages/utils:** rename tmpTask to temporal; files are overriden by existing files ([f5e389b](https://github.com/rafamel/riseup/commit/f5e389b497e941c2352c715ac0eeec96c8b03876))





# [0.7.0](https://github.com/rafamel/riseup/compare/v0.6.0...v0.7.0) (2021-06-18)


### Bug Fixes

* **packages:** fix next tests for images add more descriptive names for babel stubs ([397c1b0](https://github.com/rafamel/riseup/commit/397c1b09b4c29f2d2d4be05ec8063931f4657980))
* **packages:** update dependencies ([f92c5a9](https://github.com/rafamel/riseup/commit/f92c5a98cc97f463f21001b62ff4a02c012aa563))
* **packages/tooling:** add noEmit to default tsconfig ([bf9c736](https://github.com/rafamel/riseup/commit/bf9c73675f2d218133716091ddc28d9688e6fa58))
* **packages/tooling:** fix coverage directories on jest configuration ([429625a](https://github.com/rafamel/riseup/commit/429625a7cdf2a98ad077e7f520eaa8590ca7035d))


### Features

* **packages:** replace react pacakge by next package ([eb8052b](https://github.com/rafamel/riseup/commit/eb8052b6baee6207cdc192728348b2bebc4cac03))
* **packages/next:** upgrades next to v11 ([bf7345a](https://github.com/rafamel/riseup/commit/bf7345a9fb2046443bbda124cefb559478229c94))
* **packages/tooling:** disable node/no-callback-literal eslint rule ([8806386](https://github.com/rafamel/riseup/commit/88063862a27ec3779a3005d6471780a4ab491ae2))
* **packages/tooling:** support react for eslint/lint ([0ca8c02](https://github.com/rafamel/riseup/commit/0ca8c0225bbedde9797b8ef7e1b6c5892e1d81fb))





# [0.6.0](https://github.com/rafamel/riseup/compare/v0.5.0...v0.6.0) (2021-06-13)


### Bug Fixes

* **deps:** update dependencies ([093f636](https://github.com/rafamel/riseup/commit/093f6369aa90d2f9d22e4b9f16121bf7141abd61))
* **deps:** update dependencies ([43a2692](https://github.com/rafamel/riseup/commit/43a2692fc36e278d1adc952a01c264cf02c8995c))
* **deps:** update kpo ([b8b9b66](https://github.com/rafamel/riseup/commit/b8b9b66aed7fe8e113fe8047e3528df1515853dc))
* **deps:** update kpo to v0.20.0 ([27fb782](https://github.com/rafamel/riseup/commit/27fb7827a67ba2e8c3bcc0ad9c517774faaa1cf3))
* **deps:** update type-core ([4633acf](https://github.com/rafamel/riseup/commit/4633acf1fc9eec966f1a4d402e1b9cee1a0c0bab))
* **packages:** does not use babel transform mappers for actual builds ([e373ec1](https://github.com/rafamel/riseup/commit/e373ec1a14cb4cd2d5c8d9795772f9c718fbfc01))
* **packages:** make react and tooling packages public ([9f26e2f](https://github.com/rafamel/riseup/commit/9f26e2f8e5f978444420531dba53b1810a8531f6))
* **packages:** resolve bins from origin package ([ee63ed3](https://github.com/rafamel/riseup/commit/ee63ed30eb79d915481a56844bdf0f8a1549bb3d))
* **packages:** update dependencies ([17e8b0b](https://github.com/rafamel/riseup/commit/17e8b0be83bb857e038b8298b5bd5e584c4f5bba))
* **packages:** update dependencies ([f520850](https://github.com/rafamel/riseup/commit/f520850d78b7889d3bf1b2020973430b6c914ccd))
* **packages/tooling:** add missing dependency find-up ([6bf0af5](https://github.com/rafamel/riseup/commit/6bf0af5054805486ea81ab965dc412d42f2e5705))
* **packages/tooling:** add missing eslint plugin dependencies ([af465f2](https://github.com/rafamel/riseup/commit/af465f213ef74efa8dd1a74f555329ad95fcdcd2))
* **packages/tooling:** fix configureBabel and configureJest for windows systems ([df1dec0](https://github.com/rafamel/riseup/commit/df1dec0736af8d88a907af854cd2e51bd08b08fa))
* **packages/tooling:** fix eslint and typescript configurations ([7cd5773](https://github.com/rafamel/riseup/commit/7cd577394f97dc8b6ed1dc18530ed42da9da27c5))
* **packages/tooling:** fixes prettier handling of directories and log level on lint and fix tasks ([77159d9](https://github.com/rafamel/riseup/commit/77159d9694defc7b1a2fb665ed04527ffcb94d77))
* **packages/tooling:** include user rules in eslint configuration ([5463f9a](https://github.com/rafamel/riseup/commit/5463f9aa36bdc1c8bc56ee1151e523c367723a8a))
* **packages/tooling:** properly handle escape characters on babel configuration ([f6cb96a](https://github.com/rafamel/riseup/commit/f6cb96aaec9d114034414cd45af2235706db4933))


### Features

* **pacakges:** add context to reconfigure callbacks ([acf6383](https://github.com/rafamel/riseup/commit/acf638387cf02ac00d5d394d7da5933d48477779))
* **packages:** call reconfigure functions on demand; add hydrate functions ([bd2ff9a](https://github.com/rafamel/riseup/commit/bd2ff9ac59b8f1ab7becb4daa67c7528417071ab))
* **packages:** remove transpile as a separate task from tooling; transpile on library build ([46d41bd](https://github.com/rafamel/riseup/commit/46d41bd8660bf111126170c1846eb87bf8f30e37))
* **packages:** use jest for tests instead of ava ([77bbd4e](https://github.com/rafamel/riseup/commit/77bbd4e4df4d96109d6a4bd0cb6cd4b82cefc97e))
* **packages/react:** add build task ([5e6ed5c](https://github.com/rafamel/riseup/commit/5e6ed5c256ec428ba00254e401114a30db7ed14c))
* **packages/tooling:** add babel-plugin-module-name-mapper to default babel configuration ([8227f32](https://github.com/rafamel/riseup/commit/8227f32982e7370f5c185e02f431c4f713562569))
* **packages/tooling:** add configureBabel, reconfigureBabel ([b69f216](https://github.com/rafamel/riseup/commit/b69f21656a454f6cea06a4fba5f3e12eea5be224))
* **packages/tooling:** add configureEslint ([9c81cac](https://github.com/rafamel/riseup/commit/9c81cace404d1ffc4277039c3483741b3353371f))
* **packages/tooling:** add configureJest ([c750c32](https://github.com/rafamel/riseup/commit/c750c3217efede4d643e6dd4528b4f6677f11da3))
* **packages/tooling:** add configureTypescript ([669c91a](https://github.com/rafamel/riseup/commit/669c91afdb15f83ea44991970130a3a97a04205d))
* **packages/tooling:** add eslint task ([4f0cc70](https://github.com/rafamel/riseup/commit/4f0cc7094820cb547d6b1601a36419fd404a7348))
* **packages/tooling:** add fix task ([3793158](https://github.com/rafamel/riseup/commit/37931588636eee86c4e5ff117341ecac4041a32f))
* **packages/tooling:** add formatting checks on lint task ([5f497f7](https://github.com/rafamel/riseup/commit/5f497f773e6ca1427726349a22cf642c4ccc7928))
* **packages/tooling:** add main tooling set up function ([97ed494](https://github.com/rafamel/riseup/commit/97ed494c843bd41c3f2e85b102195c17de7c8841))
* **packages/tooling:** add node task ([3f5d64d](https://github.com/rafamel/riseup/commit/3f5d64dfb20e35c130c64190cc0eaea55e51fd03))
* **packages/tooling:** add test task ([660babc](https://github.com/rafamel/riseup/commit/660babc74ef9588f998bf53361ab715dabeeb6d5))
* **packages/tooling:** add transpile task ([6c1451d](https://github.com/rafamel/riseup/commit/6c1451d75124570f99d132ff427198ba1e984efd))
* **packages/tooling:** allow for granular babel reconfiguration ([214dd5a](https://github.com/rafamel/riseup/commit/214dd5a19cc366625a08b35c9274c24550f17d52))
* **packages/tooling:** fix/lint only src and test dirs by default ([66c201e](https://github.com/rafamel/riseup/commit/66c201e8cc27d863029fcf1f7efab7e84464bc4f))
* **packages/tooling:** set NODE_ENV for node, test, and coverage tasks ([1de8a31](https://github.com/rafamel/riseup/commit/1de8a319dc5b0f1999e3d2bf9701c4fad08be733))
* **packages/tooling:** take global extensions for assets and styles to be mocked ([8c7cbc9](https://github.com/rafamel/riseup/commit/8c7cbc94fe2d84f183246c1d61c7a9d34d7d5445))
* **packages/tooling:** use ava instead of jest for test; add coverage task w/ nyc ([e3fc15c](https://github.com/rafamel/riseup/commit/e3fc15c14f10831dcacbbfa6c8d610b1c98f28c7))
* **packages/tooling:** use different typescript include configurations per task ([4ad8341](https://github.com/rafamel/riseup/commit/4ad834189b3317a7ee4bce8ac1564fb37ad158c5))
* **packages/utils:** take file extension on tmpTask ([19f14d9](https://github.com/rafamel/riseup/commit/19f14d957fe24de22f0078bf0abf72b536fc0105))





# [0.5.0](https://github.com/rafamel/riseup/compare/v0.4.0...v0.5.0) (2019-11-01)


### Bug Fixes

* **deps:** updates dependencies ([23a20b5](https://github.com/rafamel/riseup/commit/23a20b597feea8e75c7c87e9e51f6863be075da5))


### Features

* sets engine as and transpiles for node 12 ([d14174d](https://github.com/rafamel/riseup/commit/d14174d9d1fc890cc4fb68c9bf04c3a84a38c2ed))





# [0.4.0](https://github.com/rafamel/riseup/compare/v0.3.0...v0.4.0) (2019-09-12)


### Features

* **packages/tooling:** disables lines-between-class-members and changes @typescript-eslint/no-infer ([e28cf3e](https://github.com/rafamel/riseup/commit/e28cf3e))





# [0.3.0](https://github.com/rafamel/riseup/compare/v0.2.0...v0.3.0) (2019-09-12)


### Bug Fixes

* **deps:** updates dependencies ([baba8f6](https://github.com/rafamel/riseup/commit/baba8f6))
* **packages:** updates dependencies ([ca2285b](https://github.com/rafamel/riseup/commit/ca2285b))
* **packages/react:** resolves eslint plugins relative to tooling package ([943f87b](https://github.com/rafamel/riseup/commit/943f87b))
* **packages/tooling:** fixes eslint array-type configuration ([4e2e2e2](https://github.com/rafamel/riseup/commit/4e2e2e2))
* **packages/tooling:** fixes eslint config when !typescript ([628fe98](https://github.com/rafamel/riseup/commit/628fe98))


### Features

* **packages:** removes commit check; renames pre-commit to verify; establishes difference between v ([f68cf75](https://github.com/rafamel/riseup/commit/f68cf75))
* **packages/tooling:** disables camelcase and interface-name-prefix for eslint ([5ca0d8b](https://github.com/rafamel/riseup/commit/5ca0d8b))
* **packages/tooling:** resolves eslint plugins relative to tooling package ([5b64c4a](https://github.com/rafamel/riseup/commit/5b64c4a))
* **packages/toooling:** disables @typescript-eslint/ban-ts-ignore eslint rule ([da46e28](https://github.com/rafamel/riseup/commit/da46e28))





# [0.2.0](https://github.com/rafamel/riseup/compare/v0.1.0...v0.2.0) (2019-08-04)

**Note:** Version bump only for package @riseup/tooling





# [0.1.0](https://github.com/rafamel/riseup/compare/v0.0.2...v0.1.0) (2019-08-04)


### Bug Fixes

* **deps:** updates dependencies ([f06ef87](https://github.com/rafamel/riseup/commit/f06ef87))
* changes precommit script name to pre-commit to avoid husky double runs ([bc9b754](https://github.com/rafamel/riseup/commit/bc9b754))


### Features

* **tooling:eslint:** disables no-return-await rule ([1b41cc4](https://github.com/rafamel/riseup/commit/1b41cc4))





## [0.0.2](https://github.com/rafamel/riseup/compare/v0.0.1...v0.0.2) (2019-07-02)


### Bug Fixes

* updates dependencies ([1a54aed](https://github.com/rafamel/riseup/commit/1a54aed))
