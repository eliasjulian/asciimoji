import * as Clipboard from 'expo-clipboard';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmojiCell } from '@/components/emoji-cell';
import { Colors } from '@/constants/theme';
import { EMOJI } from '@/data/emoji';

const MIN_CELL_WIDTH = 130;
const GAP = 2;
const TOAST_MS = 4000;

// Android 13+ draws its own clipboard preview in the same corner, so ours would sit under it.
const SYSTEM_CONFIRMS_COPY = Platform.OS === 'android' && Platform.Version >= 33;

export default function HomeScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [copied, setCopied] = useState<string | null>(null);

  const gridWidth = width - insets.left - insets.right;
  const columns = Math.max(2, Math.floor((gridWidth + GAP) / (MIN_CELL_WIDTH + GAP)));
  const cellWidth = (gridWidth - GAP * (columns - 1)) / columns;

  useEffect(() => {
    if (copied === null) return undefined;
    const timer = setTimeout(() => setCopied(null), TOAST_MS);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async (emoji: string) => {
    await Clipboard.setStringAsync(emoji);
    if (!SYSTEM_CONFIRMS_COPY) setCopied(emoji);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.navbar}>
        <Image
          source={require('@/assets/logoblack.svg')}
          style={styles.logo}
          contentFit="contain"
          tintColor={Colors.text}
          accessibilityLabel="Asciimoji"
        />
        <Link href="/menu" asChild>
          <Pressable accessibilityRole="button" accessibilityLabel="Open menu" hitSlop={12}>
            <Image
              source={require('@/assets/menuicon.png')}
              style={styles.menuIcon}
              contentFit="contain"
            />
          </Pressable>
        </Link>
      </View>
      <FlatList
        // numColumns cannot change on a mounted FlatList, so remount when the column count does.
        key={columns}
        data={EMOJI}
        numColumns={columns}
        keyExtractor={(item) => item}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => <EmojiCell emoji={item} width={cellWidth} onPress={copy} />}
        ListFooterComponent={
          <View style={[styles.footer, { paddingBottom: insets.bottom + 80 }]}>
            <Text style={styles.footerText}>Tap to copy, paste anywhere.</Text>
            <Text style={styles.footerText}>(｡◕‿‿◕｡)</Text>
          </View>
        }
      />
      {copied !== null && (
        <View
          style={[styles.toast, { bottom: insets.bottom + 24 }]}
          pointerEvents="none"
          accessibilityLiveRegion="polite"
          accessibilityRole="alert">
          <Text style={styles.toastText}>Boom, copied. {copied}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  logo: {
    width: 180,
    height: 35,
  },
  menuIcon: {
    width: 40,
    height: 25,
  },
  grid: {
    gap: GAP,
  },
  row: {
    gap: GAP,
  },
  footer: {
    padding: 25,
    gap: 20,
  },
  footerText: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: '500',
  },
  toast: {
    position: 'absolute',
    left: 20,
    right: 20,
    padding: 16,
    alignItems: 'center',
    backgroundColor: Colors.text,
  },
  toastText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
});
