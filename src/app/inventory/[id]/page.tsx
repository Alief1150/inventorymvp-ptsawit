"use client";

import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { AppShell } from '@/components/app-shell';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Separator } from '@/components/ui';
import { useInventory } from '@/components/inventory-provider';
import { formatDateTime } from '@/lib/utils';

export default function ItemDetailPage() {
  const params = useParams<{ id: string }>();
  const { items, movements } = useInventory();
  const item = items.find((entry) => entry.id === params.id);

  if (!item) return notFound();

  const history = movements.filter((movement) => movement.itemId === item.id);
  const lowStock = item.quantity <= item.minStock;

  return (
    <AppShell>
      <div className="grid gap-5 xl:grid-cols-12">
        <div className="xl:col-span-8 space-y-5">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>{item.name}</CardTitle>
                  <p className="mt-1 text-sm text-slate-400">{item.itemCode} · {item.category}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge tone={lowStock ? 'warning' : 'success'}>{lowStock ? 'Low stock' : 'Healthy'}</Badge>
                  <Badge tone="muted">{item.location}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <Stat label="Quantity" value={`${item.quantity} ${item.unit}`} />
                <Stat label="Min stock" value={`${item.minStock} ${item.unit}`} />
                <Stat label="Updated" value={formatDateTime(item.updatedAt)} />
              </div>
              <Separator />
              <p className="text-sm text-slate-300">{item.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Movement history</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {history.length ? history.map((movement) => (
                <div key={movement.id} className="rounded-2xl border border-slate-800 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-white">{movement.type.toUpperCase()} {movement.quantity}</p>
                      <p className="text-sm text-slate-400">{movement.note}</p>
                    </div>
                    <Badge tone={movement.type === 'in' ? 'success' : 'destructive'}>{movement.performedBy}</Badge>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">{formatDateTime(movement.createdAt)}</p>
                </div>
              )) : <p className="text-sm text-slate-400">No movements recorded for this item.</p>}
            </CardContent>
          </Card>
        </div>

        <div className="xl:col-span-4 space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full"><Link href={`/inventory/${item.id}/edit`}>Edit item</Link></Button>
              <Button asChild variant="secondary" className="w-full"><Link href="/movement">Record movement</Link></Button>
              <Button asChild variant="secondary" className="w-full"><Link href="/inventory">Back to list</Link></Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
