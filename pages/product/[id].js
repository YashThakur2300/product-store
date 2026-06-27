import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${params.id}`)
    if (!res.ok) throw new Error('Product not found')
    const product = await res.json()
    return { props: { product } }
  } catch {
    return { notFound: true }
  }
}

function Stars({ rate }) {
  const full = Math.round(rate)
  return (
    <span className="detail-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i}>{i <= full ? '★' : '☆'}</span>
      ))}
    </span>
  )
}

export default function ProductDetail({ product }) {
  const { title, price, category, description, image, rating } = product

  return (
    <>
      <Head>
        <title>{title} — Store</title>
        <meta name="description" content={description?.slice(0, 155)} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Minimal nav for detail page */}
      <nav className="site-nav">
        <div className="nav-inner">
          <Link href="/" className="nav-brand">
            Store<span>.</span>
          </Link>
        </div>
      </nav>

      <div className="detail-page">
        <Link href="/" className="back-link">
          <i className="bi bi-arrow-left" />
          Back to all products
        </Link>

        <div className="detail-card">
          {/* Image */}
          <div className="detail-img-wrap">
            <Image
              src={image}
              alt={title}
              width={300}
              height={300}
              style={{ objectFit: 'contain', maxHeight: '300px', width: 'auto' }}
              priority
            />
          </div>

          {/* Info */}
          <div className="detail-body">
            <span className="detail-category">{category}</span>
            <h1 className="detail-title">{title}</h1>
            <div className="detail-price">Rs.{price.toFixed(2)}</div>

            {rating && (
              <div className="detail-rating">
                <Stars rate={rating.rate} />
                <span>{rating.rate.toFixed(1)} out of 5</span>
                <span>·</span>
                <span>{rating.count} reviews</span>
              </div>
            )}

            <p className="detail-desc">{description}</p>

            <button className="add-to-cart">
              <i className="bi bi-bag-plus" />
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
