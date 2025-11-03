import { act, renderHook } from '@testing-library/preact'
import { describe, it, expect, beforeEach } from 'vitest'
import {useStore, settings} from '../store'

describe('useStore', () => {

  beforeEach(() => {
    // Resetuj stan sygnału przed każdym testem
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
})
