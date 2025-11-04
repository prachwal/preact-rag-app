import { act, renderHook } from '@testing-library/preact'
import { describe, it, expect, beforeEach } from 'vitest'
import { useStore, settings, systemTheme } from '../store'

describe('useStore', () => {

  beforeEach(() => {
    settings.value = { mode: 'dark', variant: 'standard' };
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useStore())
    expect(result.current.settings.value).toStrictEqual({ mode: 'dark', variant: 'standard' })
  })

  it('should change the mode', () => {
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.setMode('light')
    })
    expect(result.current.settings.value).toStrictEqual({ mode: 'light', variant: 'standard' })
  })

  it('should change the variant', () => {
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.setVariant('sepia')
    })
    expect(result.current.settings.value).toStrictEqual({ mode: 'dark', variant: 'sepia' })
  })

  it('should cycle through modes', () => {
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.nextMode()
    })
    expect(result.current.settings.value).toStrictEqual({ mode: 'light', variant: 'standard' })
    act(() => {
      result.current.nextMode()
    })
    expect(result.current.settings.value).toStrictEqual({ mode: 'auto', variant: 'standard' })
    act(() => {
      result.current.nextMode()
    })
    expect(result.current.settings.value).toStrictEqual({ mode: 'dark', variant: 'standard' })
  })

  it('should cycle through variants', () => {
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.nextVariant()
    })
    expect(result.current.settings.value).toStrictEqual({ mode: 'dark', variant: 'sepia' })
    act(() => {
      result.current.nextVariant()
    })
    expect(result.current.settings.value).toStrictEqual({ mode: 'dark', variant: 'forest' })
    act(() => {
      result.current.nextVariant()
    })
    expect(result.current.settings.value).toStrictEqual({ mode: 'dark', variant: 'ocean' })
    act(() => {
      result.current.nextVariant()
    })
    expect(result.current.settings.value).toStrictEqual({ mode: 'dark', variant: 'standard' })
  })

  it('should handle invalid localStorage data gracefully', () => {
    const originalGetItem = Storage.prototype.getItem;
    Storage.prototype.getItem = () => 'invalid-mode';

    const { result } = renderHook(() => useStore());
    expect(result.current.settings.value.mode).toBe('dark');

    Storage.prototype.getItem = originalGetItem;
  });

  it('should handle localStorage quota exceeded', () => {
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = () => {
      throw new Error('QuotaExceededError');
    };

    const { result } = renderHook(() => useStore());
    expect(() => result.current.setMode('light')).not.toThrow();

    Storage.prototype.setItem = originalSetItem;
  });

  it('should update effectiveMode when system theme changes in auto mode', () => {
    const { result } = renderHook(() => useStore());

    // Set mode to auto
    act(() => {
      result.current.setMode('auto');
    });

    // Initially systemTheme is false (light)
    expect(result.current.effectiveMode.value).toBe('light');

    // Change system theme to dark
    act(() => {
      systemTheme.value = true;
    });

    expect(result.current.effectiveMode.value).toBe('dark');
  });
})
