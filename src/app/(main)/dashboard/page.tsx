
"use client";

import { useState, useEffect } from 'react';
import MetricsCard from '@/components/dashboard/MetricsCard';
import TopTranslatorsCard from '@/components/dashboard/TopTranslatorsCard';
import TimeframeSelector, { type Timeframe } from '@/components/dashboard/TimeframeSelector';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { ROLES } from '@/lib/constants';
import type { Translator } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
// Placeholder for AI function, assuming it's available client-side or via a server action
// import { analyzeTranslatorLevel } from '@/ai/flows/level-analyzer'; // This is a server action


// Mock data - replace with actual Firestore data fetching
const MOCK_TRANSLATORS: Translator[] = [
  { id: '1', name: 'Elena Petrova', level: 'Legend', weeklyBalance: 500, weeklyActions: 120, monthlyBalance: 2000, avatarUrl: 'https://placehold.co/40x40.png?text=EP' , data_ai_hint: "woman portrait"},
  { id: '2', name: 'John Doe', level: 'Expert', weeklyBalance: 450, weeklyActions: 110, monthlyBalance: 1800, avatarUrl: 'https://placehold.co/40x40.png?text=JD', data_ai_hint: "man portrait" },
  { id: '3', name: 'Aisha Khan', level: 'Top Performer', weeklyBalance: 300, weeklyActions: 90, monthlyBalance: 1200, avatarUrl: 'https://placehold.co/40x40.png?text=AK', data_ai_hint: "woman face" },
  { id: '4', name: 'Carlos Ruiz', level: 'Regular', weeklyBalance: 150, weeklyActions: 50, monthlyBalance: 600, avatarUrl: 'https://placehold.co/40x40.png?text=CR', data_ai_hint: "man face"},
];

interface DashboardData {
  totalTranslators: number;
  totalBalance: number;
  averageBalance: number;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>('weekly');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [topTranslators, setTopTranslators] = useState<Translator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setLoading(true);
    const fetchData = async () => {
      // In a real app, fetch from Firestore based on user role and timeframe
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay

      // Simulate AI-driven level assignment (if levels weren't pre-set)
      // For now, MOCK_TRANSLATORS already have levels.
      // If levels needed to be dynamic:
      // const updatedTranslators = await Promise.all(MOCK_TRANSLATORS.map(async (translator) => {
      //   if (translator.weeklyBalance && translator.weeklyActions && translator.monthlyBalance) {
      //     try {
      //       const result = await analyzeTranslatorLevel({
      //         name: translator.name,
      //         weeklyBalance: translator.weeklyBalance,
      //         weeklyActions: translator.weeklyActions,
      //         monthlyBalance: translator.monthlyBalance,
      //       });
      //       return { ...translator, level: result.level };
      //     } catch (error) {
      //       console.error("Error analyzing translator level:", error);
      //       return translator; // fallback to original if AI fails
      //     }
      //   }
      //   return translator;
      // }));
      // setTopTranslators(updatedTranslators.sort((a, b) => (b.weeklyBalance || 0) - (a.weeklyBalance || 0)).slice(0, 3));
      
      setTopTranslators(MOCK_TRANSLATORS.sort((a, b) => (b.weeklyBalance || 0) - (a.weeklyBalance || 0)).slice(0, 3));


      if (user?.role === ROLES.ADMIN) {
        setDashboardData({
          totalTranslators: MOCK_TRANSLATORS.length,
          totalBalance: selectedTimeframe === 'daily' ? 5000 : selectedTimeframe === 'weekly' ? 25000 : 100000,
          averageBalance: selectedTimeframe === 'daily' ? 100 : selectedTimeframe === 'weekly' ? 500 : 2000,
        });
      } else {
        // Translator view: limited data
        // Fetch only their own data and top 3
      }
      setLoading(false);
    };

    fetchData();
  }, [selectedTimeframe, user?.role]);

  const handleTimeframeChange = (timeframe: Timeframe) => {
    setSelectedTimeframe(timeframe);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-10 w-1/4" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-32 rounded-lg" />
          <Skeleton className="h-32 rounded-lg" />
          <Skeleton className="h-32 rounded-lg" />
          <Skeleton className="h-32 rounded-lg md:col-span-2 lg:col-span-1" />
        </div>
         <Skeleton className="h-64 rounded-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          {t('dashboard.title')}
        </h1>
        <div className="w-full md:w-auto">
         <TimeframeSelector selectedTimeframe={selectedTimeframe} onTimeframeChange={handleTimeframeChange} />
        </div>
      </div>

      {user?.role === ROLES.ADMIN && dashboardData && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <MetricsCard title={t('dashboard.totalTranslators')} value={dashboardData.totalTranslators} iconName="Users" />
          <MetricsCard title={t('dashboard.totalBalance')} value={`$${dashboardData.totalBalance.toLocaleString()}`} iconName="DollarSign" colorClass="text-green-500" />
          <MetricsCard title={t('dashboard.averageBalance')} value={`$${dashboardData.averageBalance.toLocaleString()}`} iconName="TrendingUp" />
        </div>
      )}
      
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
         <TopTranslatorsCard translators={topTranslators} />
      </div>

      {/* Placeholder for charts or more detailed stats */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
          <CardDescription>Visual representation of key metrics.</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-muted-foreground">Chart placeholder - Coming soon!</p>
           <img src="https://placehold.co/600x300.png?text=Performance+Chart" alt="Performance Chart Placeholder" data-ai-hint="data graph" className="rounded-md opacity-50"/>
        </CardContent>
      </Card>
    </div>
  );
}
