'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '../store/authStore'
import { useCartStore } from '../store/cartStore'
import { removeToken } from '../lib/auth'

export default function Navbar(): JSX.Element {
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const { items } = useCartStore()
  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogout = () => {
    removeToken()
    logout()
    router.push('/login')
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              ShopSmart
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/products" className="hover:text-blue-500">
              Products
            </Link>
            <Link href="/cart" className="hover:text-blue-500 relative">
              Cart
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">{user.name}</span>
                <button 
                  onClick={handleLogout}
                  className="hover:text-blue-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="hover:text-blue-500">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}