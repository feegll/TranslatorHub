
"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import Image from "next/image";

export default function AdminUsersPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <CardTitle className="text-2xl font-semibold">{t('navigation.users')}</CardTitle>
        <CardDescription>Manage user accounts and roles.</CardDescription>
      </div>
      
      <div className="flex justify-end">
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      {/* Placeholder for users table */}
      <div className="border rounded-lg p-6 min-h-[300px] flex flex-col items-center justify-center bg-muted/30">
        <Image src="https://placehold.co/300x200.png?text=Users+Management" alt="Users Management Placeholder" width={300} height={200} data-ai-hint="user list" className="rounded-md opacity-60 mb-4" />
        <p className="text-muted-foreground">User management table will be displayed here.</p>
         <p className="text-sm text-muted-foreground">Assign roles, activate/deactivate accounts.</p>
      </div>
    </div>
  );
}
