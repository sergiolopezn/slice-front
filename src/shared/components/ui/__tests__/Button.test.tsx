import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '../Button'

describe('Button', () => {
  it('invokes click handler when enabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(
      <Button variant="bump" onClick={onClick}>
        BUMP ORDER
      </Button>,
    )

    await user.click(screen.getByRole('button', { name: 'BUMP ORDER' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not invoke click handler when disabled', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()

    render(
      <Button variant="complete" disabled onClick={onClick}>
        COMPLETE
      </Button>,
    )

    const button = screen.getByRole('button', { name: 'COMPLETE' })
    expect(button).toBeDisabled()

    await user.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('applies variant styling classes', () => {
    render(<Button variant="check-temp">CHECK TEMP</Button>)

    const button = screen.getByRole('button', { name: 'CHECK TEMP' })
    expect(button.className).toContain('bg-status-prep-amber')
    expect(button.className).toContain('min-h-12')
  })
})
