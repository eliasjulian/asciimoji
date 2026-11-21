<!-- exact:begin (exact new writes this block; bun exact.mjs update rewrites it) -->
# asciimoji: an Exact app

`app.contract` is the view, `app.ts` the data module, `app.test.contract` the tests, `app.json`
the manifest: set `app.name` and `app.id` before building. The app uses Exact at
`../../exact` by path (`EXACT` overrides it).

This file is already in your instructions. Start from the nearest pattern: `bun exact.mjs
pattern` lists them and `pattern <name>` writes one, tested. ../../exact/docs/start-here-site.md (a site) or
../../exact/docs/start-here.md is the only required reading. `bun exact.mjs contract vocab <name>` answers a
name (none: the card); `bun exact.mjs docs <heading words>` a guide's
section. Run `bun exact.mjs verify` when the features work, and `verify ios|android` at the end for a
phone app. When an iPhone app is ready to try, run `bun exact.mjs share` and send its link;
repeat for each change the person should see. `bun exact.mjs help` lists the verbs, including
app.json's `"commands"`.
`bun exact.mjs update` refreshes files. Native verbs (`ios`, `mac`, `linux`, `android`, `windows`)
name their platform in app.json on first use and build in a generated workspace;
`update --without <platform>` stops shipping it.
`bun ../../exact/scripts/exact.mjs setup --check` names what a native build lacks.

Generated, so don't edit: `exact.mjs` and this block.

## Feedback (required)

When a doc was wrong or missing, a workaround was needed, something took several tries or a
command confused you, record it: `bun exact.mjs feedback note "<what happened>"`. It attaches
exact2's commit and the last exit code, never output or code. `bun exact.mjs feedback status` says
whether notes are sent and whether to keep a diary; under `never`, skip all of this.
<!-- exact:end -->

## This repository

Set `EXACT` to a checkout of https://github.com/expo/exact. The path in the generated block is where `exact new` ran, and `bun exact.mjs update` rewrites it.

`app.contract` draws the wordmark, the grid, the copy confirmation, and the short copy-and-paste sheet. `app.ts` answers with the emoji list. The page colours live in `app.forma` (the black and white from the app this replaced). A cell is at least 120px wide, so an iPhone shows three columns. The wordmark is flat on the page.

## Cursor Cloud specific instructions

Cloud agents run on Linux. With `EXACT` set, `bun exact.mjs web` serves the app and `bun exact.mjs test web` runs the contract tests in Chrome (`CHROME` selects the browser). iOS cannot be rendered here. The Android Exact host is early; drive the web host.

TestFlight is an EAS custom build, profile `exact` in `eas.json`. It clones the Exact commit in `EXACT_REF`, archives with `bun exact.mjs ios --device --archive`, and `eas submit` uploads that archive to App Store Connect app `1461670485`. `EXPO_TOKEN` must already be in the environment. Do not print it.
