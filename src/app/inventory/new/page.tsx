"use client";

import { useRouter } from 'next/navigation';
import { AppShell } from '@/components/app-shell';
import { Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { ItemForm } from '@/components/forms';
import { useInventory } from '@/components/inventory-provider';

export default function NewInventoryPage() {
  const router = useRouter();
  const { addItem } = useInventory();

  return (
    <AppShell>
      <Card>
        <CardHeader>
          <CardTitle>Add inventory item</CardTitle>
        </CardHeader>
        <CardContent>
          <ItemForm
            submitLabel="Create item"
            onSubmit={(input) => {
              addItem(input);
              router.push('/inventory');
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
