'use client'

import { useState } from 'react'

interface ProductFilterProps {
  onSearch: (query: string) => void
  onCategoryChange: (category: string) => void
  categories: string[]
}

export default function ProductFilter({ onSearch, onCategoryChange, categories }: ProductFilterProps) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="mb-8 flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            onSearch(e.target.value)
          }}
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>
      <select
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-4 py-2 border rounded-md"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  )
}