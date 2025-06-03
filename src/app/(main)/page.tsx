
"use client";
// This page can be used as a landing/loading page within the protected area,
// or simply redirect immediately.
// For this app, redirecting from src/app/page.tsx is primary,
// but this could be a fallback or if / is hit directly after login.

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function MainRootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return (
    <div className="flex h-full items-center justify-center">
      <p>Loading dashboard...</p>
    </div>
  );
}
