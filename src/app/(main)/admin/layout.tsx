
import type { ReactNode } from 'react';
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import AdminTabs from '@/components/admin/AdminTabs';
import { ROLES } from '@/lib/constants';
import { useLanguage } // This hook cannot be used in Server Component
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


// This function will be part of the Server Component or passed as prop if needed in client component
// const getTranslations = async (lang: string) => {
//   if (lang === 'ru') return (await import('@/locales/ru.json')).default;
//   return (await import('@/locales/en.json')).default;
// };

export default function AdminLayout({ children }: { children: ReactNode }) {
  // const { t } = useLanguage(); // Cannot use client hook in server component
  // For server components, you'd typically fetch translations differently or pass t function down
  const adminTitle = "Admin Panel"; // Placeholder for t('adminPanel.title')

  return (
    <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-headline tracking-tight">
            {adminTitle}
          </h1>
          <p className="text-muted-foreground">
            Manage translators, spenders, users, and data inputs.
          </p>
        </div>
        <AdminTabs />
        <Card className="shadow-lg">
          <CardContent className="p-6">
            {children}
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
