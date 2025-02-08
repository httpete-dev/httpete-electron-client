import { ApiDocument } from "./document";

export type HttPeteResponse = {
  message: string | null;
  statusCode: number;
  content: any;
}

export type BaseUrl = {
  id?: number;
  workspaceId: number;
  protocol: string;
  value: string;
}

export type Endpoint = {
  id?: number;
  url: string;
  headers: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  baseUrl: BaseUrl;
  baseUrlId: number;
  body: string;
  collectionId: number;
  workspaceId: number;
  organizationId: number;
  documentation: ApiDocument;
  name?: string;
  tests?: EndpointTest[];
}

export type EndpointTest = {
  name: string;
  file: string;
  authorName: string;
  authoredDate: Date;
  lastModifyByName: string;
  lastModifyDate: Date;
} 