
"use client";

import { useEffect, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ROLES, type Role } from '@/lib/constants';
import { useLanguage } from '@/hooks/useLanguage';
import { Skeleton } from '@/components/ui/skeleton'; // For loading state

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: Role[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace(`/login?redirect=${pathname}`);
      return;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      // Could redirect to an "access-denied" page or home
      router.replace('/dashboard'); 
      // Or show a message: alert(t('general.noAccess'));
      return;
    }

  }, [user, loading, router, allowedRoles, pathname, t]);

  if (loading) {
    return (
      <div className="flex flex-col space-y-4 p-4">
        <Skeleton className="h-12 w-full rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    // This state should ideally be brief due to redirection
    // Or, you could show a more specific "Access Denied" component here
     return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <h2 className="text-2xl font-semibold mb-4">{t('general.noAccess')}</h2>
        <p className="text-muted-foreground">{t('general.loading')}</p>
      </div>
    );
  }

  return <>{children}</>;
}
