
"use client";

import { useState }_ from 'react';
import { useLanguage } from "@/hooks/useLanguage";
import { useAuth } from "@/hooks/useAuth";
import { ROLES } from "@/lib/constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { PlusCircle, Edit3, Trash2, Users, CircleDollarSign } from "lucide-react";
import type { Spender } from "@/types";

// Mock Data - Replace with actual data fetching and state management
const MOCK_SPENDERS: Spender[] = [
  { id: 'sp1', name: 'Generous Corp', amountSpent: 5000 },
  { id: 'sp2', name: 'Big Spender Inc.', amountSpent: 12000 },
  { id: 'sp3', name: 'Charity Foundation X', amountSpent: 7500 },
];

export default function SpendersPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [spenders, setSpenders] = useState<Spender[]>(MOCK_SPENDERS);
  const [showDialog, setShowDialog] = useState(false);
  const [currentSpender, setCurrentSpender] = useState<Spender | null>(null);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const isAdmin = user?.role === ROLES.ADMIN;

  const totalSpenders = spenders.length;
  const totalAmountSpent = spenders.reduce((sum, spender) => sum + spender.amountSpent, 0);

  const handleAddSpender = () => {
    setCurrentSpender(null);
    setName('');
    setAmount('');
    setShowDialog(true);
  };

  const handleEditSpender = (spender: Spender) => {
    setCurrentSpender(spender);
    setName(spender.name);
    setAmount(String(spender.amountSpent));
    setShowDialog(true);
  };

  const handleDeleteSpender = (id: string) => {
    // Add confirmation dialog here
    setSpenders(prev => prev.filter(s => s.id !== id));
  };

  const handleSaveSpender = ()_ => {
    if (!name || !amount) return; // Basic validation
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) return;

    if (currentSpender) { // Editing
      setSpenders(prev => prev.map(s => s.id === currentSpender.id ? { ...s, name, amountSpent: numAmount } : s));
    } else { // Adding
      setSpenders(prev => [...prev, { id: `sp${Date.now()}`, name, amountSpent: numAmount }]);
    }
    setShowDialog(false);
  };


  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          {t('spenders.title')}
        </h1>
        {isAdmin && (
          <Button onClick={handleAddSpender}>
            <PlusCircle className="mr-2 h-4 w-4" /> {t('spenders.addSpender')}
          </Button>
        )}
      </div>

      {isAdmin && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t('spenders.totalSpenders')}</CardTitle>
              <Users className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalSpenders}</div>
            </CardContent>
          </Card>
          <Card className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{t('spenders.totalAmountSpent')}</CardTitle>
              <CircleDollarSign className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalAmountSpent.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card className="shadow-lg">
        <CardHeader>
            <CardTitle className="text-xl font-headline">Spender List</CardTitle>
            <CardDescription>Overview of all spenders and their contributions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('spenders.nameHeader')}</TableHead>
                <TableHead className="text-right">{t('spenders.amountHeader')}</TableHead>
                {isAdmin && <TableHead className="text-right">{t('spenders.actionsHeader')}</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {spenders.map((spender) => (
                <TableRow key={spender.id}>
                  <TableCell className="font-medium">{spender.name}</TableCell>
                  <TableCell className="text-right">${spender.amountSpent.toLocaleString()}</TableCell>
                  {isAdmin && (
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleEditSpender(spender)}>
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="icon" onClick={() => handleDeleteSpender(spender.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
              {spenders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={isAdmin ? 3 : 2} className="text-center text-muted-foreground h-24">
                    {t('dashboard.noData')}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {isAdmin && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{currentSpender ? t('spenders.editSpender') : t('spenders.addSpender')}</DialogTitle>
              <DialogDescription>
                {currentSpender ? "Update the spender's details." : "Add a new spender to the list."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  {t('spenders.nameHeader')}
                </Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">
                  {t('spenders.amountHeader')}
                </Label>
                <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSaveSpender}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

