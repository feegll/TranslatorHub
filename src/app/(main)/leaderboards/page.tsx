
"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, TrendingUp, ListChecks, UserCircle } from "lucide-react";
import Image from 'next/image';

// Mock Data - Replace with actual data fetching
const MOCK_LEGENDS = [
  { id: '1', name: 'Legend Alpha', level: 'Legend', score: 10000, avatarUrl: 'https://placehold.co/64x64.png?text=L1', data_ai_hint: "man avatar" },
  { id: '2', name: 'Legend Beta', level: 'Legend', score: 9500, avatarUrl: 'https://placehold.co/64x64.png?text=L2', data_ai_hint: "woman avatar" },
  { id: '3', name: 'Legend Gamma', level: 'Legend', score: 9200, avatarUrl: 'https://placehold.co/64x64.png?text=L3', data_ai_hint: "person avatar" },
  // ... add up to 9
];

const MOCK_WEEKLY_GROWTH = [
  { id: '10', name: 'Growth Star', growth: '+25%', avatarUrl: 'https://placehold.co/40x40.png?text=GS', data_ai_hint: "profile photo" },
  { id: '11', name: 'Rising Talent', growth: '+22%', avatarUrl: 'https://placehold.co/40x40.png?text=RT', data_ai_hint: "user icon" },
];

const MOCK_WEEKLY_ACTIONS = [
  { id: '20', name: 'Action Hero', actions: 500, avatarUrl: 'https://placehold.co/40x40.png?text=AH', data_ai_hint: "gamer avatar" },
  { id: '21', name: 'Task Master', actions: 480, avatarUrl: 'https://placehold.co/40x40.png?text=TM', data_ai_hint: "professional photo" },
];


export default function LeaderboardsPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline tracking-tight">
        {t('navigation.leaderboards')}
      </h1>

      <Card className="shadow-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary to-accent text-primary-foreground p-6">
          <div className="flex items-center space-x-3">
            <Award className="h-10 w-10" />
            <div>
              <CardTitle className="text-2xl font-headline">{t('leaderboards.top9Legends')}</CardTitle>
              <CardDescription className="text-primary-foreground/80">The all-time greats of our community.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_LEGENDS.slice(0, 9).map((legend, index) => (
            <div key={legend.id} className="flex items-center space-x-4 p-4 bg-card-foreground/5 rounded-lg hover:shadow-md transition-shadow">
              <span className="text-2xl font-bold text-accent">{index + 1}</span>
              <Image src={legend.avatarUrl} alt={legend.name} width={64} height={64} className="rounded-full border-2 border-primary" data-ai-hint={legend.data_ai_hint} />
              <div>
                <p className="font-semibold text-lg text-foreground">{legend.name}</p>
                <p className="text-sm text-muted-foreground">{legend.level} - {legend.score} pts</p>
              </div>
            </div>
          ))}
           {MOCK_LEGENDS.length === 0 && <p className="text-muted-foreground col-span-full text-center py-4">{t('dashboard.noData')}</p>}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-green-500" />
              <CardTitle className="font-headline">{t('leaderboards.bestWeeklyGrowth')}</CardTitle>
            </div>
             <CardDescription>Movers and shakers of the week.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {MOCK_WEEKLY_GROWTH.map(item => (
                <li key={item.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-md">
                  <div className="flex items-center space-x-3">
                    <Image src={item.avatarUrl} alt={item.name} width={40} height={40} className="rounded-full" data-ai-hint={item.data_ai_hint}/>
                    <span className="font-medium text-foreground">{item.name}</span>
                  </div>
                  <span className="font-semibold text-green-500">{item.growth}</span>
                </li>
              ))}
              {MOCK_WEEKLY_GROWTH.length === 0 && <p className="text-muted-foreground text-center py-4">{t('dashboard.noData')}</p>}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center space-x-2">
              <ListChecks className="h-6 w-6 text-blue-500" />
              <CardTitle className="font-headline">{t('leaderboards.mostWeeklyActions')}</CardTitle>
            </div>
            <CardDescription>Top performers by activity.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {MOCK_WEEKLY_ACTIONS.map(item => (
                <li key={item.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-md">
                  <div className="flex items-center space-x-3">
                     <Image src={item.avatarUrl} alt={item.name} width={40} height={40} className="rounded-full" data-ai-hint={item.data_ai_hint}/>
                    <span className="font-medium text-foreground">{item.name}</span>
                  </div>
                  <span className="font-semibold text-blue-500">{item.actions} {t('navigation.weeklyActions').toLowerCase()}</span>
                </li>
              ))}
              {MOCK_WEEKLY_ACTIONS.length === 0 && <p className="text-muted-foreground text-center py-4">{t('dashboard.noData')}</p>}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
