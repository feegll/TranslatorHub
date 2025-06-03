
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as LucideIcons from "lucide-react";

interface MetricsCardProps {
  title: string;
  value: string | number;
  iconName: keyof typeof LucideIcons;
  description?: string;
  colorClass?: string; // e.g., text-green-500 or text-red-500
}

export default function MetricsCard({ title, value, iconName, description, colorClass }: MetricsCardProps) {
  const IconComponent = LucideIcons[iconName] || LucideIcons.Activity;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <IconComponent className={`h-5 w-5 ${colorClass || 'text-primary'}`} />
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold ${colorClass || 'text-foreground'}`}>
          {value}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground pt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
