import { useState } from 'react'
import { Search, ShoppingCart, RefreshCw } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { MOCK_CATALOG } from '../lib/mockData'
import { formatUSDC } from '../lib/format'

type Filter = 'all' | 'bnpl' | 'sub'

export default function Catalog() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const navigate = useNavigate()

  const items = MOCK_CATALOG.filter(item => {
    const matchFilter = filter === 'all' || (filter === 'bnpl' ? item.type === 0 : item.type === 1)
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.merchantName.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const FILTERS: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All Items' },
    { key: 'bnpl', label: 'BNPL' },
    { key: 'sub', label: 'Subscriptions' },
  ]

  return (
    <div className="px-6 py-8">
      <div className="mb-7">
        <p className="text-xs text-[var(--text-2)] uppercase tracking-widest mb-1">Browse</p>
        <h1 className="text-2xl font-semibold text-[var(--text-1)]">Catalog</h1>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-2)]" />
          <input
            type="text"
            placeholder="Search items, merchants, categories…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-sm pl-9 pr-4 py-2.5 text-sm text-[var(--text-1)] placeholder-[var(--text-2)] outline-none focus:border-[var(--accent)] transition-colors"
          />
        </div>
        <div className="flex gap-1 bg-[var(--surface)] border border-[var(--border)] rounded-sm p-1">
          {FILTERS.map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-1.5 text-xs font-medium rounded-sm transition-colors ${
                filter === f.key
                  ? 'bg-[var(--accent)] text-black'
                  : 'text-[var(--text-2)] hover:text-[var(--text-1)]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {items.length === 0 ? (
        <div className="text-center py-20 text-[var(--text-2)]">
          <Search size={32} className="mx-auto mb-3 opacity-40" />
          <p>No items found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <div
              key={item.id}
              className="bg-[var(--surface)] border border-[var(--border)] rounded-sm p-5 hover:border-[var(--text-2)] transition-colors flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-sm ${
                  item.type === 0 ? 'bg-purple-900/40 text-purple-400' : 'bg-blue-900/40 text-blue-400'
                }`}>
                  {item.type === 0 ? 'BNPL' : 'SUB'}
                </span>
                <span className="text-[10px] text-[var(--text-2)] bg-[var(--border)] px-2 py-0.5 rounded-sm">{item.category}</span>
              </div>

              <div className="flex-1">
                <p className="text-xs text-[var(--text-2)] mb-1">{item.merchantName}</p>
                <h3 className="text-[var(--text-1)] font-semibold text-sm mb-3 leading-snug">{item.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-xl font-mono font-bold text-[var(--text-1)]">{formatUSDC(item.price)}</span>
                  <span className="text-xs text-[var(--text-2)]">/{item.period}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout', { state: { item } })}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-black font-semibold text-xs py-2.5 rounded-sm transition-colors"
              >
                {item.type === 0 ? <ShoppingCart size={13} /> : <RefreshCw size={13} />}
                {item.type === 0 ? 'Buy Now (BNPL)' : 'Subscribe'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
