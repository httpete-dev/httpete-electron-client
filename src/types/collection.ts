import { Endpoint } from "./api";

export type Collection = {
  id?: number;
  name: string;
  description: string;
  icon: string;
  organizationId: number;
  workspaceId: number;
  endpoints?: Endpoint[];
} 