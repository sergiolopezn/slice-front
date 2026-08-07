import { ApiError, type ErrorResponse } from './types/errors'

export function getBaseUrl(): string {
  const configured = import.meta.env.VITE_API_BASE_URL
  return configured && configured.length > 0 ? configured : 'http://localhost:7071'
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers)

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${getBaseUrl()}${path}`, {
    ...options,
    headers,
  })

  if (!response.ok) {
    let code = 'UNKNOWN_ERROR'
    let message = response.statusText

    try {
      const body = (await response.json()) as Partial<ErrorResponse>
      if (body.code) code = body.code
      if (body.message) message = body.message
    } catch {
      // Non-JSON error body — keep statusText
    }

    throw new ApiError(response.status, code, message)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}
