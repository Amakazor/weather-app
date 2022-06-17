import axios, { AxiosInstance } from "axios";

export class ApiClient {
  readonly url: string;
  private readonly apiClient: AxiosInstance;

  constructor(url: string) {
    this.url = url;
    this.apiClient = axios.create({
      baseURL: "/api",
      headers: { "Content-Type": "application/json" },
    });
  }

  get = async (params?: unknown) => this.apiClient.get(this.url, { params });
  post = async (params?: unknown) => this.apiClient.post(this.url, { params });
  put = async (params?: unknown) => this.apiClient.put(this.url, { params });
  delete = async (params?: unknown) =>
    this.apiClient.delete(this.url, { params });
  patch = async (params?: unknown) =>
    this.apiClient.patch(this.url, { params });

  get fetcher() {
    return async (params?: unknown) => (await this.get(params)).data;
  }
}
