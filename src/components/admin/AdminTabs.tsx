
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/hooks/useLanguage';
import { ADMIN_NAV_ITEMS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import * as LucideIcons from 'lucide-react';

export default function AdminTabs() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent className="mr-2 h-4 w-4" /> : null;
  };

  return (
    <div className="mb-6 border-b">
      <nav className="-mb-px flex space-x-1 overflow-x-auto" aria-label="Tabs">
        {ADMIN_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Button
              key={item.href}
              variant="ghost"
              asChild
              className={`whitespace-nowrap py-3 px-3 border-b-2 font-medium text-sm hover:border-primary hover:text-primary
                ${isActive ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            >
              <Link href={item.href}>
                {getIcon(item.icon)}
                {t(`navigation.${item.labelKey}`)}
              </Link>
            </Button>
          );
        })}
      </nav>
    </div>
  );
}
