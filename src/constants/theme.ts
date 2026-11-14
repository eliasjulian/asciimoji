import { useColorScheme } from 'react-native';

const dark = {
  background: '#000000',
  cell: '#1F1F1F',
  cellPressed: '#333333',
  text: '#FFFFFF',
  muted: '#545454',
} as const;

const light = {
  background: '#FFFFFF',
  cell: '#F2F2F2',
  cellPressed: '#DEDEDE',
  text: '#000000',
  muted: '#545454',
} as const;

export const Palettes = { light, dark };

export type ColorScheme = keyof typeof Palettes;

export type Palette = (typeof Palettes)[ColorScheme];

// A missing scheme happens before native appearance is ready. Expo treats that as light.
export function paletteFor(scheme: ColorScheme | null | undefined): Palette {
  return scheme === 'dark' ? Palettes.dark : Palettes.light;
}

export function usePalette(): Palette {
  return paletteFor(useColorScheme());
}
