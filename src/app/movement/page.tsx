"use client";

import { AppShell } from '@/components/app-shell';
import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { MovementForm } from '@/components/forms';
import { useInventory } from '@/components/inventory-provider';
import { formatDateTime } from '@/lib/utils';

export default function MovementPage() {
  const { movements, recordMovement } = useInventory();

  return (
    <AppShell>
      <div className="grid gap-5 xl:grid-cols-12">
        <div className="xl:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Stock movement</CardTitle>
            </CardHeader>
            <CardContent>
              <MovementForm
                onSubmit={(input) => {
                  const result = recordMovement(input);
                  if (!result.ok) alert(result.message ?? 'Unable to record movement');
                }}
              />
            </CardContent>
          </Card>
        </div>

        <div className="xl:col-span-7">
          <Card>
            <CardHeader>
              <CardTitle>Movement history</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {movements.map((movement) => (
                <div key={movement.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-white">{movement.itemName}</p>
                      <p className="text-sm text-slate-400">{movement.note}</p>
                    </div>
                    <Badge tone={movement.type === 'in' ? 'success' : 'destructive'}>
                      {movement.type.toUpperCase()} {movement.quantity}
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                    <span>{movement.performedBy}</span>
                    <span>{formatDateTime(movement.createdAt)}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
