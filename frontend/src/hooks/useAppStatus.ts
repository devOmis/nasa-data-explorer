import { useState, useCallback } from "react";

/**
 * Global app status hook for loading and error state.
 */
export function useAppStatus() {
  const [isLoaded, setIsLoaded] = useState(false); // Start as not loaded
  const [error, setError] = useState<string | null>(null);

  // Call this to start loading
  const startLoading = useCallback(() => {
    setIsLoaded(false);
    setError(null);
  }, []);

  // Call this to finish loading
  const finishLoading = useCallback(() => {
    setIsLoaded(true);
    setError(null);
  }, []);

  // Call this to set an error
  const setAppError = useCallback((err: string) => {
    setIsLoaded(true);
    setError(err);
  }, []);

  return {
    isLoaded,
    error,
    startLoading,
    finishLoading,
    setAppError,
  };
}
