import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[50vh] w-full flex flex-col items-center justify-center bg-background">
      <Loader2 className="w-8 h-8 text-primary animate-spin" />
      <p className="mt-4 text-sm text-muted-foreground animate-pulse">Loading compliance data...</p>
    </div>
  );
}
