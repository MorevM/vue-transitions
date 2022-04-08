

## [2.0.0](https://github.com/MorevM/vue-transitions/compare/v1.1.0...v2.0.0) (2022-04-08)


### ⚠ BREAKING CHANGES

* Build mechanics have changed significantly with the introduction of the version for Vue 3.
Although there shouldn't be any problems (the default export should work the same as before), the update is marked as a major to avoid embarrassment.

### Features

* Vue 3 version of components ([c094554](https://github.com/MorevM/vue-transitions/commit/c094554797d3025c9a3f6da2e0ae0ae303d396de))


### Documentation

* Correct playground config `base` to fit GH pages ([98ff165](https://github.com/MorevM/vue-transitions/commit/98ff1654392d856bd4f6ee76c526a8780a15fa32))
* Fix playground `offset` control ([0a3e3dd](https://github.com/MorevM/vue-transitions/commit/0a3e3ddf1055657760a16ddee712da5e27570083))
* Update `README.md` ([230be83](https://github.com/MorevM/vue-transitions/commit/230be83c2edaabbf1348756b9ff6fecc06750d87))


### Tests

* Rename `validators` directory ([fb61dfe](https://github.com/MorevM/vue-transitions/commit/fb61dfe3cfea45bc450234b526a41aef552fde91))


### Chores

* bump release-it from 14.13.1 to 14.14.0 ([#11](https://github.com/MorevM/vue-transitions/issues/11)) ([ed9295d](https://github.com/MorevM/vue-transitions/commit/ed9295d12626d38d3e54ee30ef32f95226a6093d))
* bump sass from 1.49.9 to 1.49.11 ([#12](https://github.com/MorevM/vue-transitions/issues/12)) ([721ee2a](https://github.com/MorevM/vue-transitions/commit/721ee2af3b122fec6765db1a248d84ba076737cb))
* bump vite from 2.8.6 to 2.9.1 ([#10](https://github.com/MorevM/vue-transitions/issues/10)) ([7419f16](https://github.com/MorevM/vue-transitions/commit/7419f166695f152d621aa2346da37a7f0c2646ef))
* **vscode:** Add setting to validate `json` files ([9f7c13c](https://github.com/MorevM/vue-transitions/commit/9f7c13cf074368c2b23c2accc9b9ea3f37029d3b))## [1.1.0](https://github.com/MorevM/vue-transitions/compare/v1.0.0...v1.1.0) (2022-03-27)


### Features

* Playground is done ([91715de](https://github.com/MorevM/vue-transitions/commit/91715dea3e7f64240f33705f1f642bab09a13231))
* Respect the existing element opacity during expand ([496a17c](https://github.com/MorevM/vue-transitions/commit/496a17c9183a53d90ea967b39049c4f98ddb824e))


### Refactoring

* More safe `setMoveDuration` ([e7f2028](https://github.com/MorevM/vue-transitions/commit/e7f2028e57b617c6699f2508b54fac3e004fd6d2))


### Bug fixes

* Add `transform` transition-property to `expand` transition ([cbb94f1](https://github.com/MorevM/vue-transitions/commit/cbb94f1f84ab72a6e4c35be4ec115f369f899a73))
* Correct order of style actions, refactoring the code ([355bffe](https://github.com/MorevM/vue-transitions/commit/355bffe533f45af00fb7100de048740b0196803a))
* Correct work with percentage value in `transition-slide` ([bb821aa](https://github.com/MorevM/vue-transitions/commit/bb821aae7dce3b32224e9b79bfb9b3d4f3104417))
* Set `important` flag to all style transformations ([368c139](https://github.com/MorevM/vue-transitions/commit/368c139c813f67838306d18063f65b0f3fecf19d))


### CI improvements

* Add playground publish to GH pages ([27b0927](https://github.com/MorevM/vue-transitions/commit/27b09274c0dd9e3f0a59b3c54427adfeed510519))


### Chores

* Add `dependabot` ([f9b59a9](https://github.com/MorevM/vue-transitions/commit/f9b59a93ada5b6439fe7fd78d7dead07037e37c2))
* bump @morev/commitlint-config from 0.1.0 to 0.1.1 ([#5](https://github.com/MorevM/vue-transitions/issues/5)) ([9d03fc5](https://github.com/MorevM/vue-transitions/commit/9d03fc5eb80bfb84205214ba568bf44983fccc3b))
* bump @morev/eslint-config from 10.0.2 to 10.0.3 ([#2](https://github.com/MorevM/vue-transitions/issues/2)) ([ccf2108](https://github.com/MorevM/vue-transitions/commit/ccf21087da7b61663b9ab1602cfc0be60c1b2929))
* bump @morev/helpers from 0.8.0 to 0.8.1 ([#3](https://github.com/MorevM/vue-transitions/issues/3)) ([1d08a8d](https://github.com/MorevM/vue-transitions/commit/1d08a8dd62da2a6fcf75f2db7d62aae6d3bc00c2))
* bump @morev/stylelint-config from 1.0.2 to 1.0.3 ([#9](https://github.com/MorevM/vue-transitions/issues/9)) ([a0e6226](https://github.com/MorevM/vue-transitions/commit/a0e6226aeb378659f69b17a0db2ef9d85afc625f))
* bump @morev/v-bem-transformer from 0.0.4 to 0.0.5 ([#7](https://github.com/MorevM/vue-transitions/issues/7)) ([e0b96b4](https://github.com/MorevM/vue-transitions/commit/e0b96b4196f295030efeb17c722456c9bc07d6d0))
* bump eslint from 8.11.0 to 8.12.0 ([#8](https://github.com/MorevM/vue-transitions/issues/8)) ([f3f95a3](https://github.com/MorevM/vue-transitions/commit/f3f95a3fc144abf45f544bcfc352937761c2591b))
* bump more-sass from 1.0.5 to 1.0.7 ([#6](https://github.com/MorevM/vue-transitions/issues/6)) ([b2f6422](https://github.com/MorevM/vue-transitions/commit/b2f64223baa3dfdb5f45f9b524b98e28f1b33a03))
* Separate Vite configs to make the playground ([d87703d](https://github.com/MorevM/vue-transitions/commit/d87703d3d854ec8407e39c33dd40f1804194fb47))
* Update `release-it` config to fit new `scripts` section ([96e32c4](https://github.com/MorevM/vue-transitions/commit/96e32c4d1794cfef38a649a0c0469fa53c8c0a8b))
* Update linters to skip playground lint ([267a0a4](https://github.com/MorevM/vue-transitions/commit/267a0a40b9a7dd3e6b6ac80cceaab3721f929283))
* Update VSCode project settings ([a437e6e](https://github.com/MorevM/vue-transitions/commit/a437e6e8dd4f4b2492e15b7166971be5389a5b43))## [1.0.0](https://github.com/MorevM/vue-transitions/compare/v0.0.2...v1.0.0) (2022-03-25)

⚠ BREAKING CHANGES:
* Prop `move-disable` was renamed to `no-disable`

### Features

* Add 'opacity' option ([dab173b](https://github.com/MorevM/vue-transitions/commit/dab173b437ddb977418b50b76404c3c5714983d5))
* Add 'scale' option for 'transition-scale' ([79ad99f](https://github.com/MorevM/vue-transitions/commit/79ad99f8be49d2423def31ec915f24694dc96fec))
* Add 'scale' option in playground ([71fc67a](https://github.com/MorevM/vue-transitions/commit/71fc67ab1997c9a7f9294d60c322722d1cdf0b42))
* Add VS Code settings ([6924927](https://github.com/MorevM/vue-transitions/commit/6924927ceddbb97457fcfbbceca75b4c361fa9bb))


### Documentation

* Appropriate changes ([43d6c96](https://github.com/MorevM/vue-transitions/commit/43d6c96a906eead6f7d5767d4ff5b8ddf342d2b3))


### Refactoring

* Change the 'move-disable' option to 'no-move' ([1740328](https://github.com/MorevM/vue-transitions/commit/1740328237e300c12b20aa442c53015ebd7a709f))
* Change the 'opacity' option to 'no-opacity' ([ec58daa](https://github.com/MorevM/vue-transitions/commit/ec58daab81d97f1e79d97f8c1bd31079517f5bc4))


### Bug fixes

* Add markdown files to lint-staged settings ([8cb7713](https://github.com/MorevM/vue-transitions/commit/8cb7713892c5135bb45983eaca1b6c9fdcd5c8a8))


### Chores

* Deps update ([88f50eb](https://github.com/MorevM/vue-transitions/commit/88f50eb192582cf8e62111be966290d9b77b730f))
* Update linters + appropriate fixes ([0bce6dd](https://github.com/MorevM/vue-transitions/commit/0bce6dd2232cb2def2619fb001777af9f60faa13))### [0.0.2](https://github.com/MorevM/vue-transitions/compare/v0.0.1...v0.0.2) (2022-03-18)


### Bug fixes

* Add CSS file exports ([1a1dc50](https://github.com/MorevM/vue-transitions/commit/1a1dc50ff1dd31f8043002864bbe5224b31019ef))
* Correct initial transform of `transition-slide` ([141e1e5](https://github.com/MorevM/vue-transitions/commit/141e1e5fa0a3414dd47132bd381ca3837058c88d))### 0.0.1 (2022-03-18)