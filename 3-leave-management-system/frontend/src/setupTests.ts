import '@testing-library/jest-dom'
import { afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

beforeEach(() => {
    vi.unstubAllEnvs()
})
afterEach(() => {
    cleanup()
    vi.clearAllMocks()
})