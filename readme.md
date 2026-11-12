![Asciimoji Logo](./assets/logoblack.png)

## An iOS & Android app for copying ascii emoji to paste anywhere.

[Get it on the iOS App Store](https://itunes.apple.com/app/apple-store/id1461670485?mt=8)

## Development

Built with [Expo](https://expo.dev) SDK 58, React Native and Expo Router. Requires Node 22 or newer.

```bash
npm ci
npx expo start        # press w for web, a for Android
npm run lint
npm run typecheck
npm test
```

Routes live in `src/app`, the emoji list in `src/data/emoji.ts`.
