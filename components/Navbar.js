import Link from 'next/link'

export default function Navbar({ query, onQuery, totalVisible, totalAll }) {
  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <Link href="/" className="nav-brand">
          MegaStore<span></span>
        </Link>

        <div className="search-wrap">
          <i className="bi bi-search search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search products…"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
          />
          {query && (
            <button
              className="search-clear"
              onClick={() => onQuery('')}
              aria-label="Clear search"
            >
              <i className="bi bi-x" />
            </button>
          )}
        </div>

        <span className="nav-count">
          {totalVisible} / {totalAll} products
        </span>
      </div>
    </nav>
  )
}
