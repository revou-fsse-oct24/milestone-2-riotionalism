'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCartStore } from '../store/cartStore'
import toast from 'react-hot-toast'

interface ProductCardProps {
  id: number
  title: string
  price: number
  image: string
  category: string
}

export default function ProductCard({ id, title, price, image, category }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem)

  const handleAddToCart = () => {
    addItem({
      id,
      title,
      price,
      image,
      quantity: 1
    })
    toast.success('Added to cart!')
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-500 mb-1">{category}</p>
        <h3 className="font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-blue-600 font-bold mb-4">${price}</p>
        
        <div className="flex justify-between items-center">
          <Link 
            href={`/products/${id}`}
            className="text-blue-500 hover:underline"
          >
            View Details
          </Link>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}