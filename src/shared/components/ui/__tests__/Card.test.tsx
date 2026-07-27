import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Card } from '../Card'

describe('Card', () => {
  it('renders children inside the container', () => {
    render(
      <Card>
        <p>Order items</p>
      </Card>,
    )

    expect(screen.getByText('Order items')).toBeInTheDocument()
  })
})
