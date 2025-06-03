
"use client";

import DataInputForm from '@/components/admin/DataInputForm';
import { useLanguage } from "@/hooks/useLanguage";
import { CardDescription, CardTitle }_ from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react'; // For managing table data if needed
import Image from 'next/image';

// Mock data for display, actual data would come from Firestore
interface WeeklyActionEntry {
  id: string;
  translatorName: string;
  week: string;
  actions: number;
}

const MOCK_WEEKLY_ACTIONS_DATA: WeeklyActionEntry[] = [
  { id: 'wa1', translatorName: 'Elena Petrova', week: '2023-W34', actions: 120 },
  { id: 'wa2', translatorName: 'John Doe', week: '2023-W34', actions: 110 },
  { id: 'wa3', translatorName: 'Elena Petrova', week: '2023-W33', actions: 105 },
];


export default function AdminWeeklyActionsPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [actionsData, setActionsData] = useState<WeeklyActionEntry[]>(MOCK_WEEKLY_ACTIONS_DATA);


  const handleSaveWeeklyActions = (data: any) => {
    console.log("Saving Weekly Actions:", data);
    // Implement Firestore save logic here
    // This would likely update or add to the actionsData state and Firestore
    toast({
      title: "Actions Saved",
      description: `Weekly actions for ${data.translatorId} in ${data.week} saved.`,
    });
  };
  
  const handleDeleteAllWeeklyActions = () => {
    console.log("Deleting All Weekly Actions Data");
    setActionsData([]); // Clear local state
    // Implement Firestore clear logic here
    toast({
      title: "Data Deleted",
      description: "All weekly actions data has been cleared.",
      variant: "destructive",
    });
  };


  return (
    <div className="space-y-8">
      <div>
        <CardTitle className="text-2xl font-semibold">{t('navigation.weeklyActions')}</CardTitle>
        <CardDescription>Track number of actions per user, per week.</CardDescription>
      </div>
      <DataInputForm 
        formType="weekly-actions" 
        onSave={handleSaveWeeklyActions}
        onClearAll={handleDeleteAllWeeklyActions}
      />

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Recorded Weekly Actions</h3>
        {actionsData.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Translator</TableHead>
                <TableHead>Week</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {actionsData.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.translatorName}</TableCell>
                  <TableCell>{entry.week}</TableCell>
                  <TableCell className="text-right">{entry.actions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
        <div className="border rounded-lg p-6 min-h-[200px] flex flex-col items-center justify-center bg-muted/30">
            <Image src="https://placehold.co/200x150.png?text=No+Actions+Data" alt="No Actions Data" width={200} height={150} data-ai-hint="empty list" className="rounded-md opacity-60 mb-4" />
            <p className="text-muted-foreground">{t('dashboard.noData')}</p>
        </div>
        )}
      </div>
    </div>
  );
}

