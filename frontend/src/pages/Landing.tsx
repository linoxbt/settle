import {
  ArrowRight, Zap, RefreshCw, Shield, TrendingUp, Globe2,
  CheckCircle2, Layers, Lock, BarChart3, Store, Wallet
} from 'lucide-react'
import { Link } from 'react-router-dom'

const STATS = [
  { label: 'Total Volume', value: '$2.4M', sub: 'USDC settled' },
  { label: 'Active Charges', value: '1,847', sub: 'across all buyers' },
  { label: 'Merchants', value: '62', sub: 'onboarded' },
  { label: 'Avg Credit Score', value: '718', sub: 'protocol-wide' },
]

const CHAINS = ['Arbitrum', 'Ethereum', 'Polygon', 'Base', 'Optimism']

const CREDIT_SIGNALS = [
  { label: 'Wallet Age', desc: 'Older wallets signal long-term commitment and reduce default risk.' },
  { label: 'Repayment History', desc: 'Completed BNPL and subscription charges build a positive track record.' },
  { label: 'Default Count', desc: 'Charges that reached Defaulted status lower your score significantly.' },
  { label: 'Protocol Diversity', desc: 'Breadth of DeFi interactions shows on-chain experience and engagement.' },
  { label: 'Balance Consistency', desc: 'Stable USDC balance over time signals financial reliability.' },
]

const TECH_STACK = [
  { label: 'Smart Contracts', value: 'Solidity · Arbitrum Sepolia', icon: Layers },
  { label: 'Universal Accounts', value: 'EIP-7702 · Particle Network', icon: Globe2 },
  { label: 'Credit AI', value: 'Claude · On-chain signals', icon: BarChart3 },
  { label: 'Security', value: 'OpenZeppelin · Audited', icon: Lock },
]

function SectionHeader({ title }: { title: string }) {
  return (
    <p className="text-xs text-[var(--text-2)] uppercase tracking-widest mb-5 flex items-center gap-3">
      <span>{title}</span>
      <span className="flex-1 h-px bg-[var(--border)]" />
    </p>
  )
}

export default function Landing() {
  return (
    <div className="px-6 py-10 max-w-5xl mx-auto lg:mx-0 lg:max-w-none space-y-14">

      {/* ── Hero ── */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
          <span className="text-[var(--accent)] text-xs uppercase tracking-widest font-mono">
            Arbitrum Sepolia · Testnet Live
          </span>
        </div>
        <h1 className="text-5xl lg:text-6xl font-bold font-mono text-[var(--text-1)] tracking-tight mb-5 leading-[1.1]">
          The payment layer<br className="hidden lg:block" /> for the open web.
        </h1>
        <p className="text-xl text-[var(--text-2)] max-w-2xl leading-relaxed mb-3">
          Cross-chain BNPL &amp; subscription payments — powered by on-chain credit scoring and EIP-7702 Universal Accounts.
        </p>
        <p className="text-base text-[var(--text-1)] max-w-xl leading-relaxed mb-8">
          Merchants get paid upfront. Buyers pay over time. No banks, no seed phrases, no bridges.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 bg-[var(--accent)] text-black font-semibold text-sm px-5 py-2.5 rounded-sm hover:bg-[var(--accent-hover)] transition-colors"
          >
            Browse Catalog <ArrowRight size={14} />
          </Link>
          <Link
            to="/merchant/onboard"
            className="inline-flex items-center gap-2 border border-[var(--border)] text-[var(--text-2)] hover:text-[var(--text-1)] hover:border-[var(--text-2)] font-medium text-sm px-5 py-2.5 rounded-sm transition-colors"
          >
            <Store size={14} /> Become a Merchant
          </Link>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-[var(--accent)] text-sm font-medium hover:underline"
          >
            <Wallet size={13} /> View my score
          </Link>
        </div>
      </section>

      {/* ── Stats ── */}
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)] rounded-sm overflow-hidden">
          {STATS.map(s => (
            <div key={s.label} className="bg-[var(--surface)] px-5 py-4">
              <p className="text-xs text-[var(--text-2)] uppercase tracking-widest mb-1.5">{s.label}</p>
              <p className="text-2xl font-mono font-bold text-[var(--accent)]">{s.value}</p>
              <p className="text-xs text-[var(--text-2)] mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section>
        <SectionHeader title="How it works" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)] rounded-sm overflow-hidden border border-[var(--border)]">
          {[
            {
              n: '01',
              title: 'Connect',
              desc: 'Sign in with email or Google via Magic Labs. A Universal Account is created automatically — no seed phrase, no bridging required.',
            },
            {
              n: '02',
              title: 'Browse & Pay',
              desc: 'Pick any item from the catalog. Choose BNPL (6 installments) or Subscribe (recurring). Settle creates a charge on-chain.',
            },
            {
              n: '03',
              title: 'Settle handles the rest',
              desc: 'ScheduleEngine sweeps from your Universal Account on each cycle. Cancel subscriptions anytime from your Dashboard.',
            },
          ].map(step => (
            <div key={step.n} className="bg-[var(--surface)] p-6">
              <p className="text-4xl font-mono font-bold text-[var(--border)] mb-4 leading-none select-none">{step.n}</p>
              <h3 className="text-[var(--text-1)] font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-[var(--text-2)] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Payment types ── */}
      <section>
        <SectionHeader title="Payment types" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* BNPL */}
          <div className="bg-[var(--surface)] border border-[var(--border)] border-l-2 border-l-purple-500 rounded-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap size={17} className="text-purple-400" />
                <h3 className="text-[var(--text-1)] font-semibold">BNPL Loans</h3>
              </div>
              <span className="text-[10px] font-mono text-purple-400 bg-purple-900/30 px-2 py-0.5 rounded-sm">
                TYPE 0
              </span>
            </div>
            <p className="text-sm text-[var(--text-2)] leading-relaxed mb-5">
              Split any purchase into 6 equal monthly installments. Merchants receive the full amount upfront from the Settle liquidity pool — no waiting, no risk.
            </p>
            <ul className="space-y-2.5">
              {[
                'Buyer pays 1/6 of the total per month for 6 months',
                'Merchant receives 100% upfront from LiquidityPool',
                'ScheduleEngine auto-sweeps on each cycle due date',
                'Missed payments trigger a credit score penalty',
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-xs text-[var(--text-2)]">
                  <CheckCircle2 size={13} className="text-purple-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Subscriptions */}
          <div className="bg-[var(--surface)] border border-[var(--border)] border-l-2 border-l-blue-500 rounded-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <RefreshCw size={17} className="text-blue-400" />
                <h3 className="text-[var(--text-1)] font-semibold">Subscriptions</h3>
              </div>
              <span className="text-[10px] font-mono text-blue-400 bg-blue-900/30 px-2 py-0.5 rounded-sm">
                TYPE 1
              </span>
            </div>
            <p className="text-sm text-[var(--text-2)] leading-relaxed mb-5">
              Automated recurring billing, fully on-chain. Each cycle, ScheduleEngine pulls from your Universal Account. Cancel anytime with a single transaction.
            </p>
            <ul className="space-y-2.5">
              {[
                'Indefinite recurring charges until explicitly cancelled',
                'Buyer can cancel anytime from Dashboard',
                'Merchant receives each cycle directly — no escrow',
                'No hidden fees — 2.5% protocol fee only',
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-xs text-[var(--text-2)]">
                  <CheckCircle2 size={13} className="text-blue-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Universal Accounts ── */}
      <section>
        <SectionHeader title="Cross-chain by default" />
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-sm p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Shield size={17} className="text-[var(--accent)]" />
                <h3 className="text-[var(--text-1)] font-semibold">EIP-7702 Universal Accounts</h3>
                <span className="text-[10px] font-mono text-[var(--accent)] bg-[var(--accent-tint)] px-2 py-0.5 rounded-sm">
                  EIP-7702
                </span>
              </div>
              <p className="text-sm text-[var(--text-2)] leading-relaxed mb-4">
                Powered by Particle Network, Universal Accounts give your EOA smart-account capabilities. One unified balance spans all major EVM chains — pay from whichever chain holds your USDC.
              </p>
              <p className="text-sm text-[var(--text-2)] leading-relaxed">
                No bridging. No wrapped assets. No chain-switching. Settle abstracts all cross-chain complexity so you can focus on what you're buying.
              </p>
            </div>
            <div className="lg:w-52 flex-shrink-0">
              <p className="text-xs text-[var(--text-2)] uppercase tracking-widest mb-3">Supported chains</p>
              <div className="space-y-2.5">
                {CHAINS.map(chain => (
                  <div key={chain} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] flex-shrink-0" />
                    <span className="text-sm text-[var(--text-1)]">{chain}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Credit Scoring ── */}
      <section>
        <SectionHeader title="On-chain credit scoring" />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-3 bg-[var(--surface)] border border-[var(--border)] rounded-sm p-6">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={17} className="text-[var(--accent)]" />
              <h3 className="text-[var(--text-1)] font-semibold">Five-signal scorer</h3>
              <span className="text-[10px] font-mono text-[var(--accent)] bg-[var(--accent-tint)] px-2 py-0.5 rounded-sm">
                300–850
              </span>
            </div>
            <p className="text-sm text-[var(--text-2)] mb-5 leading-relaxed">
              Every wallet gets a credit score derived entirely from on-chain data. No KYC, no personal information — just verifiable, transparent history.
            </p>
            <div className="space-y-4">
              {CREDIT_SIGNALS.map((sig, i) => (
                <div key={sig.label} className="flex gap-3">
                  <span className="text-xs font-mono text-[var(--accent)] flex-shrink-0 mt-0.5 w-5">0{i + 1}</span>
                  <div>
                    <p className="text-sm font-medium text-[var(--text-1)] mb-0.5">{sig.label}</p>
                    <p className="text-xs text-[var(--text-2)] leading-relaxed">{sig.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-sm p-5">
              <p className="text-xs text-[var(--text-2)] uppercase tracking-widest mb-3">Score ranges</p>
              <div className="space-y-2.5">
                {[
                  { range: '750–850', label: 'Excellent', color: '#00d4aa' },
                  { range: '700–749', label: 'Good', color: '#00d4aa' },
                  { range: '650–699', label: 'Fair', color: '#f59e0b' },
                  { range: '600–649', label: 'Borderline', color: '#f59e0b' },
                  { range: '300–599', label: 'Poor', color: '#ef4444' },
                ].map(row => (
                  <div key={row.range} className="flex justify-between items-center py-0.5">
                    <span className="text-xs font-mono text-[var(--text-2)]">{row.range}</span>
                    <span className="text-xs font-semibold" style={{ color: row.color }}>{row.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[var(--accent-tint)] border border-[var(--accent)]/20 rounded-sm p-4">
              <p className="text-xs font-semibold text-[var(--accent)] mb-1.5">Claude AI Review</p>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">
                Borderline scores (600–649) receive a plain-language AI analysis from Claude, explaining the decision and what the borrower can do to improve.
              </p>
            </div>
            <Link
              to="/dashboard"
              className="flex items-center justify-between bg-[var(--surface)] border border-[var(--border)] rounded-sm p-4 hover:border-[var(--text-2)] transition-colors group"
            >
              <span className="text-sm text-[var(--text-1)] font-medium">Check my score</span>
              <ArrowRight size={14} className="text-[var(--accent)] group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── For Merchants ── */}
      <section>
        <SectionHeader title="For merchants" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {[
            {
              title: 'Instant Payout',
              desc: 'For BNPL: receive 100% of the charge upfront from the LiquidityPool the moment a buyer confirms. Zero waiting for installments.',
              icon: Zap,
            },
            {
              title: 'Automated Collection',
              desc: 'For subscriptions: ScheduleEngine handles collection every cycle. No manual invoicing. Cancel risk is protocol-managed.',
              icon: RefreshCw,
            },
            {
              title: 'Cross-chain Payouts',
              desc: 'Configure your preferred chain and asset via PayoutRouter. Receive on Arbitrum, Ethereum, Polygon — your choice.',
              icon: Globe2,
            },
          ].map(f => (
            <div key={f.title} className="bg-[var(--surface)] border border-[var(--border)] rounded-sm p-5">
              <f.icon size={16} className="text-[var(--accent)] mb-3" />
              <h4 className="text-[var(--text-1)] font-semibold text-sm mb-2">{f.title}</h4>
              <p className="text-xs text-[var(--text-2)] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-sm p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[var(--text-1)] mb-1">
              Ready to accept on-chain payments?
            </p>
            <p className="text-xs text-[var(--text-2)]">
              Set up your merchant profile in under 2 minutes. 2.5% protocol fee. No monthly cost.
            </p>
          </div>
          <Link
            to="/merchant/onboard"
            className="inline-flex items-center gap-2 bg-[var(--accent)] text-black font-semibold text-sm px-5 py-2.5 rounded-sm hover:bg-[var(--accent-hover)] transition-colors whitespace-nowrap flex-shrink-0"
          >
            Get started <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* ── Protocol stack ── */}
      <section>
        <SectionHeader title="Protocol" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {TECH_STACK.map(item => (
            <div key={item.label} className="bg-[var(--surface)] border border-[var(--border)] rounded-sm p-4">
              <item.icon size={15} className="text-[var(--accent)] mb-3" />
              <p className="text-xs text-[var(--text-2)] uppercase tracking-widest mb-1">{item.label}</p>
              <p className="text-sm font-medium text-[var(--text-1)] leading-snug">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
