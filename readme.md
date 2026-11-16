# Asciimoji

A grid of ASCII emoji. Tap one to copy it, then paste it anywhere.

[Get it on the iOS App Store](https://itunes.apple.com/app/apple-store/id1461670485?mt=8)

## Development

The app is an [Exact](https://github.com/expo/exact) program. Exact is pre-1.0 and changes daily, so this repo does not vendor a checkout. Clone Exact and point `EXACT` at it (`exact.mjs` also looks for `EXACT2`, then a checkout at `../../exact`).

```bash
export EXACT=/path/to/exact
bun exact.mjs web        # dev server
bun exact.mjs test web   # app.test.contract
bun exact.mjs verify     # the tests, then a second launch
```

`app.contract` is the view, `app.ts` is the emoji list, `app.test.contract` is the tests, and `app.json` is the manifest. The bundle id is `com.eliasjulian.asciimoji`.

`host.ios` and `host.android` are named. `bun exact.mjs ios --run` builds for the iOS simulator, and `bun exact.mjs android` builds the Android host. The Android host is early.

The page in `site/` is what Render publishes for asciimoji.app.
