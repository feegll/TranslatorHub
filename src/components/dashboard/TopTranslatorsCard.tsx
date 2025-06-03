
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Translator } from "@/types";
import { Trophy, Star, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface TopTranslatorsCardProps {
  translators: Translator[]; // Expecting top 3
}

const levelIcons: Record<string, React.ElementType> = {
  Expert: Star,
  Legend: Trophy,
  'Top Performer': ShieldCheck,
};

export default function TopTranslatorsCard({ translators }: TopTranslatorsCardProps) {
  const { t } = useLanguage();

  if (!translators || translators.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline">{t('dashboard.topTranslators')}</CardTitle>
          <CardDescription>{t('dashboard.noData')}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{t('dashboard.noData')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg col-span-1 md:col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle className="font-headline text-xl">{t('dashboard.topTranslators')}</CardTitle>
        <CardDescription>Current leaders in the community.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {translators.slice(0, 3).map((translator, index) => {
            const LevelIcon = levelIcons[translator.level] || Star;
            return (
            <li key={translator.id} className="flex items-center space-x-3 p-3 bg-secondary/30 rounded-lg hover:bg-secondary/60 transition-colors">
              <Avatar className="h-10 w-10 border-2 border-primary">
                <AvatarImage src={translator.avatarUrl || `https://placehold.co/40x40.png?text=${translator.name[0]}`} alt={translator.name} data-ai-hint="profile avatar" />
                <AvatarFallback>{translator.name.substring(0,2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-md font-semibold text-foreground">{translator.name}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                   <LevelIcon className="h-3.5 w-3.5 mr-1 text-accent" />
                  {translator.level}
                </div>
              </div>
            </li>
          )})}
        </ul>
      </CardContent>
    </Card>
  );
}
