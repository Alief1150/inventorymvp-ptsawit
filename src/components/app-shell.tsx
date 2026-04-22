import Link from 'next/link';
import { BarChart3, Boxes, FileDown, Home, Package, Settings, Shuffle, ShieldCheck } from 'lucide-react';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Separator } from '@/components/ui';
import { useInventory } from '@/components/inventory-provider';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/inventory', label: 'Inventory List', icon: Boxes },
  { href: '/movement', label: 'Stock Movement', icon: Shuffle },
  { href: '/reports', label: 'Reports', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: Settings }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { activeRole, activeUser, setRole, items, lowStockThreshold } = useInventory();
  const lowStockCount = items.filter((item) => item.quantity <= Math.min(item.minStock, lowStockThreshold)).length;

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="border-r border-slate-800 bg-slate-950/80 px-4 py-5 backdrop-blur xl:px-5">
        <div className="flex items-center gap-3 px-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950 shadow-glow">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide text-slate-100">BPN Inventory</p>
            <p className="text-xs text-slate-400">PT Bumi Palma Nusantara</p>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-2xl px-3 py-3 text-sm text-slate-300 transition-colors hover:bg-slate-900 hover:text-white'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <Card className="border-cyan-500/10 bg-cyan-400/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm">
                <ShieldCheck className="h-4 w-4 text-cyan-300" />
                Access Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-slate-100">{activeUser.name}</p>
                <p className="text-xs text-slate-400">{activeUser.email}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge tone="default">{activeRole}</Badge>
                <Badge tone={lowStockCount ? 'warning' : 'success'}>{lowStockCount} low stock</Badge>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-2">
            {(['admin', 'staff', 'supervisor'] as const).map((role) => (
              <Button key={role} variant={role === activeRole ? 'default' : 'secondary'} className="justify-start" onClick={() => setRole(role)}>
                Switch to {role}
              </Button>
            ))}
          </div>
        </div>
      </aside>

      <main className="min-w-0">
        <header className="border-b border-slate-800 bg-slate-950/60 px-5 py-4 backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Inventory Management MVP</p>
              <h1 className="mt-1 text-2xl font-semibold text-white">Modern warehouse dashboard</h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="muted">Single warehouse</Badge>
              <Badge tone="muted">Manual input</Badge>
              <Badge tone="muted">Dark mode</Badge>
            </div>
          </div>
        </header>

        <div className="p-5 lg:p-6">{children}</div>
      </main>
    </div>
  );
}
