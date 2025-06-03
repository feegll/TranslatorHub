
"use client";

import DataInputForm from '@/components/admin/DataInputForm';
import { useLanguage } from "@/hooks/useLanguage";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';

export default function AdminMonthlyInputPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const handleSaveMonthlyData = (data: any) => {
    console.log("Saving Monthly Data:", data);
    // Implement Firestore save logic here
    toast({
      title: "Data Saved",
      description: `Monthly input for ${data.month} has been saved.`,
    });
  };

  const handleDeleteAllMonthlyData = () => {
    console.log("Deleting All Monthly Data");
    // Implement Firestore clear logic here
    toast({
      title: "Data Deleted",
      description: "All monthly input values have been cleared.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <CardTitle className="text-2xl font-semibold">{t('navigation.monthlyInput')}</CardTitle>
        <CardDescription>Manually enter monthly performance values for translators.</CardDescription>
      </div>
      <DataInputForm 
        formType="monthly" 
        onSave={handleSaveMonthlyData} 
        onClearAll={handleDeleteAllMonthlyData} 
      />
    </div>
  );
}
