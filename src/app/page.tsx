"use client";

import Link from 'next/link';
import { AlertTriangle, ArrowRight, FileDown, Package, PlusCircle, RotateCw } from 'lucide-react';
import { AppShell } from '@/components/app-shell';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { InventoryChart } from '@/components/inventory-chart';
import { useInventory } from '@/components/inventory-provider';
import { formatDateTime, formatNumber } from '@/lib/utils';

export default function DashboardPage() {
  const { items, movements, lowStockThreshold } = useInventory();

  const totalItems = items.length;
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const lowStockItems = items.filter((item) => item.quantity <= Math.min(item.minStock, lowStockThreshold));
  const categories = new Set(items.map((item) => item.category)).size;
  const recentMovements = movements.slice(0, 5);

  return (
    <AppShell>
      <div className="grid gap-5 xl:grid-cols-12">
        <div className="xl:col-span-8 space-y-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Card>
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Total items</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{formatNumber(totalItems)}</p>
                </div>
                <Package className="h-8 w-8 text-cyan-300" />
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-sm text-slate-400">Total quantity</p>
                <p className="mt-2 text-3xl font-semibold text-white">{formatNumber(totalQuantity)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-sm text-slate-400">Low stock items</p>
                <p className="mt-2 text-3xl font-semibold text-amber-300">{formatNumber(lowStockItems.length)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-sm text-slate-400">Categories</p>
                <p className="mt-2 text-3xl font-semibold text-white">{formatNumber(categories)}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-300" />
                  Low stock alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {lowStockItems.length ? (
                  lowStockItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between rounded-2xl border border-amber-400/15 bg-amber-400/5 px-4 py-3">
                      <div>
                        <p className="font-medium text-white">{item.name}</p>
                        <p className="text-sm text-slate-400">
                          {item.itemCode} · {item.location}
                        </p>
                      </div>
                      <Badge tone="warning">
                        {item.quantity}/{item.minStock}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-400">No low stock items right now.</p>
                )}
              </CardContent>
            </Card>

            <InventoryChart />
          </div>
        </div>

        <div className="xl:col-span-4 space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Quick actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild className="w-full justify-between">
                <Link href="/inventory/new">
                  Add inventory item
                  <PlusCircle className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full justify-between">
                <Link href="/movement">
                  Record stock movement
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" className="w-full justify-between">
                <Link href="/reports">
                  Export reports
                  <FileDown className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentMovements.map((movement) => (
                <div key={movement.id} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-white">{movement.itemName}</p>
                      <p className="text-xs text-slate-400">{movement.note}</p>
                    </div>
                    <Badge tone={movement.type === 'in' ? 'success' : 'destructive'}>
                      {movement.type.toUpperCase()} {movement.quantity}
                    </Badge>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                    <span>{movement.performedBy}</span>
                    <span>{formatDateTime(movement.createdAt)}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RotateCw className="h-4 w-4 text-cyan-300" />
                MVP notes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-300">
              Manual input only, single warehouse, and local-first state with future Supabase integration ready.
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
