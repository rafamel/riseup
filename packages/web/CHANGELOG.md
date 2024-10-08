# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.22.1](https://github.com/rafamel/riseup/compare/v0.22.0...v0.22.1) (2024-08-19)

### Bug Fixes

* **packages/web:** rename assets.result to assets.summary and consistent handling of urls ([48a33d5](https://github.com/rafamel/riseup/commit/48a33d5ab833e02e49b3e89a54cc67688da85895))
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

* renames utils package to core and tooling to universal ([7e9caac](https://github.com/rafamel/riseup/commit/7e9caacc6c88265f5739ebd82ed7bd460ddb9574))
* simplify project and remove main tooling tasks ([c62dc39](https://github.com/rafamel/riseup/commit/c62dc397800204f3dc507bfd9388dd15c696db46))

### Features

* **packages:** preset no longer has a configure field ([0f6d978](https://github.com/rafamel/riseup/commit/0f6d9782085475ac0d8bfe34e93f74527edc7d4f))

### BREAKING CHANGES

* **packages:** riseup supports node >= 22
* **packages:** Preset class no longer has a configure field, and hence also lacks the retrieve and
intercept methods
* See commit description.
* See commit description.

# [0.21.0](https://github.com/rafamel/riseup/compare/v0.20.0...v0.21.0) (2022-06-01)

### Bug Fixes

* **packages:** update dependencies ([d95b5a1](https://github.com/rafamel/riseup/commit/d95b5a108b659deb5d362f43d84b05fa889b4082))

# [0.20.0](https://github.com/rafamel/riseup/compare/v0.19.0...v0.20.0) (2022-05-30)

**Note:** Version bump only for package @riseup/web

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

* **packages/web:** fix fonts fetch on assets task ([d80fe51](https://github.com/rafamel/riseup/commit/d80fe515dc2d2776b073329920047f9f17f7c0c0))
* update dependencies ([4892adb](https://github.com/rafamel/riseup/commit/4892adb01f2ce2837bba4a40017fcc076d437620))
* update dependencies ([3d17e1b](https://github.com/rafamel/riseup/commit/3d17e1b70c6a90f4233bff55f2bb5b2f165ab44d))

### BREAKING CHANGES

* **packages/web:** @riseup/web assets task configuration has changed; please check the latest
documentation

# [0.16.0](https://github.com/rafamel/riseup/compare/v0.15.0...v0.16.0) (2022-03-24)

**Note:** Version bump only for package @riseup/web

# [0.15.0](https://github.com/rafamel/riseup/compare/v0.14.0...v0.15.0) (2022-03-22)

### Bug Fixes

* **packages/library,packages/web:** remove dangling dependencies ([40d2918](https://github.com/rafamel/riseup/commit/40d2918f17f02a44cc05e1d1723db21172e5e7cd))
* **packages/web:** fix assets task result ([61ba732](https://github.com/rafamel/riseup/commit/61ba732830799716bb1dd93795e324f23d3d43b4))
* **packages:** update dependencies ([6b49a4c](https://github.com/rafamel/riseup/commit/6b49a4c17d6c70b0a3974102215923f01929c8ed))

# [0.14.0](https://github.com/rafamel/riseup/compare/v0.13.1...v0.14.0) (2022-03-16)

### Features

* **packages:** project redesign and rewrite ([28e03c9](https://github.com/rafamel/riseup/commit/28e03c9ba72dcbd4388a954be282a86b4411e23f))

### BREAKING CHANGES

* **packages:** project has been almost entirely rewritten; please check latest documentation

## [0.13.1](https://github.com/rafamel/riseup/compare/v0.12.0...v0.13.1) (2021-09-28)

**Note:** Version bump only for package @riseup/next

# [0.12.0](https://github.com/rafamel/riseup/compare/v0.11.0...v0.12.0) (2021-09-16)

**Note:** Version bump only for package @riseup/next

# [0.11.0](https://github.com/rafamel/riseup/compare/v0.10.0...v0.11.0) (2021-09-15)

**Note:** Version bump only for package @riseup/next

# [0.10.0](https://github.com/rafamel/riseup/compare/v0.9.2...v0.10.0) (2021-09-14)

### Bug Fixes

* **packages:** update dependencies ([fda9969](https://github.com/rafamel/riseup/commit/fda9969aaf64671eccaea5916f80eaa8867dc9e0))

## [0.9.2](https://github.com/rafamel/riseup/compare/v0.9.1...v0.9.2) (2021-06-30)

**Note:** Version bump only for package @riseup/next

## [0.9.1](https://github.com/rafamel/riseup/compare/v0.9.0...v0.9.1) (2021-06-28)

### Bug Fixes

* **packages:** update dependencies ([d8fabf9](https://github.com/rafamel/riseup/commit/d8fabf9d8cfb5180ecba281c3ac1194268dda2e8))

# [0.9.0](https://github.com/rafamel/riseup/compare/v0.8.0...v0.9.0) (2021-06-22)

### Bug Fixes

* **packages/next:** resolve public task result path relative to dest ([8b0fbd4](https://github.com/rafamel/riseup/commit/8b0fbd468ad81806c6c3dba83da6494805007ab7))

### Features

* **packages/next:** add fonts download capabilities to public task ([f6431d8](https://github.com/rafamel/riseup/commit/f6431d8357d218eaa8e0caec81965a89e71784ac))

# [0.8.0](https://github.com/rafamel/riseup/compare/v0.7.0...v0.8.0) (2021-06-20)

### Bug Fixes

* **packages/next:** disable next forceful write of next-env.d.ts ([99af30e](https://github.com/rafamel/riseup/commit/99af30e2901565a26ab52cb421d1e8b48efc38a5))
* **packages/next:** fix result.manifest urls for favicons task ([dfe36d2](https://github.com/rafamel/riseup/commit/dfe36d290d3b367208336e273b6cf56b40989d92))
* **packages/next:** rename hydrateExports to hydrateExport ([f2eee8f](https://github.com/rafamel/riseup/commit/f2eee8fb7f1a96701059f80a58b4e3d81cdb7d65))

### Features

* **packages/next:** rename favicons task to public; can copy assets to public folder ([1e65317](https://github.com/rafamel/riseup/commit/1e65317c7415b7b580d1797a9e432e1b3bb8449a))
* **packages/utils:** interceptor sets up an in memory fs; defaults to the filesystem; wider compatibility ([5de75d4](https://github.com/rafamel/riseup/commit/5de75d4d327c18cc8a472d8847895148a451e31e))

# [0.7.0](https://github.com/rafamel/riseup/compare/v0.6.0...v0.7.0) (2021-06-18)

### Bug Fixes

* **packages:** fix next tests for images add more descriptive names for babel stubs ([397c1b0](https://github.com/rafamel/riseup/commit/397c1b09b4c29f2d2d4be05ec8063931f4657980))
* **packages:** update dependencies ([f92c5a9](https://github.com/rafamel/riseup/commit/f92c5a98cc97f463f21001b62ff4a02c012aa563))
* **packages/next:** build task passes --no-lint by default ([695fb09](https://github.com/rafamel/riseup/commit/695fb094780e240b09e258e1dc761c1ede7e7652))
* **packages/next:** fix analyze task ([e286e7b](https://github.com/rafamel/riseup/commit/e286e7bfa92e1f93605e528d73fe59dec48b2436))
* **packages/next:** fix and add dir option to size task ([d2747bd](https://github.com/rafamel/riseup/commit/d2747bd642aafbfb553d2e1aa33f4b9605f5cb8c))
* **packages/next:** next related tasks can receive arguments ([e517a40](https://github.com/rafamel/riseup/commit/e517a40999628a459d8404814867562d65224a1f))

### Features

* **packages:** replace react pacakge by next package ([eb8052b](https://github.com/rafamel/riseup/commit/eb8052b6baee6207cdc192728348b2bebc4cac03))
* **packages/next:** add favicons task ([ea600b3](https://github.com/rafamel/riseup/commit/ea600b3ca3fcb561734d9ef9afd6b4ca5ffb42de))
* **packages/next:** add watch task ([ac55d88](https://github.com/rafamel/riseup/commit/ac55d888faaa122276fbac860789ce7a5da1f881))
* **packages/next:** prevent next default write of next-env.d.ts ([0bbbd59](https://github.com/rafamel/riseup/commit/0bbbd59824858ef838116c800c461eef6064b4de))
* **packages/next:** upgrades next to v11 ([bf7345a](https://github.com/rafamel/riseup/commit/bf7345a9fb2046443bbda124cefb559478229c94))
