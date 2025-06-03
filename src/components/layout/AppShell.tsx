
"use client";

import React, { type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { NAV_ITEMS, ROLES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import LanguageToggle from './LanguageToggle';
import UserNav from './UserNav';
import * as LucideIcons from 'lucide-react'; // Import all icons

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const { t } = useLanguage();

  const getIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    return IconComponent ? <IconComponent className="mr-2 h-5 w-5" /> : null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center px-4 md:px-8">
          <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
            {/* Replace with an actual logo SVG or Image if available */}
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="font-bold text-xl font-headline">{t('appName')}</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => {
              if (item.adminOnly && user?.role !== ROLES.ADMIN) {
                return null;
              }
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              return (
                <Button
                  key={item.href}
                  variant={isActive ? 'secondary' : 'ghost'}
                  asChild
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  <Link href={item.href}>
                    {getIcon(item.icon)}
                    {t(`navigation.${item.labelKey}`)}
                  </Link>
                </Button>
              );
            })}
          </nav>

          <div className="flex flex-1 items-center justify-end space-x-2">
            <LanguageToggle />
            <UserNav />
            {/* Mobile Menu Trigger (to be implemented with Sheet or Dropdown) */}
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
               <LucideIcons.Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      
      {/* Mobile Navigation (placeholder, implement with Sheet) */}
      {/* <div className="md:hidden border-t">
        <nav className="flex flex-col p-4 space-y-2">
           {NAV_ITEMS.map((item) => ...)}
        </nav>
      </div> */}

      <main className="flex-1 container max-w-screen-2xl px-4 md:px-8 py-8">
        {children}
      </main>

      <footer className="border-t">
        <div className="container max-w-screen-2xl px-4 md:px-8 py-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {t('appName')}. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
