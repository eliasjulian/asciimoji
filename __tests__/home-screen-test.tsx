import * as Clipboard from 'expo-clipboard';
import { act, fireEvent, renderRouter, screen } from 'expo-router/testing-library';

import { EMOJI } from '@/data/emoji';

jest.mock('expo-clipboard', () => ({
  setStringAsync: jest.fn().mockResolvedValue(true),
}));

const SHRUG = EMOJI[0];

describe('Asciimoji', () => {
  afterEach(() => {
    jest.clearAllMocks();
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

  it('falls back to the grid when the menu is opened with no history', async () => {
    await renderRouter('./src/app', { initialUrl: '/menu' });
    expect(screen).toHavePathname('/menu');

    await fireEvent.press(screen.getByLabelText('Close menu'));
    expect(screen).toHavePathname('/');
  });
});
