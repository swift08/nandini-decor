'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error for debugging
    if (process.env.NODE_ENV === 'development') {
      console.error('Error boundary caught:', error);
    }
  }, [error]);

  // Handle unhandled promise rejections
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (process.env.NODE_ENV === 'development') {
        console.error('Unhandled promise rejection:', event.reason);
      }
      // Prevent default error handling
      event.preventDefault();
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50">
      <div className="text-center p-8 max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">Something went wrong!</h2>
        <p className="text-lg mb-6 text-gray-600">
          We're sorry, but an unexpected error occurred. This might be a temporary issue.
        </p>
        {error.message && (
          <pre className="mt-4 mb-6 text-sm text-red-600 bg-red-50 p-4 rounded overflow-auto">
            {error.message}
          </pre>
        )}
        <div className="space-x-4">
          <button
            onClick={() => reset()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors"
          >
            Try again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
}

