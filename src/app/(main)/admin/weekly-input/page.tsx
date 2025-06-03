
"use client";

import DataInputForm from '@/components/admin/DataInputForm';
import { useLanguage } from "@/hooks/useLanguage";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';

export default function AdminWeeklyInputPage() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleSaveWeeklyData = (data: any) => {
    console.log("Saving Weekly Data:", data);
    // Implement Firestore save logic here
     toast({
      title: "Data Saved",
      description: `Weekly input for ${data.week} has been saved.`,
    });
  };

  const handleDeleteAllWeeklyData = () => {
    console.log("Deleting All Weekly Data");
    // Implement Firestore clear logic for weekly input, leaderboards, dashboard
     toast({
      title: "Data Deleted",
      description: "All weekly input values and related metrics have been cleared.",
      variant: "destructive",
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <CardTitle className="text-2xl font-semibold">{t('navigation.weeklyInput')}</CardTitle>
        <CardDescription>Manually enter weekly performance values for translators.</CardDescription>
      </div>
      <DataInputForm 
        formType="weekly" 
        onSave={handleSaveWeeklyData} 
        onClearAll={handleDeleteAllWeeklyData} 
      />
    </div>
  );
}
