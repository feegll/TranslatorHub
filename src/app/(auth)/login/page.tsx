
"use client";

import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
     return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      </div>
    );
  }
  
  // Prevent rendering login form if user is already known (even if redirect is pending)
  if (user) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <p>Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-4">
       <div className="absolute inset-0 opacity-5">
        {/* You can replace this with a more thematic background image */}
        <Image 
          src="https://placehold.co/1920x1080.png?text=Subtle+Background"
          alt="Background"
          layout="fill"
          objectFit="cover"
          data-ai-hint="abstract pattern"
        />
      </div>
      <div className="relative z-10">
        <LoginForm />
      </div>
    </div>
  );
}
