
"use client";

import { useState, type FormEvent } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, LogIn } from 'lucide-react';

export default function LoginForm() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const { login, error: authError } = useAuth(); // Removed loading as login is now sync
  const { t } = useLanguage();
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!identifier || !password) {
      setFormError("Both fields are required."); // Basic validation
      return;
    }

    if (identifier === "admin" && password === "1269") {
      login(identifier, password); // Call login to set session/state
    } else {
      setFormError("Invalid credentials.");
    }
  };

  return (
    <Card className="w-full max-w-md shadow-2xl">
      <CardHeader>
        <CardTitle className="text-3xl font-headline text-center text-primary">{t('appName')}</CardTitle>
        <CardDescription className="text-center">{t('login.title')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="identifier">{t('login.usernameLabel')}</Label>
            <Input
              id="identifier"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="admin or translator@example.com"
              required

            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t('login.passwordLabel')}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required

            />
          </div>
          {(authError || formError) && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Login Failed</AlertTitle>
              <AlertDescription>{authError?.message || formError || t('login.error')}</AlertDescription>
            </Alert>
          )}
          <Button type="submit" className="w-full">
             <LogIn className="mr-2 h-4 w-4" />
            {t('login.submitButton')}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col items-start text-sm text-muted-foreground">
        <p>{t('login.adminCredentials')}</p>
        <p>{t('login.translatorCredentials')}</p>
      </CardFooter>
    </Card>
  );
}
