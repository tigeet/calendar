/* eslint-disable @typescript-eslint/no-explicit-any */
interface HttpClient {
  get: <T>(...args: any) => Promise<T>;
}

const fetchClient: HttpClient = {
  async get<T>(url: string) {
    const response = await fetch(url);
    const json = response.json();
    return json as T;
  },
};

class Service {
  httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async get<T>(...args: any) {
    return await this.httpClient.get<T>(...args);
  }
}

export const fetchService = new Service(fetchClient);
