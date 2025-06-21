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
}

export interface ToolsResponse {
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

export type SupportedOAuth =
  | "twitter"
  | "google-gmail"
  | "google-calendar"
  | "google-docs"
  | "google-sheets"
  | "slack"
  | "notion"
  | "trello"
  | "github"
  | "google-forms"
  | "reddit"
  | "typeform";

export enum OAuthType {
  TWITTER = "twitter",
  GOOGLE_GMAIL = "google-gmail",
  GOOGLE_CALENDAR = "google-calendar",
  GOOGLE_DOCS = "google-docs",
  GOOGLE_SHEETS = "google-sheets",
  SLACK = "slack",
  NOTION = "notion",
  TRELLO = "trello",
  GITHUB = "github",
  GOOGLE_FORMS = "google-forms",
  REDDIT = "reddit",
  TYPEFORM = "typeform",
}

export interface AgentInfo {
  tools: Tool[];
  oauth: SupportedOAuth[];
  variables: string[];
}

export interface ErrorResponse {
  success: false;
  error: {
    message: string;
    code: number;
    details: string;
  };
}
