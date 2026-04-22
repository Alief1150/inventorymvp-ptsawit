"use client";

import { notFound, useParams, useRouter } from 'next/navigation';
import { AppShell } from '@/components/app-shell';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { ItemForm } from '@/components/forms';
import { useInventory } from '@/components/inventory-provider';

export default function EditInventoryPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { items, updateItem } = useInventory();
  const item = items.find((entry) => entry.id === params.id);

  if (!item) return notFound();

  return (
    <AppShell>
      <Card>
        <CardHeader>
          <CardTitle>Edit inventory item</CardTitle>
        </CardHeader>
        <CardContent>
          <ItemForm
            item={item}
            submitLabel="Save changes"
            onSubmit={(input) => {
              updateItem(item.id, input);
              router.push(`/inventory/${item.id}`);
            }}
          />
          <div className="mt-4">
            <Button variant="secondary" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
