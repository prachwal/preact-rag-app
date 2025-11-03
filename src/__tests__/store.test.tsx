import { act, renderHook } from '@testing-library/preact'
import { describe, it, expect, beforeEach } from 'vitest'
import {useStore, settings} from '../store'

describe('useStore', () => {

  beforeEach(() => {
    // Resetuj stan sygnału przed każdym testem
    settings.value = { theme: 'dark' };
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useStore())
    expect(result.current.settings.value).toStrictEqual({ theme: 'dark' })
  })

  it('should change the theme', () => {
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.setTheme('light')
    })
    expect(result.current.settings.value).toStrictEqual({ theme: 'light' })
  })

  it('should decrement the count', () => {
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.nextTheme()
    })
    expect(result.current.settings.value).toStrictEqual({ theme: 'light' })
  })
})
