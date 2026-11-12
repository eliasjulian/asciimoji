#!/usr/bin/env bash
# Boots the "asciimoji" Android Virtual Device if it is not already running and
# returns once Android has finished booting. Safe to run repeatedly.
set -euo pipefail

export ANDROID_HOME="${ANDROID_HOME:-$HOME/Android/Sdk}"
ADB="$ANDROID_HOME/platform-tools/adb"
LOG="${TMPDIR:-/tmp}/android-emulator.log"

if ! "$ADB" devices | grep -q '^emulator-'; then
  if [ -e /dev/kvm ] && [ ! -w /dev/kvm ]; then
    sudo chmod o+rw /dev/kvm
  fi
  # Software rendering: cloud VMs have no GPU. DISPLAY=:1 puts the window on the VM desktop.
  DISPLAY="${DISPLAY:-:1}" nohup "$ANDROID_HOME/emulator/emulator" -avd asciimoji \
    -gpu swiftshader_indirect -no-snapshot -no-audio -no-boot-anim >"$LOG" 2>&1 &
  echo "Starting emulator (log: $LOG)"
fi

"$ADB" wait-for-device
until [ "$("$ADB" shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" = "1" ]; do
  sleep 2
done
echo "Android emulator ready: $("$ADB" devices | sed -n 2p)"
