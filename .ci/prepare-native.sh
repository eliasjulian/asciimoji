#!/bin/sh
# Installs the Exact checkout and the iOS Rust target on an EAS worker.
# Bun, git, curl and unzip come from the build image.
set -eu
export EXACT="$PWD/../exact"
git clone https://github.com/expo/exact.git "$EXACT"
git -C "$EXACT" checkout --detach "$EXACT_REF"
bun install --frozen-lockfile --cwd "$EXACT"
if ! command -v rustup >/dev/null; then
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs -o /tmp/exact-rustup.sh
  sh /tmp/exact-rustup.sh -y --profile minimal --default-toolchain none --no-modify-path
fi
export PATH="${CARGO_HOME:-$HOME/.cargo}/bin:$PATH"
pin=$(bun -e 'console.log(Bun.TOML.parse(await Bun.file(process.env.EXACT + "/rust-toolchain.toml").text()).toolchain.channel)')
case "$1" in
  ios) triple=aarch64-apple-ios ;;
  android) triple=aarch64-linux-android ;;
  *) exit 2 ;;
esac
rustup toolchain install "$pin" --profile minimal --target "$triple"
cargo +"$pin" run --locked --manifest-path "$EXACT/vendor/ibex/crates/hermes-lean-sys-installer/Cargo.toml" -- --target "$triple"
cargo +"$pin" fetch --locked --manifest-path "$EXACT/Cargo.toml"
set-env EXACT "$EXACT"
set-env PATH "$PATH"
