export interface ApodQuery {
  date?: string;
}


export interface NeoFeedQuery {
  start_date: Date|undefined;
  end_date: Date|undefined;
}

export interface NasaFetchResult<T = unknown> {
  data: T;
}


export interface NasaServiceType {
  fetchApod(date?: string): Promise<NasaFetchResult>;
  fetchNeoFeed(params: NeoFeedQuery): Promise<NasaFetchResult>;
}


export interface NasaServiceOptions {
  apiKey: string;
  baseUrl: string;
  timeoutMs: number;
}