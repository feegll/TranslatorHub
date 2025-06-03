
"use client";

// Note: This is the ADMIN spenders management page, distinct from the public /spenders page.
// It might share some components but will have more controls.

import { useLanguage } from "@/hooks/useLanguage";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

export default function AdminSpendersPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
       <div>
        <CardTitle className="text-2xl font-semibold">{t('navigation.spenders')}</CardTitle>
        <CardDescription>Manage all spenders and their contributions.</CardDescription>
      </div>
      
      <div className="flex justify-end">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> {t('spenders.addSpender')}
        </Button>
      </div>

      {/* Placeholder for admin spenders table */}
       <div className="border rounded-lg p-6 min-h-[300px] flex flex-col items-center justify-center bg-muted/30">
        <Image src="https://placehold.co/300x200.png?text=Admin+Spenders+Table" alt="Admin Spenders Table Placeholder" width={300} height={200} data-ai-hint="finance chart" className="rounded-md opacity-60 mb-4" />
        <p className="text-muted-foreground">Admin spenders management table will be displayed here.</p>
        <p className="text-sm text-muted-foreground">Includes full CRUD operations for spenders.</p>
      </div>
    </div>
  );
}
