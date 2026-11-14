import { Pressable, StyleSheet, Text } from 'react-native';

import { usePalette } from '@/constants/theme';

type Props = {
  emoji: string;
  width: number;
  onPress: (emoji: string) => void;
};

export function EmojiCell({ emoji, width, onPress }: Props) {
  const colors = usePalette();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityHint="Copies this emoji"
      onPress={() => onPress(emoji)}
      style={({ pressed }) => [
        styles.cell,
        { width, backgroundColor: pressed ? colors.cellPressed : colors.cell },
      ]}>
      <Text style={[styles.text, { color: colors.text }]} numberOfLines={1} adjustsFontSizeToFit>
        {emoji}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    height: 125,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
  },
});
