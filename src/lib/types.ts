export type UserRole = 'admin' | 'staff' | 'supervisor';
export type MovementType = 'in' | 'out';

export type InventoryItem = {
  id: string;
  itemCode: string;
  name: string;
  category: string;
  quantity: number;
  minStock: number;
  location: string;
  unit: string;
  description: string;
  status: 'active' | 'archived';
  createdAt: string;
  updatedAt: string;
};

export type StockMovement = {
  id: string;
  itemId: string;
  itemCode: string;
  itemName: string;
  type: MovementType;
  quantity: number;
  note: string;
  performedBy: string;
  createdAt: string;
};

export type AppUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type InventoryInput = Omit<InventoryItem, 'id' | 'createdAt' | 'updatedAt'>;

export type MovementInput = {
  itemId: string;
  type: MovementType;
  quantity: number;
  note: string;
  performedBy: string;
};
