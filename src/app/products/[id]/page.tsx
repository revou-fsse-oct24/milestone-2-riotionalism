import Image from 'next/image'
import Link from 'next/link'
import { productAPI, Product } from '../../lib/api'

async function getProduct(id: string): Promise<Product | null> {
  try {
    return await productAPI.getProduct(parseInt(id))
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

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
            />
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-2">{product.category.name}</p>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-2xl font-bold text-blue-600 mb-6">${product.price}</p>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}