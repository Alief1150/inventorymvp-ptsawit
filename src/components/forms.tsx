"use client";

import { useMemo, useState } from 'react';
import { Button, Input, Label, Select, Textarea } from '@/components/ui';
import type { InventoryInput, InventoryItem, MovementInput } from '@/lib/types';
import { useInventory } from '@/components/inventory-provider';

const blankItem: InventoryInput = {
  itemCode: '',
  name: '',
  category: '',
  quantity: 0,
  minStock: 0,
  location: '',
  unit: 'pcs',
  description: '',
  status: 'active'
};

export function ItemForm({ item, onSubmit, submitLabel }: { item?: InventoryItem; onSubmit: (input: InventoryInput) => void; submitLabel: string }) {
  const [form, setForm] = useState<InventoryInput>(item ?? blankItem);

  const categories = useMemo(() => ['Mechanical', 'PPE', 'Consumable', 'IT', 'Electrical', 'Office'], []);

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(form);
      }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Item code">
          <Input value={form.itemCode} onChange={(event) => setForm({ ...form, itemCode: event.target.value })} placeholder="ITM-005" required />
        </Field>
        <Field label="Item name">
          <Input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder="Hydraulic Seal Kit" required />
        </Field>
        <Field label="Category">
          <Select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} required>
            <option value="" disabled>
              Select category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Location">
          <Input value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} placeholder="Rack A-03" required />
        </Field>
        <Field label="Quantity">
          <Input type="number" min={0} value={form.quantity} onChange={(event) => setForm({ ...form, quantity: Number(event.target.value) })} required />
        </Field>
        <Field label="Minimum stock">
          <Input type="number" min={0} value={form.minStock} onChange={(event) => setForm({ ...form, minStock: Number(event.target.value) })} required />
        </Field>
        <Field label="Unit">
          <Select value={form.unit} onChange={(event) => setForm({ ...form, unit: event.target.value })}>
            {['pcs', 'pairs', 'liters', 'boxes', 'sets'].map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Status">
          <Select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value as InventoryItem['status'] })}>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </Select>
        </Field>
      </div>

      <Field label="Description">
        <Textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Short item notes, supplier info, or internal usage." />
      </Field>

      <div className="flex flex-wrap gap-3">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}

export function MovementForm({ onSubmit }: { onSubmit: (input: MovementInput) => void }) {
  const { items, activeUser } = useInventory();
  const [form, setForm] = useState<MovementInput>({
    itemId: items[0]?.id ?? '',
    type: 'in',
    quantity: 1,
    note: '',
    performedBy: activeUser.name
  });

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(form);
      }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Item">
          <Select value={form.itemId} onChange={(event) => setForm({ ...form, itemId: event.target.value })} required>
            {items.map((item) => (
              <option key={item.id} value={item.id}>
                {item.itemCode} - {item.name}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Movement type">
          <Select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value as MovementInput['type'] })}>
            <option value="in">Stock in</option>
            <option value="out">Stock out</option>
          </Select>
        </Field>
        <Field label="Quantity">
          <Input type="number" min={1} value={form.quantity} onChange={(event) => setForm({ ...form, quantity: Number(event.target.value) })} required />
        </Field>
        <Field label="Performed by">
          <Input value={form.performedBy} onChange={(event) => setForm({ ...form, performedBy: event.target.value })} required />
        </Field>
      </div>
      <Field label="Note">
        <Textarea value={form.note} onChange={(event) => setForm({ ...form, note: event.target.value })} placeholder="Reason for the movement or supporting reference." required />
      </Field>

      <Button type="submit">Record movement</Button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
