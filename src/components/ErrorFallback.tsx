import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <Alert variant="destructive" className="m-4">
      <AlertTitle>Algo salió mal</AlertTitle>
      <AlertDescription>
        <div className="mt-2">
          <p className="text-sm text-red-800">{error.message}</p>
          <Button 
            onClick={resetErrorBoundary}
            variant="outline"
            className="mt-4"
          >
            Intentar de nuevo
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}

export default ErrorFallback;