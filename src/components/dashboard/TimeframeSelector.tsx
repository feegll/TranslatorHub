
"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export type Timeframe = 'daily' | 'weekly' | 'monthly';

interface TimeframeSelectorProps {
  selectedTimeframe: Timeframe;
  onTimeframeChange: (timeframe: Timeframe) => void;
}

export default function TimeframeSelector({ selectedTimeframe, onTimeframeChange }: TimeframeSelectorProps) {
  const { t } = useLanguage();
  const timeframes: { key: Timeframe; labelKey: string }[] = [
    { key: 'daily', labelKey: 'dashboard.timeframes.daily' },
    { key: 'weekly', labelKey: 'dashboard.timeframes.weekly' },
    { key: 'monthly', labelKey: 'dashboard.timeframes.monthly' },
  ];

  return (
    <div className="flex space-x-2 rounded-md bg-muted p-1">
      {timeframes.map((tf) => (
        <Button
          key={tf.key}
          variant={selectedTimeframe === tf.key ? 'default' : 'ghost'}
          onClick={() => onTimeframeChange(tf.key)}
          className={`flex-1 transition-all duration-150 ease-in-out ${selectedTimeframe === tf.key ? 'shadow-md' : ''}`}
        >
          {t(tf.labelKey)}
        </Button>
      ))}
    </div>
  );
}
