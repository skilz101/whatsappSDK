import type {
  HttpRequestConfig,
  HttpResponse,
  RequestInterceptor,
  ResponseInterceptor,
} from "./types";

/**
 * A configurable HTTP client using the Fetch API with support for interceptors.
 */
export class HttpClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  /**
   * @param baseUrl - Base URL for all requests
   * @param defaultHeaders - Default headers to apply to each request
   */
  constructor(baseUrl: string, defaultHeaders: Record<string, string> = {}) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = defaultHeaders;
  }

  /**
   * Adds a request interceptor to modify config before sending.
   * @param interceptor - Function to modify request config
   */
  addRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor);
  }

  /**
   * Adds a response interceptor to modify response before returning.
   * @param interceptor - Function to modify the response
   */
  addResponseInterceptor<T = any>(interceptor: ResponseInterceptor<T>) {
    this.responseInterceptors.push(interceptor);
  }

  /**
   * Makes an HTTP request using fetch with applied interceptors.
   * @param config - HTTP request configuration
   * @returns Typed response
   */
  async request<T = any>(config: HttpRequestConfig): Promise<HttpResponse<T>> {
    let finalConfig = {
      ...config,
      headers: { ...this.defaultHeaders, ...config.headers },
    };

    for (const interceptor of this.requestInterceptors) {
      finalConfig = await interceptor(finalConfig);
    }

    const url = new URL(`${this.baseUrl}${finalConfig.url}`);
    if (finalConfig.queryParams) {
      Object.entries(finalConfig.queryParams).forEach(([key, value]) =>
        url.searchParams.append(key, String(value)),
      );
    }

    const res = await fetch(url.toString(), {
      method: finalConfig.method,
      headers: finalConfig.headers,
      body: finalConfig.body ? JSON.stringify(finalConfig.body) : undefined,
    });

    const data = await res.json();

    let response: HttpResponse<T> = {
      status: res.status,
      data,
    };

    for (const interceptor of this.responseInterceptors) {
      response = await interceptor(response);
    }

    return response;
  }
}
