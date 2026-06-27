 import { useState, useMemo, useEffect } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'

const PER_PAGE = 8

export async function getServerSideProps() {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    const res = await fetch('https://fakestoreapi.com/products', {
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal
    })

    clearTimeout(timeout)

    if (!res.ok) throw new Error('fetch failed')

    const products = await res.json()
    return { props: { products } }
  } catch (err) {
    console.error('fetch error:', err)
    return { props: { products: [], error: true } }
  }
}

export default function Home({ products, error }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  // get unique categories from product list
  const categories = useMemo(() => {
    const all = products.map(p => p.category)
    return ['All', ...new Set(all)]
  }, [products])

  // show spinner briefly when user is typing
  useEffect(() => {
    if (!query) {
      setLoading(false)
      return
    }
    setLoading(true)
    const timer = setTimeout(() => setLoading(false), 300)
    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    setPage(1)
  }, [query, category])

  const filtered = useMemo(() => {
    let list = [...products]

    if (category !== 'All') {
      list = list.filter(p => p.category === category)
    }

    if (query.trim() !== '') {
      list = list.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase())
      )
    }

    return list
  }, [products, query, category])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const start = (page - 1) * PER_PAGE
  const visible = filtered.slice(start, start + PER_PAGE)

  function handleCategoryClick(cat) {
    setCategory(cat)
    setQuery('')
  }

  function handlePageChange(p) {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Head>
        <title>Product Listing</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar
        query={query}
        onQuery={setQuery}
        count={filtered.length}
        total={products.length}
      />

      <div className="filter-bar">
        <span className="filter-label">Category:</span>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`filter-btn ${category === cat ? 'active' : ''}`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <main className="page-main">

        {error && (
          <div className="alert alert-danger">
            Something went wrong loading the products. Try refreshing.
          </div>
        )}

        {!error && (
          <p className="results-meta">
            {query || category !== 'All' ? (
              <>
                <strong>{filtered.length}</strong> {filtered.length === 1 ? 'product' : 'products'} found
                {query && <> matching &quot;<strong>{query}</strong>&quot;</>}
                {category !== 'All' && <> in <strong>{category}</strong></>}
              </>
            ) : (
              <>Showing all <strong>{products.length}</strong> products</>
            )}
          </p>
        )}

        {loading ? (
          <div className="spinner-wrap">
            <div className="spinner" />
            <span>Searching...</span>
          </div>
        ) : visible.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-search" style={{ fontSize: '2rem', opacity: 0.2, display: 'block', marginBottom: 12 }} />
            <h3>No results found</h3>
            <p>Try searching for something else or clear the filters.</p>
            <button
              className="filter-btn active mt-3"
              onClick={() => { setQuery(''); setCategory('All') }}
            >
              Clear
            </button>
          </div>
        ) : (
          <>
            <div className="product-grid">
              {visible.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <Pagination
              current={page}
              total={totalPages}
              onChange={handlePageChange}
            />
          </>
        )}
      </main>
    </>
  )
}
