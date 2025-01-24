import { render, screen, fireEvent } from '@testing-library/react'
import CartPage from '../page'
import { useCartStore } from '../../store/cartStore'

// Mock the store
jest.mock('../../store/cartStore')

describe('CartPage', () => {
  const mockItems = [
    {
      id: 1,
      title: 'Test Product',
      price: 99.99,
      image: '/test-image.jpg',
      quantity: 2
    }
  ]

  beforeEach(() => {
    (useCartStore as jest.Mock).mockImplementation(() => ({
      items: mockItems,
      removeItem: jest.fn(),
      updateQuantity: jest.fn(),
      total: () => 199.98
    }))
  })

  it('renders cart items correctly', () => {
    render(<CartPage />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('$199.98')).toBeInTheDocument()
  })

  it('shows empty cart message when no items', () => {
    (useCartStore as jest.Mock).mockImplementation(() => ({
      items: [],
      total: () => 0
    }))

    render(<CartPage />)

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument()
    expect(screen.getByText('Continue Shopping')).toBeInTheDocument()
  })
})