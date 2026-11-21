// Expo reads this. Exact keeps reading app.json. The two stay separate so
// EAS never merges Exact's manifest into an Expo config.
module.exports = {
  name: 'Asciimoji',
  slug: 'asciimoji-app',
  owner: 'eliasismyalias',
  version: '2.1.0',
  ios: {
    bundleIdentifier: 'com.eliasjulian.asciimoji',
    infoPlist: { ITSAppUsesNonExemptEncryption: false },
  },
  android: { package: 'com.eliasjulian.asciimoji' },
  extra: { eas: { projectId: '33702770-6902-11e9-a0b3-2bd5d9d73a6e' } },
};
