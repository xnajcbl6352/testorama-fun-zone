type ErrorType = 'validation' | 'network' | 'auth' | 'unknown';

interface AppError extends Error {
  type: ErrorType;
  context?: Record<string, unknown>;
}

export class CustomError implements AppError {
  name: string;
  message: string;
  type: ErrorType;
  context?: Record<string, unknown>;

  constructor(message: string, type: ErrorType = 'unknown', context?: Record<string, unknown>) {
    this.name = 'CustomError';
    this.message = message;
    this.type = type;
    this.context = context;
  }
}

export const handleError = (error: Error | AppError): void => {
  if ('type' in error) {
    // Log error based on type
    console.error(`[${error.type}] ${error.message}`, error.context);
  } else {
    console.error('[unknown]', error);
  }
  // Aquí se pueden agregar integraciones con servicios de monitoreo
};
