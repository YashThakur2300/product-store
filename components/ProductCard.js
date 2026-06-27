import Link from 'next/link'
import Image from 'next/image'

function StarRating({ rate }) {
  const full = Math.round(rate)
  return (
    <span className="card-rating">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= full ? 'star' : ''}>
          {i <= full ? '★' : '☆'}
        </span>
      ))}
    </span>
  )
}

export default function ProductCard({ product }) {
  const { id, title, price, category, image, rating } = product

  return (
    <Link href={`/product/${id}`} className="product-card" prefetch={false}>
      <div className="card-img-wrap">
        <span className="card-badge">{category}</span>
        <Image
          src={image}
          alt={title}
          width={140}
          height={140}
          style={{ objectFit: 'contain', maxHeight: '140px', width: 'auto' }}
        />
      </div>
      <div className="card-body">
        <p className="card-title">{title}</p>
        <div className="card-footer">
          <span className="card-price">Rs.{price.toFixed(2)}</span>
          {rating && (
            <span className="card-rating">
              <StarRating rate={rating.rate} />
              <span className="count">({rating.count})</span>
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
