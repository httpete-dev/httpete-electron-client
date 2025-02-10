import { BaseUrl, Endpoint } from '@/types';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface RequestState {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  protocol: string;
  baseUrl: BaseUrl;
  url: string;
  headers: string;
  body: string;
}

export interface RequestResult {
  response: AxiosResponse | null;
  error: any | null;
  loading: boolean;
}

export class RequestManager {
  private originalState: RequestState;
  private currentState: RequestState;

  constructor(endpoint: Endpoint) {
    const initialState = {
      method: endpoint.method,
      protocol: endpoint.baseUrl.protocol,
      baseUrl: endpoint.baseUrl,
      url: endpoint.url,
      headers: endpoint.headers,
      body: endpoint.body
    };
    
    this.originalState = { ...initialState };
    this.currentState = { ...initialState };
  }

  updateState(updates: Partial<RequestState>) {
    this.currentState = { ...this.currentState, ...updates };
  }

  getCurrentState(): RequestState {
    return { ...this.currentState };
  }

  getOriginalState(): RequestState {
    return { ...this.originalState };
  }

  hasChanges(): boolean {
    return (
      this.currentState.method !== this.originalState.method ||
      this.currentState.protocol !== this.originalState.protocol ||
      this.currentState.baseUrl.value !== this.originalState.baseUrl.value ||
      this.currentState.baseUrl.protocol !== this.originalState.baseUrl.protocol ||
      this.currentState.url !== this.originalState.url ||
      this.currentState.headers !== this.originalState.headers ||
      this.currentState.body !== this.originalState.body
    );
  }

  resetToOriginal() {
    this.currentState = { ...this.originalState };
  }

  commitChanges() {
    this.originalState = { ...this.currentState };
  }

  private buildRequestConfig(): AxiosRequestConfig {
    return {
      method: this.currentState.method,
      url: `${this.currentState.protocol.toLowerCase()}://${this.currentState.baseUrl.value}${this.currentState.url}`,
      headers: JSON.parse(this.currentState.headers),
      data: this.currentState.method !== 'GET' ? JSON.parse(this.currentState.body) : undefined
    };
  }

  async sendRequest(): Promise<RequestResult> {
    try {
      const config = this.buildRequestConfig();
      const response = await axios(config);
      return {
        response,
        error: null,
        loading: false
      };
    } catch (error) {
      return {
        response: null,
        error,
        loading: false
      };
    }
  }
} 