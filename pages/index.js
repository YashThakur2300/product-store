import { useState, useMemo, useEffect } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'

const PRODUCTS_PER_PAGE = 8

export async function getServerSideProps() {
  try {
    const res = await fetch('https://fakestoreapi.com/products')
    if (!res.ok) throw new Error('Failed to fetch products')
    const products = await res.json()
    return { props: { products } }
  } catch (err) {
    return { props: { products: [], error: 'Could not load products. Please try again.' } }
  }
}

export default function Home({ products, error }) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [isFiltering, setIsFiltering] = useState(false)

  // Derive unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))]
    return ['All', ...cats]
  }, [products])

  // Debounced filtering indicator
  useEffect(() => {
    if (!query && activeCategory === 'All') { setIsFiltering(false); return }
    setIsFiltering(true)
    const t = setTimeout(() => setIsFiltering(false), 300)
    return () => clearTimeout(t)
  }, [query, activeCategory])

  // Filter products
  const filtered = useMemo(() => {
    let result = products
    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory)
    }
    if (query.trim()) {
      const q = query.toLowerCase()
      result = result.filter((p) => p.title.toLowerCase().includes(q))
    }
    return result
  }, [products, query, activeCategory])

  // Reset to page 1 on filter change
  useEffect(() => { setCurrentPage(1) }, [query, activeCategory])

  // Paginate
  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE)
  const paginated = filtered.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  const handleCategory = (cat) => {
    setActiveCategory(cat)
    setQuery('')
  }

  return (
    <>
      <Head>
        <title>Store — Product Listing</title>
        <meta name="description" content="Browse our curated product collection." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar
        query={query}
        onQuery={setQuery}
        totalVisible={filtered.length}
        totalAll={products.length}
      />

      {/* Category filter */}
      <div className="filter-bar">
        <span className="filter-label">Filter:</span>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn${activeCategory === cat ? ' active' : ''}`}
            onClick={() => handleCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <main className="page-main">
        {/* Error */}
        {error && (
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle me-2" />
            {error}
          </div>
        )}

        {/* Results meta */}
        {!error && (
          <p className="results-meta">
            {query || activeCategory !== 'All' ? (
              <>
                <strong>{filtered.length}</strong>{' '}
                {filtered.length === 1 ? 'result' : 'results'}
                {query && <> for <strong>"{query}"</strong></>}
                {activeCategory !== 'All' && <> in <strong>{activeCategory}</strong></>}
              </>
            ) : (
              <>All <strong>{products.length}</strong> products</>
            )}
          </p>
        )}

        {/* Loading spinner (shown during debounce) */}
        {isFiltering ? (
          <div className="spinner-wrap">
            <div className="spinner" role="status" aria-label="Filtering…" />
            <span>Filtering products…</span>
          </div>
        ) : paginated.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-search" style={{ fontSize: '2.5rem', opacity: 0.25, display: 'block', marginBottom: 16 }} />
            <h3>No products found</h3>
            <p>Try a different search term or category.</p>
            <button
              className="filter-btn active mt-3"
              onClick={() => { setQuery(''); setActiveCategory('All') }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="product-grid">
              {paginated.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPage={(p) => { setCurrentPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            />
          </>
        )}
      </main>
    </>
  )
}
