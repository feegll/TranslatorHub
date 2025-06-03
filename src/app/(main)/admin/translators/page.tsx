
"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

export default function AdminTranslatorsPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <CardTitle className="text-2xl font-semibold">{t('navigation.translators')}</CardTitle>
        <CardDescription>Manage all translators in the system.</CardDescription>
      </div>
      
      <div className="flex justify-end">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Translator
        </Button>
      </div>

      {/* Placeholder for table or list of translators */}
      <div className="border rounded-lg p-6 min-h-[300px] flex flex-col items-center justify-center bg-muted/30">
        <Image src="https://placehold.co/300x200.png?text=Translators+Table" alt="Translators Table Placeholder" width={300} height={200} data-ai-hint="team users" className="rounded-md opacity-60 mb-4" />
        <p className="text-muted-foreground">Translator management table will be displayed here.</p>
        <p className="text-sm text-muted-foreground">Functionality to add, edit, and view translator details.</p>
      </div>
    </div>
  );
}
