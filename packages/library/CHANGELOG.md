# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
