import { Request } from "express";
import { Tool, ToolsResponse } from "../types/tools";

export interface AgentTools {
  requiresAuth: boolean;
  tools: Tool[];
}

export interface AgentHandler<T extends Record<string, any>> {
  getTools(): ToolsResponse;
  executeTool<K extends keyof T>(
    toolName: K,
    parameters: T[K],
    bearerToken?: string
  ): Promise<any>;
}

export abstract class BaseAgentHandler<T extends Record<string, any>>
  implements AgentHandler<T>
{
  protected tools: Tool[];
  protected requiresAuth: boolean;

  constructor(tools: Tool[], requiresAuth: boolean = false) {
    this.tools = tools;
    this.requiresAuth = requiresAuth;
  }

  getTools(): ToolsResponse {
    return {
      requiresAuth: this.requiresAuth,
      tools: this.tools,
    };
  }

  abstract executeTool<K extends keyof T>(
    toolName: K,
    parameters: T[K],
    bearerToken?: string
  ): Promise<any>;
}
