# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.22.1](https://github.com/rafamel/riseup/compare/v0.22.0...v0.22.1) (2024-08-19)

### Bug Fixes

* **packages/universal:** publish only packages with new versions in a monorepo ([ab99cb9](https://github.com/rafamel/riseup/commit/ab99cb94a32941078a5735d43ccae7e67acb7dbe))
* **packages/web:** rename assets.result to assets.summary and consistent handling of urls ([48a33d5](https://github.com/rafamel/riseup/commit/48a33d5ab833e02e49b3e89a54cc67688da85895))
* **packages:** update dependencies ([1bd5a3c](https://github.com/rafamel/riseup/commit/1bd5a3c750b3b6ee8f61d08d25f10d3d5bbb4409))
* **packages:** update kpo to v0.28.0 ([f14f909](https://github.com/rafamel/riseup/commit/f14f909e761bbc607f8601d0267510ad208a9f22))

# [0.22.0](https://github.com/rafamel/riseup/compare/v0.21.0...v0.22.0) (2024-07-11)

### Bug Fixes

* **packages/universal:** fix contents task asset copy ([9e835aa](https://github.com/rafamel/riseup/commit/9e835aa87b397bf1b5a9e9741a0ab2cc716469de))
* **packages/universal:** fix tarball monorepo packages resolution ([bdea91d](https://github.com/rafamel/riseup/commit/bdea91d4fb968d3ef55bf10134305154400a84d9))
* **packages/universal:** fix tarball task usage of kpo's edit ([b9df63b](https://github.com/rafamel/riseup/commit/b9df63bcde7d53876d8fa55754a0673adb7942a9))
* **packages/universal:** release doesn't error when no git upstream is set ([8eea2ee](https://github.com/rafamel/riseup/commit/8eea2ee62e2177f6969812d22fe1f0acb2585b06))
* **packages:** update dependencies ([7ba8841](https://github.com/rafamel/riseup/commit/7ba8841e351d0a2c1c698305e3b72c85844fc29c))
* **packages:** update dependencies ([0f96337](https://github.com/rafamel/riseup/commit/0f963370f04664290fffcc4886fe8956f55530c6))
* **packages:** update kpo version ([e9f6ad5](https://github.com/rafamel/riseup/commit/e9f6ad5ac3688141facab0efd155af4e2d315ee0))
* **packages:** update kpo version ([f53b5fb](https://github.com/rafamel/riseup/commit/f53b5fb63885c1a86d90849c9ad06ee550a0ad03))
* **packages:** update node version ([89d4e13](https://github.com/rafamel/riseup/commit/89d4e13a9767bb641ae5ce7e90e46e17f63915a8))

### Code Refactoring

* **packages:** cleanup core functions ([f19cc51](https://github.com/rafamel/riseup/commit/f19cc5142a2eb5356d5c517ac9d4efc538c8e670))
* **packages:** revert utils rename to core ([e4c5aed](https://github.com/rafamel/riseup/commit/e4c5aedd887347a8248582c5b1e46cdf05294451))
* **packages:** use kpo's tmp instead of own getTmpDir ([cc3c4f9](https://github.com/rafamel/riseup/commit/cc3c4f90d696b560b9b7066980495b240afc44c9))
* renames utils package to core and tooling to universal ([7e9caac](https://github.com/rafamel/riseup/commit/7e9caacc6c88265f5739ebd82ed7bd460ddb9574))
* simplify project and remove main tooling tasks ([c62dc39](https://github.com/rafamel/riseup/commit/c62dc397800204f3dc507bfd9388dd15c696db46))

### Features

* make coverage merge independent of monorepo setups ([0a0f493](https://github.com/rafamel/riseup/commit/0a0f4931b703dabe835e0816c5f67625f6dc61a2))
* **packages/universal:** add confirmation and select prompts to release ([1859c90](https://github.com/rafamel/riseup/commit/1859c90c674f0306b5956f27848697a0f461df5b))
* **packages/universal:** add contents task ([0c7791d](https://github.com/rafamel/riseup/commit/0c7791d03c447b7a634e54dbce3ffa4ae7097f88))
* **packages/universal:** distribute task takes a contents option ([e8a536c](https://github.com/rafamel/riseup/commit/e8a536c3326c4a5b352638faf9da7f7982223397))
* **packages/universal:** handle monorepo workspaces when recreating a project for tarball ([f7d5c23](https://github.com/rafamel/riseup/commit/f7d5c233db8b6636ba5d9b9ff2e277760b6b1588))
* **packages/universal:** implement release for monorepos ([235a84c](https://github.com/rafamel/riseup/commit/235a84c0e1afa385a3d153f851fcc4cb275039c8))
* **packages/universal:** remove package option from tarball task in favor of contents ([8d1bde0](https://github.com/rafamel/riseup/commit/8d1bde0146a590e072062e1d938ed3ea951fbf14))
* **packages:** preset no longer has a configure field ([0f6d978](https://github.com/rafamel/riseup/commit/0f6d9782085475ac0d8bfe34e93f74527edc7d4f))
* **packages:** use npm workspaces instead of lerna ([a700ebc](https://github.com/rafamel/riseup/commit/a700ebccb822c1be02db27331686beb56968941e))

### BREAKING CHANGES

* **packages/universal:** the tarball task no longer has a package option
* **packages:** utils package doesn't export getTmpDir
* **packages:** riseup supports node >= 22
* **packages:** Preset class no longer has a configure field, and hence also lacks the retrieve and
intercept methods
* **packages:** no longer using lerna for monorepos
* **packages:** core package will remain as utils
* **packages:** core/utils package doesn't export certain functions anymore; review the current
documentation
* coverage input files are now globs relative to where the task is running, not the
monorepo packages
* See commit description.
* See commit description.

# [0.21.0](https://github.com/rafamel/riseup/compare/v0.20.0...v0.21.0) (2022-06-01)

### Bug Fixes

* **packages/tooling:** Transpiler.resolve resolves externals; returns an object instead of a string ([bdc7bc3](https://github.com/rafamel/riseup/commit/bdc7bc396e0594a448e4fd28e08c62a0bf5bdfee))
* **packages:** update dependencies ([d95b5a1](https://github.com/rafamel/riseup/commit/d95b5a108b659deb5d362f43d84b05fa889b4082))

### Features

* **package/tooling:** soften jsx linter rules ([8dfd658](https://github.com/rafamel/riseup/commit/8dfd65856174c9e3d3bff98a088d1772fb17464a))
* **packages/tooling:** simplify Transpiler.extensions and Builder.extensions api ([ab2ab8c](https://github.com/rafamel/riseup/commit/ab2ab8c4968dbf323d2a4fc249cf5aad8e9e0a8f))

### BREAKING CHANGES

* **packages/tooling:** Transpiler.resolve returns an object instead of a string
* **packages/tooling:** Transpiler.extensions and Builder.extensions methods non longer take any arguments

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

* bump engine to node 18 ([6056bf7](https://github.com/rafamel/riseup/commit/6056bf7513de2f0627222480ea0efaa30dd83528))
* **packages/tooling:** fix json imports on jest ([ed62249](https://github.com/rafamel/riseup/commit/ed62249eefe854f0d86ee2381db2720437c71e14))
* update dependencies ([675ade5](https://github.com/rafamel/riseup/commit/675ade5cc60898765cb1fefdcc56afecb141e31f))

### Features

* **package/tooling:** disable eslint rule unicorn/consistent-function-scoping for arrow function ([5c9c30f](https://github.com/rafamel/riseup/commit/5c9c30f34d67c5cf1c8e97d1006f1e7e9f5dcf63))
* **package/tooling:** improve default eslint rules ([1741a67](https://github.com/rafamel/riseup/commit/1741a677d4a8ac93cc5ca4da947b39377194068f))
* **packages/tooling:** add package entrypoint for transpile loader ([eaf22b5](https://github.com/rafamel/riseup/commit/eaf22b5126543337a4f65d0e65f5a0eabc9c649d))

### BREAKING CHANGES

* engine bumped to node 18

# [0.18.0](https://github.com/rafamel/riseup/compare/v0.17.0...v0.18.0) (2022-05-24)

### Bug Fixes

* **packages/library:** exclude node_modules from tarball task working directory copy ([43bbc12](https://github.com/rafamel/riseup/commit/43bbc126ee16969371765f1f845f8514c4cbfa79))
* **packages/tooling:** fix package tarballs requiring node_modules dependencies ([efb703f](https://github.com/rafamel/riseup/commit/efb703f927ba7e8a7540e799a5941ee024266c7f))
* **packages:** update dependencies ([7f8d067](https://github.com/rafamel/riseup/commit/7f8d067e4842828800231cc8eff390ef6f2922f5))

### Code Refactoring

* **packages:** move tarball task from library to tooling package ([1dbe8ce](https://github.com/rafamel/riseup/commit/1dbe8ce021b9b2b64c8c66ddfe915a4b87ccbc89))

### Features

* **packages/library:** add package.json overrides option to tarball task params ([6dba8cf](https://github.com/rafamel/riseup/commit/6dba8cf6edc700fdc33abdb48fe1cef040d5540a))
* **packages/rooling:** allow package tarballs to have a modified package.json w/ a callback function ([3e6b26a](https://github.com/rafamel/riseup/commit/3e6b26ae2ff8416ce2c69194c42222cafaff0539))
* **packages/tooling:** soften several unicorn rules configuration ([4b3e082](https://github.com/rafamel/riseup/commit/4b3e0828bf7a2a4583058c7f882e4101b2c074f0))
* **packages/universal:** exclude CHANGELOG, node_modules, and other directories from markdown linting ([d77ae1f](https://github.com/rafamel/riseup/commit/d77ae1f67000ac860a5f3f4ddebd43614f7f0756))

### BREAKING CHANGES

* **packages:** the library package no longer provides the tarball task; it is now included in the
tooling package

# [0.17.0](https://github.com/rafamel/riseup/compare/v0.16.0...v0.17.0) (2022-04-04)

### Bug Fixes

* **packages/web:** fix fonts fetch on assets task ([d80fe51](https://github.com/rafamel/riseup/commit/d80fe515dc2d2776b073329920047f9f17f7c0c0))
* update dependencies ([4892adb](https://github.com/rafamel/riseup/commit/4892adb01f2ce2837bba4a40017fcc076d437620))
* update dependencies ([3d17e1b](https://github.com/rafamel/riseup/commit/3d17e1b70c6a90f4233bff55f2bb5b2f165ab44d))

### BREAKING CHANGES

* **packages/web:** @riseup/web assets task configuration has changed; please check the latest
documentation

# [0.16.0](https://github.com/rafamel/riseup/compare/v0.15.0...v0.16.0) (2022-03-24)

### Bug Fixes

* **packages/tooling:** fix build include/exclude patterns ([bf3d7a1](https://github.com/rafamel/riseup/commit/bf3d7a137e1ac0bff0b764f6adf26d5510e56ed9))
* **packages:** fix tags push on release/distribute ([9ca851d](https://github.com/rafamel/riseup/commit/9ca851dd33496031e72bd2c97e349fed6c5cf487))

### Features

* **packages/tooling, templates/library:** enable code splitting by default on build ([e330369](https://github.com/rafamel/riseup/commit/e33036973386a1dd1c8f6da40766746ebacd87ab))
* **packages/tooling:** disable no static only class linter rule on default configuration ([1047d3f](https://github.com/rafamel/riseup/commit/1047d3f9014d9f66e2e81974552c748e237ba8c5))

# [0.15.0](https://github.com/rafamel/riseup/compare/v0.14.0...v0.15.0) (2022-03-22)

### Bug Fixes

* **packages/library,packages/web:** remove dangling dependencies ([40d2918](https://github.com/rafamel/riseup/commit/40d2918f17f02a44cc05e1d1723db21172e5e7cd))
* **packages/tooling:** fix lint task for typescript incremental configuration ([4e0a7e1](https://github.com/rafamel/riseup/commit/4e0a7e151e6f627858cf1c612af71568706b633e))
* **packages/web:** fix assets task result ([61ba732](https://github.com/rafamel/riseup/commit/61ba732830799716bb1dd93795e324f23d3d43b4))
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

### Bug Fixes

* **packages/library:** tarball task w/ monorepo resolution doesn't error when there are no local dependencies ([b14021d](https://github.com/rafamel/riseup/commit/b14021d1db4dcb5b67ced3b53b609d1c6299bcbd))

### Features

* **packages/library:** improve error descriptiveness for monorepo resolution ([48cc7d1](https://github.com/rafamel/riseup/commit/48cc7d1f6c39edcbb219d772e9f9889a36c53d5d))

# [0.11.0](https://github.com/rafamel/riseup/compare/v0.10.0...v0.11.0) (2021-09-15)

### Features

* **packages/library:** consolidate build destination directory option in output global option ([a15b3ed](https://github.com/rafamel/riseup/commit/a15b3edcf71536eb4e1130825f48a1e792831f9c))
* **packages/library:** separate tarball/pack task from build; add monorepo dependency resolution/inclusion ([d0381f8](https://github.com/rafamel/riseup/commit/d0381f8453b8a393488b4cfe28197ae154703503))
* **packages/monorepo:** add registry option for distribute ([50a72ec](https://github.com/rafamel/riseup/commit/50a72ec0ebf5ee8bd5f1f160503efb258b542d57))

# [0.10.0](https://github.com/rafamel/riseup/compare/v0.9.2...v0.10.0) (2021-09-14)

### Bug Fixes

* **packages/utils:** fix getBin resolution for ES modules ([ce13637](https://github.com/rafamel/riseup/commit/ce13637b6d743606a9bbd2948a9d46129b334aae))
* **packages:** update dependencies ([fda9969](https://github.com/rafamel/riseup/commit/fda9969aaf64671eccaea5916f80eaa8867dc9e0))
* **templates/next:** fix type errors ([f7e92b7](https://github.com/rafamel/riseup/commit/f7e92b7d98bbc29007b927e6093bd01f74b94fe2))

### Features

* **packages/tooling:** independent prettierignore resolution; parse formatting only with prettier ([1a32f85](https://github.com/rafamel/riseup/commit/1a32f851c5601bc90a9f5c549c275131b56c8123))

## [0.9.2](https://github.com/rafamel/riseup/compare/v0.9.1...v0.9.2) (2021-06-30)

### Bug Fixes

* **packages/tooling:** disable no-dupe-class-members eslint rule for typescript ([b12a622](https://github.com/rafamel/riseup/commit/b12a622dad4fefaa7ff0b6562a639f2e7a90131b))

## [0.9.1](https://github.com/rafamel/riseup/compare/v0.9.0...v0.9.1) (2021-06-28)

### Bug Fixes

* **packages:** update dependencies ([d8fabf9](https://github.com/rafamel/riseup/commit/d8fabf9d8cfb5180ecba281c3ac1194268dda2e8))
* **packages/utils:** fix intercept in Windows ([9485cb7](https://github.com/rafamel/riseup/commit/9485cb7485aa70a0ccc1daa3a73354a415c5a97b))
* **templates:** update to latest riseup ([5aa6532](https://github.com/rafamel/riseup/commit/5aa653229d2adefbaa204db50a1f03ce367bb645))

# [0.9.0](https://github.com/rafamel/riseup/compare/v0.8.0...v0.9.0) (2021-06-22)

### Bug Fixes

* **packages/next:** resolve public task result path relative to dest ([8b0fbd4](https://github.com/rafamel/riseup/commit/8b0fbd468ad81806c6c3dba83da6494805007ab7))

### Features

* **packages/next:** add fonts download capabilities to public task ([f6431d8](https://github.com/rafamel/riseup/commit/f6431d8357d218eaa8e0caec81965a89e71784ac))

# [0.8.0](https://github.com/rafamel/riseup/compare/v0.7.0...v0.8.0) (2021-06-20)

### Bug Fixes

* **packages/library:** docs task intercepts typedoc configuration file for proper path resolution ([23939f3](https://github.com/rafamel/riseup/commit/23939f3e14b0270037267b67489c73ecde52bf18))
* **packages/library:** fixes typedoc options relative paths ([11fc8e1](https://github.com/rafamel/riseup/commit/11fc8e1aa15f4bd79d7e03cd879d977f23cfda47))
* **packages/library:** reconfigure babel on transpile even for configuration override files ([4aeb828](https://github.com/rafamel/riseup/commit/4aeb828669aa384449df7a2192b84df2b7e7f776))
* **packages/monorepo:** fix execute and run tasks ([8a1d555](https://github.com/rafamel/riseup/commit/8a1d5550e1e683e639b40d1072944326b7f82499))
* **packages/next:** disable next forceful write of next-env.d.ts ([99af30e](https://github.com/rafamel/riseup/commit/99af30e2901565a26ab52cb421d1e8b48efc38a5))
* **packages/next:** fix result.manifest urls for favicons task ([dfe36d2](https://github.com/rafamel/riseup/commit/dfe36d290d3b367208336e273b6cf56b40989d92))
* **packages/next:** rename hydrateExports to hydrateExport ([f2eee8f](https://github.com/rafamel/riseup/commit/f2eee8fb7f1a96701059f80a58b4e3d81cdb7d65))
* **templates:** update dependencies ([3740736](https://github.com/rafamel/riseup/commit/37407362a6c51c2730ea7d7e914b050089f1e370))

### Features

* **packages/next:** rename favicons task to public; can copy assets to public folder ([1e65317](https://github.com/rafamel/riseup/commit/1e65317c7415b7b580d1797a9e432e1b3bb8449a))
* **packages/utils:** interceptor sets up an in memory fs; defaults to the filesystem; wider compatibility ([5de75d4](https://github.com/rafamel/riseup/commit/5de75d4d327c18cc8a472d8847895148a451e31e))
* **packages/utils:** rename tmpTask to temporal; files are overriden by existing files ([f5e389b](https://github.com/rafamel/riseup/commit/f5e389b497e941c2352c715ac0eeec96c8b03876))
* **templates:** add config comments ([bd8aaa8](https://github.com/rafamel/riseup/commit/bd8aaa8cae3f721a0a005dc743bd0fe77b907b60))
* **templates:** add next template ([14ce687](https://github.com/rafamel/riseup/commit/14ce687e2a46349de4b902d7417264629c37a2e6))
* **templates/next:** set title and metadata globally ([3962d41](https://github.com/rafamel/riseup/commit/3962d414be2812ffc36d62aac1392c3e038b9fc1))

# [0.7.0](https://github.com/rafamel/riseup/compare/v0.6.0...v0.7.0) (2021-06-18)

### Bug Fixes

* **deps:** update setup dependencies with latest riseup release ([a796918](https://github.com/rafamel/riseup/commit/a79691801dc24fc4afaa1fca249f8aed72e0ed9a))
* **packages:** fix next tests for images add more descriptive names for babel stubs ([397c1b0](https://github.com/rafamel/riseup/commit/397c1b09b4c29f2d2d4be05ec8063931f4657980))
* **packages:** update dependencies ([f92c5a9](https://github.com/rafamel/riseup/commit/f92c5a98cc97f463f21001b62ff4a02c012aa563))
* **packages/monorepo:** fix coverage, execute, run on windows ([bc6f7ce](https://github.com/rafamel/riseup/commit/bc6f7ced903856af56bf7eb17baf5a8df081d9cb))
* **packages/next:** build task passes --no-lint by default ([695fb09](https://github.com/rafamel/riseup/commit/695fb094780e240b09e258e1dc761c1ede7e7652))
* **packages/next:** fix analyze task ([e286e7b](https://github.com/rafamel/riseup/commit/e286e7bfa92e1f93605e528d73fe59dec48b2436))
* **packages/next:** fix and add dir option to size task ([d2747bd](https://github.com/rafamel/riseup/commit/d2747bd642aafbfb553d2e1aa33f4b9605f5cb8c))
* **packages/next:** next related tasks can receive arguments ([e517a40](https://github.com/rafamel/riseup/commit/e517a40999628a459d8404814867562d65224a1f))
* **packages/tooling:** add noEmit to default tsconfig ([bf9c736](https://github.com/rafamel/riseup/commit/bf9c73675f2d218133716091ddc28d9688e6fa58))
* **packages/tooling:** fix coverage directories on jest configuration ([429625a](https://github.com/rafamel/riseup/commit/429625a7cdf2a98ad077e7f520eaa8590ca7035d))

### Features

* **packages:** replace react pacakge by next package ([eb8052b](https://github.com/rafamel/riseup/commit/eb8052b6baee6207cdc192728348b2bebc4cac03))
* **packages/library:** log push progress separately for distribute task ([c8d2942](https://github.com/rafamel/riseup/commit/c8d2942eeac8fcbf179128a26222c20a7757ce39))
* **packages/next:** add favicons task ([ea600b3](https://github.com/rafamel/riseup/commit/ea600b3ca3fcb561734d9ef9afd6b4ca5ffb42de))
* **packages/next:** add watch task ([ac55d88](https://github.com/rafamel/riseup/commit/ac55d888faaa122276fbac860789ce7a5da1f881))
* **packages/next:** prevent next default write of next-env.d.ts ([0bbbd59](https://github.com/rafamel/riseup/commit/0bbbd59824858ef838116c800c461eef6064b4de))
* **packages/next:** upgrades next to v11 ([bf7345a](https://github.com/rafamel/riseup/commit/bf7345a9fb2046443bbda124cefb559478229c94))
* **packages/tooling:** disable node/no-callback-literal eslint rule ([8806386](https://github.com/rafamel/riseup/commit/88063862a27ec3779a3005d6471780a4ab491ae2))
* **packages/tooling:** support react for eslint/lint ([0ca8c02](https://github.com/rafamel/riseup/commit/0ca8c0225bbedde9797b8ef7e1b6c5892e1d81fb))
* **packages/utils:** intercept can take an array of file path pairs ([b680edf](https://github.com/rafamel/riseup/commit/b680edff8dc071f6138ede5fe2e1275e18c300ea))

# [0.6.0](https://github.com/rafamel/riseup/compare/v0.5.0...v0.6.0) (2021-06-13)

### Bug Fixes

* **deps:** update dependencies ([093f636](https://github.com/rafamel/riseup/commit/093f6369aa90d2f9d22e4b9f16121bf7141abd61))
* **deps:** update dependencies ([43a2692](https://github.com/rafamel/riseup/commit/43a2692fc36e278d1adc952a01c264cf02c8995c))
* **deps:** update kpo ([b8b9b66](https://github.com/rafamel/riseup/commit/b8b9b66aed7fe8e113fe8047e3528df1515853dc))
* **deps:** update kpo to v0.20.0 ([27fb782](https://github.com/rafamel/riseup/commit/27fb7827a67ba2e8c3bcc0ad9c517774faaa1cf3))
* **deps:** update type-core ([4633acf](https://github.com/rafamel/riseup/commit/4633acf1fc9eec966f1a4d402e1b9cee1a0c0bab))
* **pacakges/react:** add React to globals on reconfigureAvaReact ([624bb10](https://github.com/rafamel/riseup/commit/624bb102b97f621f4646203d071987f353452f72))
* **packages:** does not use babel transform mappers for actual builds ([e373ec1](https://github.com/rafamel/riseup/commit/e373ec1a14cb4cd2d5c8d9795772f9c718fbfc01))
* **packages:** make react and tooling packages public ([9f26e2f](https://github.com/rafamel/riseup/commit/9f26e2f8e5f978444420531dba53b1810a8531f6))
* **packages:** resolve bins from origin package ([ee63ed3](https://github.com/rafamel/riseup/commit/ee63ed30eb79d915481a56844bdf0f8a1549bb3d))
* **packages:** update dependencies ([17e8b0b](https://github.com/rafamel/riseup/commit/17e8b0be83bb857e038b8298b5bd5e584c4f5bba))
* **packages:** update dependencies ([f520850](https://github.com/rafamel/riseup/commit/f520850d78b7889d3bf1b2020973430b6c914ccd))
* **packages/library:** fix build on windows ([dec91b2](https://github.com/rafamel/riseup/commit/dec91b24d193a5f792e0f8c629470d246ffa9585))
* **packages/library:** fix releseit dependency ([ea9db21](https://github.com/rafamel/riseup/commit/ea9db2161bd9402480d15dec19080eff5771ef4c))
* **packages/monorepo:** export tasks and definitions from entrypoint ([0a8bde5](https://github.com/rafamel/riseup/commit/0a8bde55b949b2005beba8400a77864f2e71b2cc))
* **packages/monorepo:** run and execute tasks don't pass command arguments to lerna ([1038d8b](https://github.com/rafamel/riseup/commit/1038d8b4439bf26a953092f266fe1d7555c3397e))
* **packages/react:** add missing dependencies ([f804ce5](https://github.com/rafamel/riseup/commit/f804ce574ea9f4691352c076e04c9a1c8a4fd272))
* **packages/react:** add missing dependencies ([6014405](https://github.com/rafamel/riseup/commit/601440584a2374bd282e2e280591645cf30e0e5c))
* **packages/react:** fix ForkTsCheckerWebpackPlugin setup for craco ([e385a6b](https://github.com/rafamel/riseup/commit/e385a6b0ceb88d076d337a38a24d1efe158a5a30))
* **packages/react:** remove react preset from babel configuration for start and build tasks ([8e4cf91](https://github.com/rafamel/riseup/commit/8e4cf91cb127bad45a467650fee14f9f2e575fc7))
* **packages/tooling:** add missing dependency find-up ([6bf0af5](https://github.com/rafamel/riseup/commit/6bf0af5054805486ea81ab965dc412d42f2e5705))
* **packages/tooling:** add missing eslint plugin dependencies ([af465f2](https://github.com/rafamel/riseup/commit/af465f213ef74efa8dd1a74f555329ad95fcdcd2))
* **packages/tooling:** fix configureBabel and configureJest for windows systems ([df1dec0](https://github.com/rafamel/riseup/commit/df1dec0736af8d88a907af854cd2e51bd08b08fa))
* **packages/tooling:** fix eslint and typescript configurations ([7cd5773](https://github.com/rafamel/riseup/commit/7cd577394f97dc8b6ed1dc18530ed42da9da27c5))
* **packages/tooling:** fixes prettier handling of directories and log level on lint and fix tasks ([77159d9](https://github.com/rafamel/riseup/commit/77159d9694defc7b1a2fb665ed04527ffcb94d77))
* **packages/tooling:** include user rules in eslint configuration ([5463f9a](https://github.com/rafamel/riseup/commit/5463f9aa36bdc1c8bc56ee1151e523c367723a8a))
* **packages/tooling:** properly handle escape characters on babel configuration ([f6cb96a](https://github.com/rafamel/riseup/commit/f6cb96aaec9d114034414cd45af2235706db4933))
* **packages/universal:** add missing dependency conventional-changelog-cli ([26c80a5](https://github.com/rafamel/riseup/commit/26c80a5f14c25e4ea1a2b53f720cc6a9be71b045))
* **packages/utils:** fix getBin for esm packages ([2eeb3ee](https://github.com/rafamel/riseup/commit/2eeb3ee439c292e823a85043bc0f86a3b9bb1549))
* **packages/utils:** getBin recovers path when pkg.bin is a string ([d7cf077](https://github.com/rafamel/riseup/commit/d7cf0776134c5096807da6a84140605dff24b875))
* **templates:** update templates to latest riseup builds ([263071a](https://github.com/rafamel/riseup/commit/263071a15a1ee340ef539833625886760a6bad3e))

### Features

* **pacakges:** add context to reconfigure callbacks ([acf6383](https://github.com/rafamel/riseup/commit/acf638387cf02ac00d5d394d7da5933d48477779))
* **packages:** call reconfigure functions on demand; add hydrate functions ([bd2ff9a](https://github.com/rafamel/riseup/commit/bd2ff9ac59b8f1ab7becb4daa67c7528417071ab))
* **packages:** remove transpile as a separate task from tooling; transpile on library build ([46d41bd](https://github.com/rafamel/riseup/commit/46d41bd8660bf111126170c1846eb87bf8f30e37))
* **packages:** use jest for tests instead of ava ([77bbd4e](https://github.com/rafamel/riseup/commit/77bbd4e4df4d96109d6a4bd0cb6cd4b82cefc97e))
* **packages/cli:** adds cli export and riseup bin ([17ac593](https://github.com/rafamel/riseup/commit/17ac5932c8019bcedd8789f8e381d3d99e4a5774))
* **packages/cli:** enable update notification ([715563a](https://github.com/rafamel/riseup/commit/715563aa11d6456f985e8730c52b0c54ee135772))
* **packages/cli:** run cli on multi task mode ([d637280](https://github.com/rafamel/riseup/commit/d63728017880312727b1e3e2ef76a3bfe36c8177))
* **packages/cli:** run cli on single task mode ([d94f937](https://github.com/rafamel/riseup/commit/d94f937be61b51b80262231dc34f9eb0d2bd8b35))
* **packages/library:** add build task ([d123fdc](https://github.com/rafamel/riseup/commit/d123fdc018eee34fc111f62482c97a62befd7bde))
* **packages/library:** add configurePika ([285a485](https://github.com/rafamel/riseup/commit/285a485cbd36cca08bbd6a6ab46a47bcef263033))
* **packages/library:** add configureTypedoc ([967fb99](https://github.com/rafamel/riseup/commit/967fb99646ea72fe30c8a16ec24a4e1bedac0cf3))
* **packages/library:** add distribute task ([4fdee41](https://github.com/rafamel/riseup/commit/4fdee410ebb94894a9cb31f47dbb209335303f63))
* **packages/library:** add docs task ([821c43c](https://github.com/rafamel/riseup/commit/821c43c2f26b96c3f501bac02cd9dd87fb519c9c))
* **packages/library:** add main library set up function ([6957b26](https://github.com/rafamel/riseup/commit/6957b26e0a74bb1268ebe98b39839a8285572214))
* **packages/library:** adds nodev and manifest options to pika configuration ([3c679ac](https://github.com/rafamel/riseup/commit/3c679ac0f27fb2697fedb32b3600c188abd71b90))
* **packages/monorepo:** add coverage task ([c6b12f3](https://github.com/rafamel/riseup/commit/c6b12f357edefcafde63a52c1f2a2976514dc6b8))
* **packages/monorepo:** add distribute task ([1e8dc1a](https://github.com/rafamel/riseup/commit/1e8dc1a83f6a4e6547bc3e7ad587f43543238d32))
* **packages/monorepo:** add exec task ([cf43234](https://github.com/rafamel/riseup/commit/cf43234f3b05f1367662ea994f6c8078b868fee2))
* **packages/monorepo:** add link task ([cf2ddd1](https://github.com/rafamel/riseup/commit/cf2ddd17283108682ce222c9180712929a2142a6))
* **packages/monorepo:** add main monorepo setup function ([f2aa41e](https://github.com/rafamel/riseup/commit/f2aa41eb0a6fdfaf586a57a39327fcaf2a2ff22c))
* **packages/monorepo:** add run task ([d0983cb](https://github.com/rafamel/riseup/commit/d0983cb724a8bd2526efb08d89bfd0a34a8e520e))
* **packages/monorepo:** execute and run tasks take --help, -h as first parameter ([758d938](https://github.com/rafamel/riseup/commit/758d938f2040c805381d43239cdaac7543e6aa98))
* **packages/monorepo:** remove link task ([3db8819](https://github.com/rafamel/riseup/commit/3db8819b3c39fe3a309ec704a999c2b79a282d61))
* **packages/react:** add analyze task ([af121e5](https://github.com/rafamel/riseup/commit/af121e5a71907acb22df61ff90d80fdffdace966))
* **packages/react:** add build task ([5e6ed5c](https://github.com/rafamel/riseup/commit/5e6ed5c256ec428ba00254e401114a30db7ed14c))
* **packages/react:** add main react set up function ([a520f1b](https://github.com/rafamel/riseup/commit/a520f1b69101ad3b532840099806effbc2e5298c))
* **packages/react:** add reconfigureAvaReact ([656df2e](https://github.com/rafamel/riseup/commit/656df2eb34983207a9314e6e9a6c58339e071f74))
* **packages/react:** add reconfigureBabelReact ([c899fcb](https://github.com/rafamel/riseup/commit/c899fcb8cda60d6c34ceb6e6855b67e819c74315))
* **packages/react:** add reconfigureEslintReact ([faffc1d](https://github.com/rafamel/riseup/commit/faffc1d8640ad08269681fa328f47dc1e56329e4))
* **packages/react:** add reconfigureWebpackStyles and reconfigureWebpackAddPlugins ([ba5ec8c](https://github.com/rafamel/riseup/commit/ba5ec8cb007a65a8b6ace497249de2abd87614fb))
* **packages/react:** add size task ([ab61ab2](https://github.com/rafamel/riseup/commit/ab61ab2cf1e213b42855328631a80debd8697d47))
* **packages/react:** add start task ([e004e0a](https://github.com/rafamel/riseup/commit/e004e0a57e2bcfd7d96bf2487a20c50e181eb7a5))
* **packages/react:** support images and styles in babel configuration ([b382102](https://github.com/rafamel/riseup/commit/b3821023ae3c66d5a4af7a4f34439457bdf9ca05))
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
* **packages/universal:** add changelog task ([d954f2b](https://github.com/rafamel/riseup/commit/d954f2b6ee01939e61ac8642faa2abb687372549))
* **packages/universal:** add commit task ([e542cc8](https://github.com/rafamel/riseup/commit/e542cc88d0f3b19e33027d5e36341a341a17eae2))
* **packages/universal:** add configureMarkdownlint ([eaabdfd](https://github.com/rafamel/riseup/commit/eaabdfdc81f0fb1b3f5171ddc9edc9e8a32f8d4f))
* **packages/universal:** add lintmd task ([8a4b97a](https://github.com/rafamel/riseup/commit/8a4b97a7fe3c663e85eb910d8cd2720facc81b69))
* **packages/universal:** add main universal function ([c4871ca](https://github.com/rafamel/riseup/commit/c4871ca26a4c6636acb9d5d840aa69775d90aaf5))
* **packages/universal:** add monorepo support for release ([21a75ac](https://github.com/rafamel/riseup/commit/21a75ac033023086259caa74d86c6fe1d4e9cff1))
* **packages/universal:** add semantic task ([55d7c35](https://github.com/rafamel/riseup/commit/55d7c3552f7101d08199504e8ae8d084b03dde2a))
* **packages/universal:** replace changelog and semantic tasks for release task; add configureReleaseit ([e1e91ca](https://github.com/rafamel/riseup/commit/e1e91ca489fa5bda9ce42bb31ba2799c631420d0))
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

# [0.5.0](https://github.com/rafamel/riseup/compare/v0.4.0...v0.5.0) (2019-11-01)

### Bug Fixes

* **deps:** updates dependencies ([23a20b5](https://github.com/rafamel/riseup/commit/23a20b597feea8e75c7c87e9e51f6863be075da5))

### Features

* sets engine as and transpiles for node 12 ([d14174d](https://github.com/rafamel/riseup/commit/d14174d9d1fc890cc4fb68c9bf04c3a84a38c2ed))

# [0.4.0](https://github.com/rafamel/riseup/compare/v0.3.0...v0.4.0) (2019-09-12)

### Bug Fixes

* **packages/react:** fixes analyze script ([0ee0c45](https://github.com/rafamel/riseup/commit/0ee0c45))

### Features

* **packages/tooling:** disables lines-between-class-members and changes @typescript-eslint/no-infer ([e28cf3e](https://github.com/rafamel/riseup/commit/e28cf3e))

# [0.3.0](https://github.com/rafamel/riseup/compare/v0.2.0...v0.3.0) (2019-09-12)

### Bug Fixes

* **deps:** updates dependencies ([baba8f6](https://github.com/rafamel/riseup/commit/baba8f6))
* **packages:** updates dependencies ([ca2285b](https://github.com/rafamel/riseup/commit/ca2285b))
* **packages/react:** fixes jest for /test folder ([d1ea9e4](https://github.com/rafamel/riseup/commit/d1ea9e4))
* **packages/react:** resolves eslint plugins relative to tooling package ([943f87b](https://github.com/rafamel/riseup/commit/943f87b))
* **packages/react:** temporal fix for deprecated eslint-config-react-app rule ([dd666c5](https://github.com/rafamel/riseup/commit/dd666c5))
* **packages/react:** updates eslint-config-react-app peer dependency version ([903f5ce](https://github.com/rafamel/riseup/commit/903f5ce))
* **packages/tooling:** fixes eslint array-type configuration ([4e2e2e2](https://github.com/rafamel/riseup/commit/4e2e2e2))
* **packages/tooling:** fixes eslint config when !typescript ([628fe98](https://github.com/rafamel/riseup/commit/628fe98))

### Features

* **packages:** removes commit check; renames pre-commit to verify; establishes difference between v ([f68cf75](https://github.com/rafamel/riseup/commit/f68cf75))
* **packages/library:** depends on babel, eslint, jest, and prettier ([0f57838](https://github.com/rafamel/riseup/commit/0f57838))
* **packages/react:** adds relevant tooling peer dependencies as dependencies ([d013112](https://github.com/rafamel/riseup/commit/d013112))
* **packages/tooling:** disables camelcase and interface-name-prefix for eslint ([5ca0d8b](https://github.com/rafamel/riseup/commit/5ca0d8b))
* **packages/tooling:** resolves eslint plugins relative to tooling package ([5b64c4a](https://github.com/rafamel/riseup/commit/5b64c4a))
* **packages/toooling:** disables @typescript-eslint/ban-ts-ignore eslint rule ([da46e28](https://github.com/rafamel/riseup/commit/da46e28))
* **templates/react:** removes caprover deploy script ([05adfc9](https://github.com/rafamel/riseup/commit/05adfc9))

# [0.2.0](https://github.com/rafamel/riseup/compare/v0.1.0...v0.2.0) (2019-08-04)

### Features

* **packages/common:** adds lint:scripts to validate script ([8538939](https://github.com/rafamel/riseup/commit/8538939))

# [0.1.0](https://github.com/rafamel/riseup/compare/v0.0.2...v0.1.0) (2019-08-04)

### Bug Fixes

* **deps:** updates dependencies ([f06ef87](https://github.com/rafamel/riseup/commit/f06ef87))
* changes precommit script name to pre-commit to avoid husky double runs ([bc9b754](https://github.com/rafamel/riseup/commit/bc9b754))
* **templates/react:** ensures config breakpoints are numbers ([98ae214](https://github.com/rafamel/riseup/commit/98ae214))
* **templates/react:** updates dependencies ([f39a67d](https://github.com/rafamel/riseup/commit/f39a67d))
* **templates/react:** updates dependencies ([a94f452](https://github.com/rafamel/riseup/commit/a94f452))
* **variants/react-gql:** fixes react-gql ([22567ce](https://github.com/rafamel/riseup/commit/22567ce))

### Features

* **templates:** updates to v0.0.2 ([25f2506](https://github.com/rafamel/riseup/commit/25f2506))
* **templates/react:** adds browser (bowser) util ([5caf0b7](https://github.com/rafamel/riseup/commit/5caf0b7))
* **templates/react:** improves webmanifest and icons setup ([b6864b0](https://github.com/rafamel/riseup/commit/b6864b0))
* **tooling:eslint:** disables no-return-await rule ([1b41cc4](https://github.com/rafamel/riseup/commit/1b41cc4))
* **variants:** substitutes react-ionic with react-capacitor ([445e9f5](https://github.com/rafamel/riseup/commit/445e9f5))
* **variants/react-tailwind:** updates tailwind configuration to latest react template theme ([67c8394](https://github.com/rafamel/riseup/commit/67c8394))

## [0.0.2](https://github.com/rafamel/riseup/compare/v0.0.1...v0.0.2) (2019-07-02)

### Bug Fixes

* updates dependencies ([1a54aed](https://github.com/rafamel/riseup/commit/1a54aed))
* **packages/library:** fixes babel esnext transpile on build:pack script ([3ca1260](https://github.com/rafamel/riseup/commit/3ca1260))
* **packages/react:** fixes eslint presets typings ([6c6ff73](https://github.com/rafamel/riseup/commit/6c6ff73))
* **templates/react:** updates dependencies ([9fdab0d](https://github.com/rafamel/riseup/commit/9fdab0d))

### Features

* **templates/common:** adds common files to templates ([dda9290](https://github.com/rafamel/riseup/commit/dda9290))
* **templates/library:** uses riseup ([dfdcfa6](https://github.com/rafamel/riseup/commit/dfdcfa6))
* **templates/monorepo:** adds monorepo root template ([c0d0bcf](https://github.com/rafamel/riseup/commit/c0d0bcf))
* **templates/monorepo:** adds readme to monorepo template ([5dfb7fa](https://github.com/rafamel/riseup/commit/5dfb7fa))
* **templates/react:** adds caprover deploy script ([add2fef](https://github.com/rafamel/riseup/commit/add2fef))
* **templates/react:** adds contextual util ([e57f830](https://github.com/rafamel/riseup/commit/e57f830))
* **templates/react:** adds useScript hook to utils ([4128431](https://github.com/rafamel/riseup/commit/4128431))
* **templates/react:** adds useStyles util ([d90250e](https://github.com/rafamel/riseup/commit/d90250e))
* **templates/react:** uses riseup ([43e44a7](https://github.com/rafamel/riseup/commit/43e44a7))
* **variants/:child:** adds child variant ([8bd6e53](https://github.com/rafamel/riseup/commit/8bd6e53))
* **variants/react-gql:** adds react-gql variant ([cc0ffbd](https://github.com/rafamel/riseup/commit/cc0ffbd))
* **variants/react-ionic:** adds react-ionic variant ([320239c](https://github.com/rafamel/riseup/commit/320239c))
* **variants/react-tailwind:** adds react-tailwind variant ([fc1303e](https://github.com/rafamel/riseup/commit/fc1303e))
