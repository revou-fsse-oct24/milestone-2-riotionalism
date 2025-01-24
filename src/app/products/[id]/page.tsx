'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { productAPI, Product } from '../../lib/api'
import { useCartStore } from '../../store/cartStore'
import LoadingSpinner from '../../components/LoadingSpinner'
import toast from 'react-hot-toast'

export default function ProductDetail({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const addItem = useCartStore(state => state.addItem)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productAPI.getProduct(parseInt(params.id))
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product:', error)
        toast.error('Failed to load product')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [params.id])

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.images[0]
      })
      toast.success('Added to cart!')
    }
  }

  if (isLoading) return <LoadingSpinner />

  if (!product) {
    return (
      <main className="p-8">
        <div className="max-w-7xl mx-auto">
          <p>Product not found.</p>
          <Link href="/products" className="text-blue-500 hover:underline">
            Back to Products
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <Link href="/products" className="text-blue-500 hover:underline">
            ← Back to Products
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative h-96">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-contain"
              priority
            />
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-2">{product.category.name}</p>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-2xl font-bold text-blue-600 mb-6">${product.price}</p>
            <button 
              onClick={handleAddToCart}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}