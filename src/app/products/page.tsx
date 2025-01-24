'use client'

import { useState, useEffect } from 'react'
import { productAPI, Product } from '../lib/api'
import ProductCard from '../components/ProductCard'
import ProductFilter from '../components/ProductFilter'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorBoundary from '../components/ErrorBoundary'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await productAPI.getProducts()
        setProducts(data)
        setFilteredProducts(data)
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.map(product => product.category.name))
        )
        setCategories(uniqueCategories)
      } catch (err) {
        setError('Failed to fetch products')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleSearch = (query: string) => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    )
    setFilteredProducts(filtered)
  }

  const handleCategoryChange = (category: string) => {
    if (!category) {
      setFilteredProducts(products)
      return
    }
    const filtered = products.filter(
      product => product.category.name === category
    )
    setFilteredProducts(filtered)
  }

  if (isLoading) return <LoadingSpinner />
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>

  return (
    <ErrorBoundary>
      <main className="p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Our Products</h1>
          
          <ProductFilter
            onSearch={handleSearch}
            onCategoryChange={handleCategoryChange}
            categories={categories}
          />

          {filteredProducts.length === 0 ? (
            <p className="text-center py-8">No products found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.images[0]}
                  category={product.category.name}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </ErrorBoundary>
  )
}