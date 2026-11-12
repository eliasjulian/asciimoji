import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';

export default function MenuScreen() {
  const router = useRouter();

  // A deep link or a web reload can land here with nothing underneath to go back to.
  const close = () => (router.canGoBack() ? router.back() : router.replace('/'));

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Close menu"
        hitSlop={12}
        onPress={close}
        style={styles.close}>
        <Text style={styles.closeText}>×</Text>
      </Pressable>
      <Text style={styles.head}>1 – tap to copy</Text>
      <Text style={styles.head}>2 – paste anywhere</Text>
      <Image
        source={require('@/assets/asciimoji_mark.svg')}
        style={styles.mark}
        contentFit="contain"
        accessibilityLabel="Asciimoji"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: Colors.background,
  },
  close: {
    alignSelf: 'flex-end',
    marginBottom: 120,
  },
  closeText: {
    color: Colors.muted,
    fontSize: 60,
    lineHeight: 60,
  },
  head: {
    color: Colors.text,
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
