
"use client";

import { useState, type FormEvent } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/ui/date-picker'; // Assuming a DatePicker component exists or will be created
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MOCK_TRANSLATORS } from '@/app/(main)/dashboard/page'; // Temporary for translator list
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Save, Trash2, CalendarDays } from 'lucide-react';

interface DataInputFormProps {
  formType: 'daily' | 'weekly' | 'monthly' | 'weekly-actions';
  onSave: (data: any) => void; // Replace 'any' with specific data types
  onClearAll?: () => void; // For "Quick Clear" or "Delete All"
}

export default function DataInputForm({ formType, onSave, onClearAll }: DataInputFormProps) {
  const { t } = useLanguage();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [translatorId, setTranslatorId] = useState<string>('');
  const [value, setValue] = useState<string>(''); // For balance or actions
  const [week, setWeek] = useState<string>(''); // For weekly inputs
  const [month, setMonth] = useState<string>(''); // For monthly inputs
  const [daysInMonth, setDaysInMonth] = useState<number>(30);


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const commonData = { translatorId, value: parseFloat(value) || 0 };
    let dataToSave = {};

    switch (formType) {
      case 'daily':
        dataToSave = { ...commonData, date };
        break;
      case 'weekly':
      case 'weekly-actions':
        dataToSave = { ...commonData, week }; // 'week' would be e.g., "2023-W34"
        break;
      case 'monthly':
        dataToSave = { ...commonData, month, daysInMonth }; // 'month' would be e.g., "2023-08"
        break;
    }
    onSave(dataToSave);
    // Reset form fields (optional)
  };
  
  // Placeholder for days in month selection for daily input
  const renderDaysInMonthSelector = () => (
    <div className="space-y-2">
      <Label htmlFor="daysInMonth">Days in Month (for Daily Input)</Label>
      <Select value={String(daysInMonth)} onValueChange={(val) => setDaysInMonth(Number(val))}>
        <SelectTrigger id="daysInMonth">
          <SelectValue placeholder="Select days" />
        </SelectTrigger>
        <SelectContent>
          {[28, 29, 30, 31].map(d => <SelectItem key={d} value={String(d)}>{d} days</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );


  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl">
        <CardHeader>
            <CardTitle className="flex items-center"><CalendarDays className="mr-2 h-5 w-5 text-primary"/>{t(`navigation.${formType}`)} Form</CardTitle>
            <CardDescription>Enter data for translator performance.</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
                {formType === 'daily' && (
                    <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    {/* Replace with ShadCN Date Picker if available, or build one */}
                     <DatePicker date={date} onDateChange={setDate} />
                    </div>
                )}

                {(formType === 'weekly' || formType === 'weekly-actions') && (
                    <div className="space-y-2">
                    <Label htmlFor="week">Week (e.g., 2023-W34)</Label>
                    <Input id="week" type="text" value={week} onChange={(e) => setWeek(e.target.value)} placeholder="YYYY-Www" />
                    </div>
                )}

                {formType === 'monthly' && (
                    <div className="space-y-2">
                    <Label htmlFor="month">Month (e.g., 2023-08)</Label>
                    <Input id="month" type="text" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="YYYY-MM"/>
                    </div>
                )}
                
                {formType === 'daily' && renderDaysInMonthSelector()}


                <div className="space-y-2">
                    <Label htmlFor="translator">Translator</Label>
                    <Select value={translatorId} onValueChange={setTranslatorId}>
                    <SelectTrigger id="translator">
                        <SelectValue placeholder="Select Translator" />
                    </SelectTrigger>
                    <SelectContent>
                        {MOCK_TRANSLATORS.map(translator => (
                        <SelectItem key={translator.id} value={translator.id}>{translator.name}</SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="value">
                    {formType === 'weekly-actions' ? 'Number of Actions' : 'Balance'}
                    </Label>
                    <Input id="value" type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter value" />
                </div>
                 <CardFooter className="flex justify-between p-0 pt-6">
                    {onClearAll && (
                    <Button type="button" variant="destructive" onClick={onClearAll}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        {formType === 'daily' ? t('adminPanel.quickClear') : t('adminPanel.deleteAll')}
                    </Button>
                    )}
                     <Button type="submit" className="ml-auto">
                        <Save className="mr-2 h-4 w-4" />
                        {t('adminPanel.saveValues')}
                    </Button>
                </CardFooter>
            </form>
        </CardContent>
    </Card>
  );
}

// Basic DatePicker component (can be moved to ui/date-picker.tsx and improved)
// For a real app, use shadcn's Calendar + Popover for a proper date picker
function DatePicker({ date, onDateChange }: { date?: Date, onDateChange: (date?: Date) => void }) {
  return (
    <Input 
      type="date" 
      value={date ? date.toISOString().split('T')[0] : ''}
      onChange={(e) => onDateChange(e.target.value ? new Date(e.target.value) : undefined)}
    />
  );
}

