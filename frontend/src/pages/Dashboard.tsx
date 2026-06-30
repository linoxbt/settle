import { MOCK_CHARGES, MOCK_SWEEPS } from '../lib/mockData'
import { formatUSDC, shortAddr, shortHash, formatTs, STATUS_LABEL, STATUS_COLOR } from '../lib/format'
import { CreditCard, DollarSign, Activity } from 'lucide-react'

const SCORE = 742

function ScoreGauge({ score }: { score: number }) {
  const pct = (score - 300) / 550
  const angle = -140 + pct * 280
  const color = score >= 700 ? 'var(--accent)' : score >= 600 ? '#f59e0b' : '#ef4444'
  const label = score >= 700 ? 'Good' : score >= 600 ? 'Fair' : 'Poor'

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 120 70" className="w-28 h-16">
        <path d="M10 65 A 55 55 0 0 1 110 65" fill="none" stroke="var(--border)" strokeWidth="8" strokeLinecap="round" />
        <path d="M10 65 A 55 55 0 0 1 110 65" fill="none" stroke={color} strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${pct * 172} 172`}
        />
        <g transform={`rotate(${angle}, 60, 65)`}>
          <line x1="60" y1="65" x2="60" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <circle cx="60" cy="65" r="3" fill={color} />
        </g>
        <text x="60" y="62" textAnchor="middle" fontSize="14" fontWeight="700" fill={color} fontFamily="JetBrains Mono, monospace">{score}</text>
      </svg>
      <span className="text-xs mt-1" style={{ color }}>{label}</span>
    </div>
  )
}

export default function Dashboard() {
  const activeCharges = MOCK_CHARGES.filter(c => c.status === 0).length
  const totalPaid = MOCK_SWEEPS.filter(s => s.success).reduce((a, s) => a + s.amount, 0n)

  const KPI = [
    { label: 'Active Charges', value: activeCharges.toString(), icon: Activity },
    { label: 'Total Paid', value: formatUSDC(totalPaid), icon: DollarSign },
    { label: 'Credit Score', value: null, icon: null },
    { label: 'Available Balance', value: '$2,480.00', icon: CreditCard },
  ]

  return (
    <div className="px-6 py-8 max-w-6xl">
      <div className="mb-7">
        <p className="text-xs text-[var(--text-2)] uppercase tracking-widest mb-1">Buyer</p>
        <h1 className="text-2xl font-semibold text-[var(--text-1)]">Dashboard</h1>
        <p className="text-sm text-[var(--text-2)] mt-1 font-mono">{shortAddr('0xaBcD1234567890abcdef1234567890abcDEF1234')}</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {KPI.map((k, i) => (
          <div key={k.label} className="bg-[var(--surface)] border border-[var(--border)] rounded-sm p-4">
            <p className="text-xs text-[var(--text-2)] uppercase tracking-widest mb-3">{k.label}</p>
            {i === 2 ? (
              <ScoreGauge score={SCORE} />
            ) : (
              <div className="flex items-end justify-between">
                <span className="text-xl font-mono font-bold text-[var(--text-1)]">{k.value}</span>
                {k.icon && <k.icon size={16} className="text-[var(--accent)] mb-1" />}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Charges table */}
      <div className="mb-8">
        <p className="text-xs text-[var(--text-2)] uppercase tracking-widest mb-3 flex items-center gap-3">
          Active &amp; Recent Charges <span className="flex-1 h-px bg-[var(--border)]" />
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>ID</th><th>Type</th><th>Merchant</th><th>Amount/Cycle</th><th>Progress</th><th>Next Due</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_CHARGES.map(c => (
                  <tr key={c.id}>
                    <td className="font-mono text-[var(--text-2)]">#{c.id}</td>
                    <td>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-sm ${c.type === 0 ? 'bg-purple-900/40 text-purple-400' : 'bg-blue-900/40 text-blue-400'}`}>
                        {c.type === 0 ? 'BNPL' : 'SUB'}
                      </span>
                    </td>
                    <td className="font-mono text-xs">{c.merchantName}</td>
                    <td className="font-mono">{formatUSDC(c.amountPerCycle)}</td>
                    <td className="font-mono text-xs">
                      {c.totalCycles === 0
                        ? <span className="text-[var(--text-2)]">{c.cyclesCompleted} cycles</span>
                        : <><span className="text-[var(--text-1)]">{c.cyclesCompleted}</span><span className="text-[var(--text-2)]">/{c.totalCycles}</span></>
                      }
                    </td>
                    <td className="text-xs text-[var(--text-2)]">
                      {c.nextDueAt ? formatTs(c.nextDueAt) : '—'}
                    </td>
                    <td>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-sm ${STATUS_COLOR[c.status]}`}>
                        {STATUS_LABEL[c.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Sweep history */}
      <div>
        <p className="text-xs text-[var(--text-2)] uppercase tracking-widest mb-3 flex items-center gap-3">
          Sweep History <span className="flex-1 h-px bg-[var(--border)]" />
        </p>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Date</th><th>Charge</th><th>Amount</th><th>Tx Hash</th><th>Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_SWEEPS.map(s => (
                  <tr key={s.id}>
                    <td className="text-xs text-[var(--text-2)]">{formatTs(s.timestamp)}</td>
                    <td className="font-mono text-xs text-[var(--text-2)]">#{s.chargeId}</td>
                    <td className="font-mono">{formatUSDC(s.amount)}</td>
                    <td className="font-mono text-xs text-[var(--text-2)]">{shortHash(s.txHash)}</td>
                    <td>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-sm ${s.success ? 'text-[var(--accent)] bg-[var(--accent-tint)]' : 'text-red-400 bg-red-900/30'}`}>
                        {s.success ? 'Success' : 'Failed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
