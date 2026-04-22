"use client";

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/app-shell';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Input, Select } from '@/components/ui';
import { useInventory } from '@/components/inventory-provider';
import { formatDateTime } from '@/lib/utils';

export default function InventoryListPage() {
  const router = useRouter();
  const { items, deleteItem } = useInventory();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');

  const categories = useMemo(() => ['all', ...new Set(items.map((item) => item.category))], [items]);

  const filtered = items.filter((item) => {
    const matchesQuery = [item.itemCode, item.name, item.location, item.category].some((value) => value.toLowerCase().includes(query.toLowerCase()));
    const matchesCategory = category === 'all' || item.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <AppShell>
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Inventory List</CardTitle>
              <p className="mt-1 text-sm text-slate-400">Search, filter, and manage inventory items.</p>
            </div>
            <Button asChild>
              <Link href="/inventory/new">
                <Plus className="h-4 w-4" />
                Add item
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input className="pl-9" placeholder="Search item code, name, location..." value={query} onChange={(event) => setQuery(event.target.value)} />
            </div>
            <Select value={category} onChange={(event) => setCategory(event.target.value)}>
              {categories.map((entry) => (
                <option key={entry} value={entry}>
                  {entry === 'all' ? 'All categories' : entry}
                </option>
              ))}
            </Select>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-800">
            <table className="min-w-full divide-y divide-slate-800 text-left text-sm">
              <thead className="bg-slate-900/80 text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Item</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Qty</th>
                  <th className="px-4 py-3 font-medium">Location</th>
                  <th className="px-4 py-3 font-medium">Updated</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-950/50">
                {filtered.map((item) => {
                  const lowStock = item.quantity <= item.minStock;
                  return (
                    <tr key={item.id} className="hover:bg-slate-900/60">
                      <td className="px-4 py-4">
                        <div className="font-medium text-slate-100">{item.name}</div>
                        <div className="text-xs text-slate-400">{item.itemCode}</div>
                      </td>
                      <td className="px-4 py-4 text-slate-300">{item.category}</td>
                      <td className="px-4 py-4">
                        <Badge tone={lowStock ? 'warning' : 'success'}>{item.quantity} {item.unit}</Badge>
                      </td>
                      <td className="px-4 py-4 text-slate-300">{item.location}</td>
                      <td className="px-4 py-4 text-slate-400">{formatDateTime(item.updatedAt)}</td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap gap-2">
                          <Button asChild variant="secondary">
                            <Link href={`/inventory/${item.id}`}>View</Link>
                          </Button>
                          <Button asChild variant="secondary">
                            <Link href={`/inventory/${item.id}/edit`}>
                              <Pencil className="h-4 w-4" />
                              Edit
                            </Link>
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => {
                              if (confirm(`Delete ${item.name}?`)) {
                                deleteItem(item.id);
                                router.refresh();
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
