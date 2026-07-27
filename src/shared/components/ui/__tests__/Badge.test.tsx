import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Badge } from '../Badge'

describe('Badge', () => {
  it.each([
    ['rush', 'RUSH'],
    ['prep', 'PREP'],
    ['ready', 'READY'],
    ['cod', 'COD'],
  ] as const)('renders %s variant with label', (variant, label) => {
    render(<Badge variant={variant}>{label}</Badge>)
    expect(screen.getByText(label)).toBeInTheDocument()
  })
})
