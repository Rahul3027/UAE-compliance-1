import Link from 'next/link';
import { FileQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="p-4 bg-muted rounded-full text-muted-foreground mb-6">
        <FileQuestion className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-3">404 - Page Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        The page or educational module you are looking for does not exist or has been moved.
      </p>
      <Button asChild variant="default">
        <Link href="/dashboard">Return to Dashboard</Link>
      </Button>
    </div>
  );
}
