export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * Configuration object for an HTTP request.
 */
export interface HttpRequestConfig {
  /** HTTP method */
  method: HttpMethod;

  /** Endpoint path, appended to baseUrl */
  url: string;

  /** Optional headers for the request */
  headers?: Record<string, string>;

  /** Optional query parameters */
  queryParams?: Record<string, string | number | boolean>;

  /** Optional JSON body (will be stringified) */
  body?: any;
}

/**
 * Response format returned from HTTP client.
 */
export interface HttpResponse<T> {
  /** HTTP status code */
  status: number;

  /** Parsed response data */
  data: T;
}

/**
 * Function to intercept or mutate request config before sending.
 */
export type RequestInterceptor = (
  config: HttpRequestConfig,
) => Promise<HttpRequestConfig> | HttpRequestConfig;

/**
 * Function to intercept or mutate response data before returning.
 */
export type ResponseInterceptor<T = any> = (
  response: HttpResponse<T>,
) => Promise<HttpResponse<T>> | HttpResponse<T>;
