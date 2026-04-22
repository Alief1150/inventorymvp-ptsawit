"use client";

import { AppShell } from '@/components/app-shell';
import { Badge, Card, CardContent, CardHeader, CardTitle, Input, Select } from '@/components/ui';
import { useInventory } from '@/components/inventory-provider';
import { supabase } from '@/lib/supabase';

export default function SettingsPage() {
  const { activeRole, lowStockThreshold, setLowStockThreshold } = useInventory();

  return (
    <AppShell>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Application settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <p className="mb-2 text-sm text-slate-300">Low stock threshold override</p>
              <Input type="number" min={0} value={lowStockThreshold} onChange={(event) => setLowStockThreshold(Number(event.target.value))} />
            </div>
            <div>
              <p className="mb-2 text-sm text-slate-300">Current role</p>
              <Badge tone="default">{activeRole}</Badge>
            </div>
            <div>
              <p className="mb-2 text-sm text-slate-300">Theme</p>
              <Select value="dark" disabled>
                <option value="dark">Dark mode default</option>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Supabase readiness</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-300">
            <p>{supabase ? 'Supabase env is configured and ready for future integration.' : 'Supabase env is missing.'}</p>
            <p>Local-first state is active for this MVP, so the app works without a backend.</p>
            <p>Future tables can be wired in without changing the UI layer.</p>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
