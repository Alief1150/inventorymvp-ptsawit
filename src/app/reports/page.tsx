"use client";

import { Printer, FileSpreadsheet, FileText, FileDown } from 'lucide-react';
import { AppShell } from '@/components/app-shell';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@/components/ui';
import { useInventory } from '@/components/inventory-provider';
import { exportInventoryCsv, exportInventoryXlsx, exportMovementsCsv } from '@/lib/report-export';

export default function ReportsPage() {
  const { items, movements } = useInventory();

  return (
    <AppShell>
      <div className="grid gap-5 xl:grid-cols-12">
        <div className="xl:col-span-7 space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>Report exports</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 md:grid-cols-2">
              <ActionButton icon={FileText} label="CSV export" onClick={() => exportInventoryCsv(items)} />
              <ActionButton icon={FileSpreadsheet} label="Excel export" onClick={() => exportInventoryXlsx(items)} />
              <ActionButton icon={FileDown} label="Movement CSV" onClick={() => exportMovementsCsv(movements)} />
              <ActionButton icon={Printer} label="Print / PDF" onClick={() => window.print()} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Print-friendly preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <p>Use the print button to open the browser print dialog and save as PDF.</p>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                <div className="flex items-center justify-between">
                  <span>Inventory items</span>
                  <Badge tone="default">{items.length}</Badge>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span>Movement records</span>
                  <Badge tone="default">{movements.length}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="xl:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle>Export coverage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-300">
              <p>PDF: via print dialog and save-as-PDF.</p>
              <p>Excel: generated with `.xlsx` output.</p>
              <p>CSV: available for inventory and movement data.</p>
              <p>Print view: dedicated layout in this page.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

function ActionButton({ icon: Icon, label, onClick }: { icon: React.ComponentType<{ className?: string }>; label: string; onClick: () => void }) {
  return (
    <Button variant="secondary" className="h-24 flex-col items-start justify-between p-4 text-left" onClick={onClick}>
      <Icon className="h-5 w-5 text-cyan-300" />
      <span>{label}</span>
    </Button>
  );
}
