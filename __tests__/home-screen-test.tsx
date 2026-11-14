import * as Clipboard from 'expo-clipboard';
import { act, fireEvent, renderRouter, screen } from 'expo-router/testing-library';
import { processColor, StyleSheet } from 'react-native';

import { Palettes, paletteFor } from '@/constants/theme';
import { EMOJI } from '@/data/emoji';

const colorScheme: { current: 'light' | 'dark' | null } = { current: 'light' };

jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  __esModule: true,
  default: () => colorScheme.current,
}));

jest.mock('expo-clipboard', () => ({
  setStringAsync: jest.fn().mockResolvedValue(true),
}));

const SHRUG = EMOJI[0];

describe('Asciimoji', () => {
  beforeEach(() => {
    colorScheme.current = 'light';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('picks the light palette unless the system is dark', () => {
    expect(paletteFor('light')).toBe(Palettes.light);
    expect(paletteFor(null)).toBe(Palettes.light);
    expect(paletteFor(undefined)).toBe(Palettes.light);
    expect(paletteFor('dark')).toBe(Palettes.dark);
  });

  it('ships every emoji exactly once', () => {
    expect(EMOJI).toHaveLength(60);
    expect(new Set(EMOJI).size).toBe(EMOJI.length);
    expect(SHRUG).toBe('¯＼_(ツ)_／¯');
  });

  it('copies the tapped emoji and confirms it, then clears the confirmation', async () => {
    await renderRouter('./src/app');

    await fireEvent.press(screen.getByText(SHRUG));

    expect(Clipboard.setStringAsync).toHaveBeenCalledTimes(1);
    expect(Clipboard.setStringAsync).toHaveBeenCalledWith(SHRUG);
    expect(await screen.findByText(`Boom, copied. ${SHRUG}`)).toBeOnTheScreen();

    // renderRouter installs Jest fake timers itself, so time only moves when advanced here.
    await act(async () => {
      jest.advanceTimersByTime(3999);
    });
    expect(screen.getByText(`Boom, copied. ${SHRUG}`)).toBeOnTheScreen();

    await act(async () => {
      jest.advanceTimersByTime(1);
    });
    expect(screen.queryByText(`Boom, copied. ${SHRUG}`)).toBeNull();
  });

  it('opens the menu and closes it back to the grid', async () => {
    await renderRouter('./src/app');
    expect(screen).toHavePathname('/');

    await fireEvent.press(screen.getByLabelText('Open menu'));
    expect(screen).toHavePathname('/menu');
    expect(screen.getByText('1 – tap to copy')).toBeOnTheScreen();

    await fireEvent.press(screen.getByLabelText('Close menu'));
    expect(screen).toHavePathname('/');
  });

  it('paints the grid and menu in the system light scheme', async () => {
    await renderRouter('./src/app');

    expect(textColor('Tap to copy, paste anywhere.')).toBe(Palettes.light.text);
    expect(textColor(SHRUG)).toBe(Palettes.light.text);
    expectTint(Palettes.light.text);

    await fireEvent.press(screen.getByLabelText('Open menu'));
    expect(textColor('1 – tap to copy')).toBe(Palettes.light.text);
    expectTint(Palettes.light.text);
  });

  it('paints the grid and menu in the system dark scheme', async () => {
    colorScheme.current = 'dark';
    await renderRouter('./src/app');

    expect(textColor('Tap to copy, paste anywhere.')).toBe(Palettes.dark.text);
    expect(textColor(SHRUG)).toBe(Palettes.dark.text);
    expectTint(Palettes.dark.text);

    await fireEvent.press(screen.getByLabelText('Open menu'));
    expect(textColor('1 – tap to copy')).toBe(Palettes.dark.text);
    expectTint(Palettes.dark.text);
  });

  it('falls back to the grid when the menu is opened with no history', async () => {
    await renderRouter('./src/app', { initialUrl: '/menu' });
    expect(screen).toHavePathname('/menu');

    await fireEvent.press(screen.getByLabelText('Close menu'));
    expect(screen).toHavePathname('/');
  });
});

function textColor(label: string) {
  return StyleSheet.flatten(screen.getByText(label).props.style).color;
}

function expectTint(color: string) {
  const processed = processColor(color);
  for (const node of screen.getAllByLabelText('Asciimoji')) {
    expect(node.props.tintColor).toBe(processed);
  }
}
