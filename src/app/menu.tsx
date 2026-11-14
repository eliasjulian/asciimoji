import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePalette } from '@/constants/theme';

export default function MenuScreen() {
  const colors = usePalette();
  const router = useRouter();

  // A deep link or a web reload can land here with nothing underneath to go back to.
  const close = () => (router.canGoBack() ? router.back() : router.replace('/'));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close menu"
        hitSlop={12}
        onPress={close}
        style={styles.close}>
        <Text style={[styles.closeText, { color: colors.muted }]}>×</Text>
      </Pressable>
      <Text style={[styles.head, { color: colors.text }]}>1 – tap to copy</Text>
      <Text style={[styles.head, { color: colors.text }]}>2 – paste anywhere</Text>
      <Image
        source={require('@/assets/asciimoji_mark.svg')}
        style={styles.mark}
        contentFit="contain"
        tintColor={colors.text}
        accessibilityLabel="Asciimoji"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  close: {
    alignSelf: 'flex-end',
    marginBottom: 120,
  },
  closeText: {
    fontSize: 60,
    lineHeight: 60,
  },
  head: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 30,
  },
  mark: {
    width: 38,
    height: 37,
    marginTop: 85,
  },
});
