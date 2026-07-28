import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { OrderCardHeader } from '../OrderCardHeader'

describe('OrderCardHeader', () => {
  it('renders rush status with white-on-red styling', () => {
    render(<OrderCardHeader orderNumber="#402" timer="12:06" status="rush" />)

    expect(screen.getByText('#402')).toBeInTheDocument()
    expect(screen.getByText('12:06')).toBeInTheDocument()

    const banner = screen.getByText('#402').closest('div')
    expect(banner?.className).toContain('bg-status-urgent-red')
    expect(banner?.className).toContain('text-white')
    expect(banner?.className).toContain('font-mono')
  })

  it('renders prep status with black-on-amber styling', () => {
    render(<OrderCardHeader orderNumber="#398" timer="08:14" status="prep" />)

    const banner = screen.getByText('#398').closest('div')
    expect(banner?.className).toContain('bg-status-prep-amber')
    expect(banner?.className).toContain('text-black')
  })

  it('renders pending status with muted gray styling', () => {
    render(<OrderCardHeader orderNumber="Pending" timer="—" status="pending" />)

    const banner = screen.getByText('Pending').closest('div')
    expect(banner?.className).toContain('bg-status-idle-gray')
    expect(banner?.className).toContain('text-text-muted')
  })
})
