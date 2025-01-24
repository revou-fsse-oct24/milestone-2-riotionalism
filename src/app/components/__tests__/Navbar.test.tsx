import { render, screen, fireEvent } from '@testing-library/react'
import Navbar from '../Navbar'
import { useAuthStore } from '../../store/authStore'
import { useCartStore } from '../../store/cartStore'

// Mock the stores
jest.mock('../../store/authStore')
jest.mock('../../store/cartStore')

describe('Navbar', () => {
  beforeEach(() => {
    (useAuthStore as jest.Mock).mockImplementation(() => ({
      user: null,
      logout: jest.fn()
    }))
    
    (useCartStore as jest.Mock).mockImplementation(() => ({
      items: []
    }))
  })

  it('renders login link when user is not authenticated', () => {
    render(<Navbar />)
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('renders logout button when user is authenticated', () => {
    (useAuthStore as jest.Mock).mockImplementation(() => ({
      user: { name: 'Test User' },
      logout: jest.fn()
    }))

    render(<Navbar />)
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()
  })

  it('shows cart items count', () => {
    (useCartStore as jest.Mock).mockImplementation(() => ({
      items: [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 1 }
      ]
    }))

    render(<Navbar />)
    expect(screen.getByText('3')).toBeInTheDocument()
  })
})