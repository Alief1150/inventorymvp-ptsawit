"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useInventory } from '@/components/inventory-provider';

export function InventoryChart() {
  const { items } = useInventory();
  const topItems = [...items].sort((a, b) => b.quantity - a.quantity).slice(0, 5);
  const maxQuantity = Math.max(...topItems.map((item) => item.quantity), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stock distribution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {topItems.map((item) => (
          <div key={item.id} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-200">{item.name}</span>
              <span className="text-slate-400">{item.quantity} {item.unit}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-sky-500" style={{ width: `${(item.quantity / maxQuantity) * 100}%` }} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
