import { useState } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import {
  Home, ShoppingBag, LayoutDashboard, Store, Menu, X, Wallet, LogOut, Sun, Moon
} from 'lucide-react'
import SettleLogo from './SettleLogo'
import ConnectWallet from './ConnectWallet'
import { shortAddr } from '../lib/format'
import { logout } from '../lib/magic'
import { useTheme } from '../lib/theme'

const NAV = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/catalog', label: 'Catalog', icon: ShoppingBag, end: false },
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: false },
  { to: '/merchant', label: 'Merchant', icon: Store, end: false },
]

interface Props {
  wallet: string | null
  onConnected: (addr: string) => void
  onLogout: () => void
}

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className="p-1.5 rounded-sm text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--border)] transition-colors"
    >
      {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  )
}

function Sidebar({ wallet, onConnect, onLogout, onClose }: {
  wallet: string | null
  onConnect: () => void
  onLogout: () => void
  onClose?: () => void
}) {
  return (
    <aside className="flex flex-col h-full bg-[var(--sidebar)] border-r border-[var(--border)] w-[220px] flex-shrink-0">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-[var(--border)] flex items-center justify-between">
        <Link to="/" onClick={onClose} className="flex-1 min-w-0">
          <SettleLogo />
        </Link>
        <div className="flex items-center gap-1 ml-2 flex-shrink-0">
          <ThemeToggle />
          {onClose && (
            <button onClick={onClose} className="p-1.5 text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--border)] rounded-sm transition-colors lg:hidden">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 text-sm rounded-sm transition-colors ${
                isActive
                  ? 'text-[var(--accent)] bg-[var(--accent-tint)] border-l-2 border-[var(--accent)] pl-[10px]'
                  : 'text-[var(--text-2)] hover:text-[var(--text-1)] hover:bg-[var(--surface)] border-l-2 border-transparent pl-[10px]'
              }`
            }
          >
            <Icon size={15} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Wallet status */}
      <div className="border-t border-[var(--border)] px-4 py-4">
        {wallet ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--accent)] flex-shrink-0" />
              <span className="font-mono text-xs text-[var(--text-1)] truncate">{shortAddr(wallet)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-[var(--text-2)]">Arbitrum Sepolia</span>
              <span className="text-[var(--border)]">·</span>
              <button
                onClick={onLogout}
                className="text-[10px] text-[var(--text-2)] hover:text-red-400 transition-colors flex items-center gap-1"
              >
                <LogOut size={10} />Disconnect
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={onConnect}
            className="w-full flex items-center justify-center gap-2 bg-[var(--surface)] hover:bg-[var(--accent-tint)] border border-[var(--border)] hover:border-[var(--accent)]/40 text-[var(--accent)] text-xs font-medium px-3 py-2.5 rounded-sm transition-colors"
          >
            <Wallet size={13} />
            Connect Wallet
          </button>
        )}
      </div>
    </aside>
  )
}

export default function Layout({ wallet, onConnected, onLogout }: Props) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [showConnect, setShowConnect] = useState(false)

  function handleLogout() {
    logout().catch(console.error)
    onLogout()
    setDrawerOpen(false)
  }

  return (
    <div className="flex h-full">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex h-full fixed left-0 top-0 bottom-0 z-40">
        <Sidebar wallet={wallet} onConnect={() => setShowConnect(true)} onLogout={handleLogout} />
      </div>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setDrawerOpen(false)} />
          <div className="relative z-10">
            <Sidebar wallet={wallet} onConnect={() => { setShowConnect(true); setDrawerOpen(false) }} onLogout={handleLogout} onClose={() => setDrawerOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-full lg:ml-[220px]">
        {/* Mobile header */}
        <header className="flex lg:hidden items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--sidebar)] sticky top-0 z-30">
          <button onClick={() => setDrawerOpen(true)} className="text-[var(--text-2)] hover:text-[var(--text-1)]">
            <Menu size={20} />
          </button>
          <Link to="/">
            <SettleLogo />
          </Link>
          <button
            onClick={() => setShowConnect(true)}
            className="text-xs text-[var(--accent)] flex items-center gap-1"
          >
            {wallet ? <span className="font-mono">{shortAddr(wallet)}</span> : <><Wallet size={12} /> Connect</>}
          </button>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Connect modal */}
      {showConnect && !wallet && (
        <ConnectWallet
          onClose={() => setShowConnect(false)}
          onConnected={addr => { onConnected(addr); setShowConnect(false) }}
        />
      )}
    </div>
  )
}
