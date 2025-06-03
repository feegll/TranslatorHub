
"use client";

import DataInputForm from '@/components/admin/DataInputForm';
import { useLanguage } from "@/hooks/useLanguage";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';

export default function AdminDailyInputPage() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleSaveDailyData = (data: any) => {
    console.log("Saving Daily Data:", data);
    // Implement Firestore save logic here
    toast({
      title: "Data Saved",
      description: `Daily input for ${data.date?.toLocaleDateString()} has been saved.`,
      variant: "default",
    });
  };

  const handleClearDailyData = () => {
    console.log("Clearing Daily Data");
    // Implement Firestore clear logic here
    toast({
      title: "Data Cleared",
      description: "All daily input values have been reset.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <CardTitle className="text-2xl font-semibold">{t('navigation.dailyInput')}</CardTitle>
        <CardDescription>Manually enter daily performance values for translators.</CardDescription>
      </div>
      <DataInputForm 
        formType="daily" 
        onSave={handleSaveDailyData} 
        onClearAll={handleClearDailyData} 
      />
    </div>
  );
}
