import type { ResponseInterceptor } from "../http/types";

/**
 * Logs every API response.
 * @param response - HTTP response to log
 * @returns Unmodified response
 */
export const LoggerMiddleware: ResponseInterceptor = async (response) => {
  console.log("API Response:", response.status, response.data);
  return response;
};
