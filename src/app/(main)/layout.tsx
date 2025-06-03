
import type { ReactNode } from 'react';
import AppShell from '@/components/layout/AppShell';
import ProtectedRoute from '@/components/shared/ProtectedRoute';

export default function MainAppLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <AppShell>
        {children}
      </AppShell>
    </ProtectedRoute>
  );
}
