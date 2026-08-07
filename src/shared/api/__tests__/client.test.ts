import { afterEach, describe, expect, it, vi } from 'vitest'
import { apiRequest } from '../client'
import { ApiError } from '../types/errors'

describe('apiRequest', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns parsed JSON for successful responses', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ orders: [] }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    )

    await expect(apiRequest<{ orders: unknown[] }>('/api/orders/live')).resolves.toEqual({
      orders: [],
    })
  })

  it('throws ApiError with code and message from error responses', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            code: 'INVALID_TRANSITION',
            message: "Order 1042 is currently 'New' and cannot transition to 'Completed'.",
          }),
          {
            status: 409,
            headers: { 'Content-Type': 'application/json' },
          },
        ),
      ),
    )

    await expect(apiRequest('/api/orders/test/status', { method: 'PATCH' })).rejects.toSatisfy(
      (error: unknown) => {
        expect(error).toBeInstanceOf(ApiError)
        const apiError = error as ApiError
        expect(apiError.status).toBe(409)
        expect(apiError.code).toBe('INVALID_TRANSITION')
        expect(apiError.message).toContain('cannot transition')
        return true
      },
    )
  })
})
