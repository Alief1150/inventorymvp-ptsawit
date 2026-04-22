"use client";

import * as XLSX from 'xlsx';
import type { InventoryItem, StockMovement } from '@/lib/types';

export function exportInventoryCsv(items: InventoryItem[]) {
  const header = ['Item Code', 'Name', 'Category', 'Quantity', 'Min Stock', 'Location', 'Unit', 'Status', 'Updated At'];
  const rows = items.map((item) => [
    item.itemCode,
    item.name,
    item.category,
    item.quantity,
    item.minStock,
    item.location,
    item.unit,
    item.status,
    item.updatedAt
  ]);

  downloadBlob([header, ...rows].map((row) => row.map(csvCell).join(',')).join('\n'), 'bpn-inventory-report.csv', 'text/csv;charset=utf-8;');
}

export function exportInventoryXlsx(items: InventoryItem[]) {
  const worksheet = XLSX.utils.json_to_sheet(items);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventory');
  XLSX.writeFile(workbook, 'bpn-inventory-report.xlsx');
}

export function exportMovementsCsv(movements: StockMovement[]) {
  const header = ['Date', 'Item Code', 'Item Name', 'Type', 'Quantity', 'Performed By', 'Note'];
  const rows = movements.map((movement) => [
    movement.createdAt,
    movement.itemCode,
    movement.itemName,
    movement.type,
    movement.quantity,
    movement.performedBy,
    movement.note
  ]);

  downloadBlob([header, ...rows].map((row) => row.map(csvCell).join(',')).join('\n'), 'bpn-movement-report.csv', 'text/csv;charset=utf-8;');
}

function csvCell(value: string | number) {
  const stringValue = String(value).replaceAll('"', '""');
  return `"${stringValue}"`;
}

function downloadBlob(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
