import Link from 'next/link'
import Head from 'next/head'

export default function NotFound() {
  return (
    <>
      <Head><title>Page Not Found — Store</title></Head>
      <nav className="site-nav">
        <div className="nav-inner">
          <Link href="/" className="nav-brand">Store<span>.</span></Link>
        </div>
      </nav>
      <div className="error-page">
        <p style={{ fontSize: '4rem', marginBottom: '16px' }}>🛒</p>
        <h2>Page not found</h2>
        <p>The product or page you're looking for doesn't exist.</p>
        <Link href="/" className="add-to-cart" style={{ textDecoration: 'none', display: 'inline-flex' }}>
          Back to store
        </Link>
      </div>
    </>
  )
}
