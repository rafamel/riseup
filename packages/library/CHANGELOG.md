# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.19.0](https://github.com/rafamel/riseup/compare/v0.18.0...v0.19.0) (2022-05-27)


### Bug Fixes

* bump engine to node 18 ([6056bf7](https://github.com/rafamel/riseup/commit/6056bf7513de2f0627222480ea0efaa30dd83528))
* update dependencies ([675ade5](https://github.com/rafamel/riseup/commit/675ade5cc60898765cb1fefdcc56afecb141e31f))


### BREAKING CHANGES

* engine bumped to node 18





# [0.18.0](https://github.com/rafamel/riseup/compare/v0.17.0...v0.18.0) (2022-05-24)


### Bug Fixes

* **packages/library:** exclude node_modules from tarball task working directory copy ([43bbc12](https://github.com/rafamel/riseup/commit/43bbc126ee16969371765f1f845f8514c4cbfa79))
* **packages:** update dependencies ([7f8d067](https://github.com/rafamel/riseup/commit/7f8d067e4842828800231cc8eff390ef6f2922f5))


### Code Refactoring

* **packages:** move tarball task from library to tooling package ([1dbe8ce](https://github.com/rafamel/riseup/commit/1dbe8ce021b9b2b64c8c66ddfe915a4b87ccbc89))


### Features

* **packages/library:** add package.json overrides option to tarball task params ([6dba8cf](https://github.com/rafamel/riseup/commit/6dba8cf6edc700fdc33abdb48fe1cef040d5540a))


### BREAKING CHANGES

* **packages:** the library package no longer provides the tarball task; it is now included in the
tooling package





# [0.17.0](https://github.com/rafamel/riseup/compare/v0.16.0...v0.17.0) (2022-04-04)


### Bug Fixes

* update dependencies ([4892adb](https://github.com/rafamel/riseup/commit/4892adb01f2ce2837bba4a40017fcc076d437620))
* update dependencies ([3d17e1b](https://github.com/rafamel/riseup/commit/3d17e1b70c6a90f4233bff55f2bb5b2f165ab44d))





# [0.16.0](https://github.com/rafamel/riseup/compare/v0.15.0...v0.16.0) (2022-03-24)


### Bug Fixes

* **packages:** fix tags push on release/distribute ([9ca851d](https://github.com/rafamel/riseup/commit/9ca851dd33496031e72bd2c97e349fed6c5cf487))





# [0.15.0](https://github.com/rafamel/riseup/compare/v0.14.0...v0.15.0) (2022-03-22)


### Bug Fixes

* **packages/library,packages/web:** remove dangling dependencies ([40d2918](https://github.com/rafamel/riseup/commit/40d2918f17f02a44cc05e1d1723db21172e5e7cd))
* **packages:** update dependencies ([6b49a4c](https://github.com/rafamel/riseup/commit/6b49a4c17d6c70b0a3974102215923f01929c8ed))


### Features

* **packages:** throw on non serializable configurations ([f7903bc](https://github.com/rafamel/riseup/commit/f7903bc87e0931e3d9d71f04b185479fd7d07a5d))





# [0.14.0](https://github.com/rafamel/riseup/compare/v0.13.1...v0.14.0) (2022-03-16)


### Features

* **packages:** project redesign and rewrite ([28e03c9](https://github.com/rafamel/riseup/commit/28e03c9ba72dcbd4388a954be282a86b4411e23f))


### BREAKING CHANGES

* **packages:** project has been almost entirely rewritten; please check latest documentation





## [0.13.1](https://github.com/rafamel/riseup/compare/v0.12.0...v0.13.1) (2021-09-28)

**Note:** Version bump only for package @riseup/library





# [0.12.0](https://github.com/rafamel/riseup/compare/v0.11.0...v0.12.0) (2021-09-16)


### Bug Fixes

* **packages/library:** tarball task w/ monorepo resolution doesn't error when there are no local dependencies ([b14021d](https://github.com/rafamel/riseup/commit/b14021d1db4dcb5b67ced3b53b609d1c6299bcbd))


### Features

* **packages/library:** improve error descriptiveness for monorepo resolution ([48cc7d1](https://github.com/rafamel/riseup/commit/48cc7d1f6c39edcbb219d772e9f9889a36c53d5d))





# [0.11.0](https://github.com/rafamel/riseup/compare/v0.10.0...v0.11.0) (2021-09-15)


### Features

* **packages/library:** consolidate build destination directory option in output global option ([a15b3ed](https://github.com/rafamel/riseup/commit/a15b3edcf71536eb4e1130825f48a1e792831f9c))
* **packages/library:** separate tarball/pack task from build; add monorepo dependency resolution/inclusion ([d0381f8](https://github.com/rafamel/riseup/commit/d0381f8453b8a393488b4cfe28197ae154703503))





# [0.10.0](https://github.com/rafamel/riseup/compare/v0.9.2...v0.10.0) (2021-09-14)


### Bug Fixes

* **packages:** update dependencies ([fda9969](https://github.com/rafamel/riseup/commit/fda9969aaf64671eccaea5916f80eaa8867dc9e0))





## [0.9.2](https://github.com/rafamel/riseup/compare/v0.9.1...v0.9.2) (2021-06-30)

**Note:** Version bump only for package @riseup/library





## [0.9.1](https://github.com/rafamel/riseup/compare/v0.9.0...v0.9.1) (2021-06-28)


### Bug Fixes

* **packages:** update dependencies ([d8fabf9](https://github.com/rafamel/riseup/commit/d8fabf9d8cfb5180ecba281c3ac1194268dda2e8))





# [0.9.0](https://github.com/rafamel/riseup/compare/v0.8.0...v0.9.0) (2021-06-22)

**Note:** Version bump only for package @riseup/library





# [0.8.0](https://github.com/rafamel/riseup/compare/v0.7.0...v0.8.0) (2021-06-20)


### Bug Fixes

* **packages/library:** docs task intercepts typedoc configuration file for proper path resolution ([23939f3](https://github.com/rafamel/riseup/commit/23939f3e14b0270037267b67489c73ecde52bf18))
* **packages/library:** fixes typedoc options relative paths ([11fc8e1](https://github.com/rafamel/riseup/commit/11fc8e1aa15f4bd79d7e03cd879d977f23cfda47))
* **packages/library:** reconfigure babel on transpile even for configuration override files ([4aeb828](https://github.com/rafamel/riseup/commit/4aeb828669aa384449df7a2192b84df2b7e7f776))


### Features

* **packages/utils:** interceptor sets up an in memory fs; defaults to the filesystem; wider compatibility ([5de75d4](https://github.com/rafamel/riseup/commit/5de75d4d327c18cc8a472d8847895148a451e31e))
* **packages/utils:** rename tmpTask to temporal; files are overriden by existing files ([f5e389b](https://github.com/rafamel/riseup/commit/f5e389b497e941c2352c715ac0eeec96c8b03876))





# [0.7.0](https://github.com/rafamel/riseup/compare/v0.6.0...v0.7.0) (2021-06-18)


### Bug Fixes

* **packages:** update dependencies ([f92c5a9](https://github.com/rafamel/riseup/commit/f92c5a98cc97f463f21001b62ff4a02c012aa563))


### Features

* **packages/library:** log push progress separately for distribute task ([c8d2942](https://github.com/rafamel/riseup/commit/c8d2942eeac8fcbf179128a26222c20a7757ce39))





# [0.6.0](https://github.com/rafamel/riseup/compare/v0.5.0...v0.6.0) (2021-06-13)


### Bug Fixes

* **deps:** update dependencies ([093f636](https://github.com/rafamel/riseup/commit/093f6369aa90d2f9d22e4b9f16121bf7141abd61))
* **deps:** update dependencies ([43a2692](https://github.com/rafamel/riseup/commit/43a2692fc36e278d1adc952a01c264cf02c8995c))
* **deps:** update kpo ([b8b9b66](https://github.com/rafamel/riseup/commit/b8b9b66aed7fe8e113fe8047e3528df1515853dc))
* **deps:** update kpo to v0.20.0 ([27fb782](https://github.com/rafamel/riseup/commit/27fb7827a67ba2e8c3bcc0ad9c517774faaa1cf3))
* **deps:** update type-core ([4633acf](https://github.com/rafamel/riseup/commit/4633acf1fc9eec966f1a4d402e1b9cee1a0c0bab))
* **packages:** does not use babel transform mappers for actual builds ([e373ec1](https://github.com/rafamel/riseup/commit/e373ec1a14cb4cd2d5c8d9795772f9c718fbfc01))
* **packages:** resolve bins from origin package ([ee63ed3](https://github.com/rafamel/riseup/commit/ee63ed30eb79d915481a56844bdf0f8a1549bb3d))
* **packages:** update dependencies ([17e8b0b](https://github.com/rafamel/riseup/commit/17e8b0be83bb857e038b8298b5bd5e584c4f5bba))
* **packages:** update dependencies ([f520850](https://github.com/rafamel/riseup/commit/f520850d78b7889d3bf1b2020973430b6c914ccd))
* **packages/library:** fix build on windows ([dec91b2](https://github.com/rafamel/riseup/commit/dec91b24d193a5f792e0f8c629470d246ffa9585))
* **packages/library:** fix releseit dependency ([ea9db21](https://github.com/rafamel/riseup/commit/ea9db2161bd9402480d15dec19080eff5771ef4c))


### Features

* **pacakges:** add context to reconfigure callbacks ([acf6383](https://github.com/rafamel/riseup/commit/acf638387cf02ac00d5d394d7da5933d48477779))
* **packages:** call reconfigure functions on demand; add hydrate functions ([bd2ff9a](https://github.com/rafamel/riseup/commit/bd2ff9ac59b8f1ab7becb4daa67c7528417071ab))
* **packages:** remove transpile as a separate task from tooling; transpile on library build ([46d41bd](https://github.com/rafamel/riseup/commit/46d41bd8660bf111126170c1846eb87bf8f30e37))
* **packages:** use jest for tests instead of ava ([77bbd4e](https://github.com/rafamel/riseup/commit/77bbd4e4df4d96109d6a4bd0cb6cd4b82cefc97e))
* **packages/library:** add build task ([d123fdc](https://github.com/rafamel/riseup/commit/d123fdc018eee34fc111f62482c97a62befd7bde))
* **packages/library:** add configurePika ([285a485](https://github.com/rafamel/riseup/commit/285a485cbd36cca08bbd6a6ab46a47bcef263033))
* **packages/library:** add configureTypedoc ([967fb99](https://github.com/rafamel/riseup/commit/967fb99646ea72fe30c8a16ec24a4e1bedac0cf3))
* **packages/library:** add distribute task ([4fdee41](https://github.com/rafamel/riseup/commit/4fdee410ebb94894a9cb31f47dbb209335303f63))
* **packages/library:** add docs task ([821c43c](https://github.com/rafamel/riseup/commit/821c43c2f26b96c3f501bac02cd9dd87fb519c9c))
* **packages/library:** add main library set up function ([6957b26](https://github.com/rafamel/riseup/commit/6957b26e0a74bb1268ebe98b39839a8285572214))
* **packages/library:** adds nodev and manifest options to pika configuration ([3c679ac](https://github.com/rafamel/riseup/commit/3c679ac0f27fb2697fedb32b3600c188abd71b90))
* **packages/tooling:** add formatting checks on lint task ([5f497f7](https://github.com/rafamel/riseup/commit/5f497f773e6ca1427726349a22cf642c4ccc7928))
* **packages/tooling:** allow for granular babel reconfiguration ([214dd5a](https://github.com/rafamel/riseup/commit/214dd5a19cc366625a08b35c9274c24550f17d52))
* **packages/tooling:** use ava instead of jest for test; add coverage task w/ nyc ([e3fc15c](https://github.com/rafamel/riseup/commit/e3fc15c14f10831dcacbbfa6c8d610b1c98f28c7))
* **packages/tooling:** use different typescript include configurations per task ([4ad8341](https://github.com/rafamel/riseup/commit/4ad834189b3317a7ee4bce8ac1564fb37ad158c5))
* **packages/universal:** replace changelog and semantic tasks for release task; add configureReleaseit ([e1e91ca](https://github.com/rafamel/riseup/commit/e1e91ca489fa5bda9ce42bb31ba2799c631420d0))
* **packages/utils:** take file extension on tmpTask ([19f14d9](https://github.com/rafamel/riseup/commit/19f14d957fe24de22f0078bf0abf72b536fc0105))





# [0.5.0](https://github.com/rafamel/riseup/compare/v0.4.0...v0.5.0) (2019-11-01)


### Bug Fixes

* **deps:** updates dependencies ([23a20b5](https://github.com/rafamel/riseup/commit/23a20b597feea8e75c7c87e9e51f6863be075da5))


### Features

* sets engine as and transpiles for node 12 ([d14174d](https://github.com/rafamel/riseup/commit/d14174d9d1fc890cc4fb68c9bf04c3a84a38c2ed))





# [0.4.0](https://github.com/rafamel/riseup/compare/v0.3.0...v0.4.0) (2019-09-12)

**Note:** Version bump only for package @riseup/library





# [0.3.0](https://github.com/rafamel/riseup/compare/v0.2.0...v0.3.0) (2019-09-12)


### Bug Fixes

* **deps:** updates dependencies ([baba8f6](https://github.com/rafamel/riseup/commit/baba8f6))
* **packages:** updates dependencies ([ca2285b](https://github.com/rafamel/riseup/commit/ca2285b))


### Features

* **packages:** removes commit check; renames pre-commit to verify; establishes difference between v ([f68cf75](https://github.com/rafamel/riseup/commit/f68cf75))
* **packages/library:** depends on babel, eslint, jest, and prettier ([0f57838](https://github.com/rafamel/riseup/commit/0f57838))





# [0.2.0](https://github.com/rafamel/riseup/compare/v0.1.0...v0.2.0) (2019-08-04)

**Note:** Version bump only for package @riseup/library





# [0.1.0](https://github.com/rafamel/riseup/compare/v0.0.2...v0.1.0) (2019-08-04)


### Bug Fixes

* **deps:** updates dependencies ([f06ef87](https://github.com/rafamel/riseup/commit/f06ef87))
* changes precommit script name to pre-commit to avoid husky double runs ([bc9b754](https://github.com/rafamel/riseup/commit/bc9b754))





## [0.0.2](https://github.com/rafamel/riseup/compare/v0.0.1...v0.0.2) (2019-07-02)


### Bug Fixes

* updates dependencies ([1a54aed](https://github.com/rafamel/riseup/commit/1a54aed))
* **packages/library:** fixes babel esnext transpile on build:pack script ([3ca1260](https://github.com/rafamel/riseup/commit/3ca1260))
