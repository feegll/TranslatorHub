
"use client";
// This page can serve as an overview or redirect to the first admin tab.
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ADMIN_NAV_ITEMS } from '@/lib/constants';

export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the first admin tab, e.g., Translators
    if (ADMIN_NAV_ITEMS.length > 0) {
      router.replace(ADMIN_NAV_ITEMS[0].href);
    }
  }, [router]);

  return (
    <div className="flex h-full items-center justify-center p-8">
      <p className="text-muted-foreground">Loading admin section...</p>
    </div>
  );
}
