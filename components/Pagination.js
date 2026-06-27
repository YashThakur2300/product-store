export default function Pagination({ currentPage, totalPages, onPage }) {
  if (totalPages <= 1) return null

  const pages = []
  const delta = 2
  const left = Math.max(1, currentPage - delta)
  const right = Math.min(totalPages, currentPage + delta)

  if (left > 1) pages.push(1)
  if (left > 2) pages.push('…')
  for (let i = left; i <= right; i++) pages.push(i)
  if (right < totalPages - 1) pages.push('…')
  if (right < totalPages) pages.push(totalPages)

  return (
    <div className="pagination-wrap">
      <button
        className="page-btn"
        onClick={() => onPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <i className="bi bi-chevron-left" />
      </button>

      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`ellipsis-${i}`} style={{ padding: '0 4px', color: 'var(--clr-muted)' }}>
            …
          </span>
        ) : (
          <button
            key={p}
            className={`page-btn${p === currentPage ? ' active' : ''}`}
            onClick={() => onPage(p)}
            aria-label={`Page ${p}`}
            aria-current={p === currentPage ? 'page' : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        className="page-btn"
        onClick={() => onPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <i className="bi bi-chevron-right" />
      </button>
    </div>
  )
}
