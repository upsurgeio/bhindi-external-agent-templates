import { SupportedOAuth, Tool, AgentInfo } from "../types";

export interface AgentTools {
  tools: Tool[];
}

export interface AgentHandler<T extends Record<string, any>> {
  getAgentInfo(): AgentInfo;
  executeTool<K extends keyof T>(
    toolName: K,
    parameters: T[K],
    oauthTokens?: Record<SupportedOAuth, string>,
    variables?: Record<string, string>
  ): Promise<any>;
  getTools(): AgentTools;
}

export abstract class BaseAgentHandler<T extends Record<string, any>>
  implements AgentHandler<T>
{
  protected tools: Tool[];
  protected oauth: SupportedOAuth[];
  protected variables: string[];

  constructor(tools: Tool[], oauth: SupportedOAuth[], variables: string[]) {
    this.tools = tools;
    this.oauth = oauth;
    this.variables = variables;
  }

  getAgentInfo() {
    return {
      tools: this.tools,
      oauth: this.oauth,
      variables: this.variables,
    };
  }

  getTools() {
    return {
      tools: this.tools,
    };
  }

  abstract executeTool<K extends keyof T>(
    toolName: K,
    parameters: T[K],
    oauthTokens?: Record<SupportedOAuth, string>,
    variables?: Record<string, string>
  ): Promise<any>;
}
