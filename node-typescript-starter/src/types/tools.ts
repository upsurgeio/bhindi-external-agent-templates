export type MediaType = "image" | "pdf" | "audio" | "video";

export interface MediaItem {
  type: MediaType;
  url: string;
  mimeType?: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface ToolParameterNumberProperty {
  type: "number";
  description: string;
  default?: number;
  enum?: number[];
}

export interface ToolParameterStringProperty {
  type: "string";
  description: string;
  default?: string;
  enum?: string[];
}

export interface ToolParameterBooleanProperty {
  type: "boolean";
  description: string;
  default?: boolean;
}

export interface ToolParameterArrayProperty {
  type: "array";
  description: string;
  items: {
    type: "number" | "string" | "boolean";
  };
}

export type ToolParameterProperty =
  | ToolParameterNumberProperty
  | ToolParameterStringProperty
  | ToolParameterBooleanProperty
  | ToolParameterArrayProperty;
export interface ToolParameter {
  type: string;
  properties: Record<string, ToolParameterProperty>;
  required?: string[];
}

export interface Tool {
  name: string;
  description: string;
  parameters: ToolParameter;
  visibleParameters: string[];
}

export interface ToolsResponse {
  requiresAuth: boolean;
  tools: Tool[];
}

export interface ToolExecutionRequest {
  toolName: string;
  parameters: Record<string, any>;
}

export interface ToolExecutionResponse {
  result: any;
  media?: MediaItem[];
}
