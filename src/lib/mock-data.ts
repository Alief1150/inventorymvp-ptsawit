import type { AppUser, InventoryItem, StockMovement } from '@/lib/types';

export const mockUsers: AppUser[] = [
  { id: 'u1', name: 'Ayu Permata', email: 'ayu@bpn.co.id', role: 'admin' },
  { id: 'u2', name: 'Bima Santoso', email: 'bima@bpn.co.id', role: 'staff' },
  { id: 'u3', name: 'Dina Rahma', email: 'dina@bpn.co.id', role: 'supervisor' }
];

export const mockInventory: InventoryItem[] = [
  {
    id: 'item-1',
    itemCode: 'ITM-001',
    name: 'Industrial Bearing 6205',
    category: 'Mechanical',
    quantity: 18,
    minStock: 12,
    location: 'Rack A-01',
    unit: 'pcs',
    description: 'Main spare part for conveyor maintenance.',
    status: 'active',
    createdAt: '2026-04-01T08:00:00.000Z',
    updatedAt: '2026-04-20T07:15:00.000Z'
  },
  {
    id: 'item-2',
    itemCode: 'ITM-002',
    name: 'Safety Gloves XL',
    category: 'PPE',
    quantity: 42,
    minStock: 25,
    location: 'Rack B-02',
    unit: 'pairs',
    description: 'Warehouse protection equipment.',
    status: 'active',
    createdAt: '2026-04-02T10:30:00.000Z',
    updatedAt: '2026-04-18T09:45:00.000Z'
  },
  {
    id: 'item-3',
    itemCode: 'ITM-003',
    name: 'Hydraulic Oil ISO 68',
    category: 'Consumable',
    quantity: 9,
    minStock: 15,
    location: 'Cabinet C-03',
    unit: 'liters',
    description: 'Hydraulic system replenishment stock.',
    status: 'active',
    createdAt: '2026-04-03T09:15:00.000Z',
    updatedAt: '2026-04-21T12:10:00.000Z'
  },
  {
    id: 'item-4',
    itemCode: 'ITM-004',
    name: 'Network Patch Cord 3m',
    category: 'IT',
    quantity: 27,
    minStock: 10,
    location: 'Shelf D-01',
    unit: 'pcs',
    description: 'Spare patch cables for office and server room.',
    status: 'active',
    createdAt: '2026-04-04T11:00:00.000Z',
    updatedAt: '2026-04-19T15:30:00.000Z'
  }
];

export const mockMovements: StockMovement[] = [
  {
    id: 'mov-1',
    itemId: 'item-1',
    itemCode: 'ITM-001',
    itemName: 'Industrial Bearing 6205',
    type: 'out',
    quantity: 4,
    note: 'Maintenance request MR-2042',
    performedBy: 'Bima Santoso',
    createdAt: '2026-04-20T07:20:00.000Z'
  },
  {
    id: 'mov-2',
    itemId: 'item-3',
    itemCode: 'ITM-003',
    itemName: 'Hydraulic Oil ISO 68',
    type: 'out',
    quantity: 3,
    note: 'Pump refill in production line 2',
    performedBy: 'Ayu Permata',
    createdAt: '2026-04-21T12:15:00.000Z'
  },
  {
    id: 'mov-3',
    itemId: 'item-2',
    itemCode: 'ITM-002',
    itemName: 'Safety Gloves XL',
    type: 'in',
    quantity: 12,
    note: 'Supplier restock arrival',
    performedBy: 'Dina Rahma',
    createdAt: '2026-04-19T10:00:00.000Z'
  }
];
