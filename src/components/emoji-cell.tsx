import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors } from '@/constants/theme';

type Props = {
  emoji: string;
  width: number;
  onPress: (emoji: string) => void;
};

export function EmojiCell({ emoji, width, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityHint="Copies this emoji"
      onPress={() => onPress(emoji)}
      style={({ pressed }) => [styles.cell, { width }, pressed && styles.pressed]}>
      <Text style={styles.text} numberOfLines={1} adjustsFontSizeToFit>
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
    backgroundColor: Colors.cell,
  },
  pressed: {
    backgroundColor: Colors.cellPressed,
  },
  text: {
    fontSize: 18,
    color: Colors.text,
  },
});
