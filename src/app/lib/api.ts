import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1'
})

// Product Types
export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: {
    id: number
    name: string
  }
  images: string[]
}

// Auth Types
export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  avatar?: string
}

// API Functions
export const productAPI = {
  // Get all products
  getProducts: async (): Promise<Product[]> => {
    const response = await api.get('/products')
    return response.data
  },

  // Get single product
  getProduct: async (id: number): Promise<Product> => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  // Get products by category
  getProductsByCategory: async (categoryId: number): Promise<Product[]> => {
    const response = await api.get(`/categories/${categoryId}/products`)
    return response.data
  }
}

export const authAPI = {
  // Login
  login: async (data: LoginData) => {
    const response = await api.post('/auth/login', data)
    return response.data
  },

  // Register
  register: async (data: RegisterData) => {
    const response = await api.post('/users', data)
    return response.data
  }
}