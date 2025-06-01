import type { HttpResponse } from "../http/types";

/**
 * Retry wrapper for HTTP requests.
 * @param retries - Maximum retry attempts
 * @param delay - Delay in milliseconds between retries
 * @returns Middleware that retries the request
 */
export const withRetry = (retries = 3, delay = 500) => {
  return async function retryMiddleware<T>(
    requestFn: () => Promise<HttpResponse<T>>,
  ): Promise<HttpResponse<T>> {
    let attempts = 0;
    while (attempts < retries) {
      try {
        return await requestFn();
      } catch (e) {
        attempts++;
        if (attempts >= retries) throw e;
        await new Promise((res) => setTimeout(res, delay));
      }
    }
    throw new Error("Retry attempts exceeded");
  };
};
