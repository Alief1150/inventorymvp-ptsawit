"use client";

import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { mockInventory, mockMovements, mockUsers } from '@/lib/mock-data';
import type { AppUser, InventoryInput, InventoryItem, MovementInput, StockMovement, UserRole } from '@/lib/types';

type State = {
  items: InventoryItem[];
  movements: StockMovement[];
  activeRole: UserRole;
  activeUser: AppUser;
  lowStockThreshold: number;
  hydrated: boolean;
};

type Action =
  | { type: 'hydrate'; payload: Partial<State> }
  | { type: 'set-role'; payload: UserRole }
  | { type: 'set-threshold'; payload: number }
  | { type: 'add-item'; payload: InventoryInput }
  | { type: 'update-item'; payload: { id: string; input: InventoryInput } }
  | { type: 'delete-item'; payload: { id: string } }
  | { type: 'record-movement'; payload: MovementInput }
  | { type: 'reset-demo' };

const STORAGE_KEY = 'bpn-inventory-mvp-v1';

const initialState: State = {
  items: mockInventory,
  movements: mockMovements,
  activeRole: 'admin',
  activeUser: mockUsers[0],
  lowStockThreshold: 10,
  hydrated: false
};

function withTimestamps(input: InventoryInput, id: string) {
  const now = new Date().toISOString();
  return { id, ...input, createdAt: now, updatedAt: now } satisfies InventoryItem;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'hydrate':
      return { ...state, ...action.payload, hydrated: true };
    case 'set-role': {
      const activeUser = mockUsers.find((user) => user.role === action.payload) ?? mockUsers[0];
      return { ...state, activeRole: action.payload, activeUser };
    }
    case 'set-threshold':
      return { ...state, lowStockThreshold: action.payload };
    case 'add-item':
      return { ...state, items: [withTimestamps(action.payload, crypto.randomUUID()), ...state.items] };
    case 'update-item': {
      const updatedAt = new Date().toISOString();
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload.input, updatedAt } : item
        )
      };
    }
    case 'delete-item':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
        movements: state.movements.filter((movement) => movement.itemId !== action.payload.id)
      };
    case 'record-movement': {
      const item = state.items.find((candidate) => candidate.id === action.payload.itemId);
      if (!item) return state;
      const delta = action.payload.type === 'in' ? action.payload.quantity : -action.payload.quantity;
      const quantity = item.quantity + delta;
      if (quantity < 0) return state;

      const updatedItem = { ...item, quantity, updatedAt: new Date().toISOString() };
      const movement: StockMovement = {
        id: crypto.randomUUID(),
        itemId: item.id,
        itemCode: item.itemCode,
        itemName: item.name,
        type: action.payload.type,
        quantity: action.payload.quantity,
        note: action.payload.note,
        performedBy: action.payload.performedBy,
        createdAt: new Date().toISOString()
      };

      return {
        ...state,
        items: state.items.map((candidate) => (candidate.id === item.id ? updatedItem : candidate)),
        movements: [movement, ...state.movements]
      };
    }
    case 'reset-demo':
      return initialState;
    default:
      return state;
  }
}

type InventoryContextValue = State & {
  addItem: (input: InventoryInput) => void;
  updateItem: (id: string, input: InventoryInput) => void;
  deleteItem: (id: string) => void;
  recordMovement: (input: MovementInput) => { ok: boolean; message?: string };
  setRole: (role: UserRole) => void;
  setLowStockThreshold: (value: number) => void;
  resetDemoData: () => void;
};

const InventoryContext = createContext<InventoryContextValue | null>(null);

export function InventoryProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        dispatch({ type: 'hydrate', payload: { hydrated: true } });
        return;
      }
      const parsed = JSON.parse(raw) as Partial<State>;
      dispatch({
        type: 'hydrate',
        payload: {
          items: parsed.items?.length ? parsed.items : mockInventory,
          movements: parsed.movements?.length ? parsed.movements : mockMovements,
          activeRole: parsed.activeRole ?? 'admin',
          activeUser: parsed.activeUser ?? mockUsers[0],
          lowStockThreshold: parsed.lowStockThreshold ?? 10
        }
      });
    } catch {
      dispatch({ type: 'hydrate', payload: { hydrated: true } });
    }
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        items: state.items,
        movements: state.movements,
        activeRole: state.activeRole,
        activeUser: state.activeUser,
        lowStockThreshold: state.lowStockThreshold
      })
    );
  }, [state]);

  const value = useMemo<InventoryContextValue>(() => {
    return {
      ...state,
      addItem: (input) => dispatch({ type: 'add-item', payload: input }),
      updateItem: (id, input) => dispatch({ type: 'update-item', payload: { id, input } }),
      deleteItem: (id) => dispatch({ type: 'delete-item', payload: { id } }),
      recordMovement: (input) => {
        const item = state.items.find((candidate) => candidate.id === input.itemId);
        if (!item) return { ok: false, message: 'Item not found.' };
        if (input.type === 'out' && item.quantity < input.quantity) {
          return { ok: false, message: 'Stock cannot go below zero.' };
        }
        dispatch({ type: 'record-movement', payload: input });
        return { ok: true };
      },
      setRole: (role) => dispatch({ type: 'set-role', payload: role }),
      setLowStockThreshold: (value) => dispatch({ type: 'set-threshold', payload: value }),
      resetDemoData: () => dispatch({ type: 'reset-demo' })
    };
  }, [state]);

  return <InventoryContext.Provider value={value}>{children}</InventoryContext.Provider>;
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) throw new Error('useInventory must be used within InventoryProvider');
  return context;
}
