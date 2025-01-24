import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <section className="text-center py-12">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to ShopSmart
          </h1>
          <p className="text-gray-600 mb-8">
            Your one-stop shop for all your needs
          </p>
          <Link 
            href="/products" 
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          >
            Browse Products
          </Link>
        </section>
      </div>
    </main>
  )
}