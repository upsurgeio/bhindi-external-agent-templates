import { AgentHandler } from "./base-agent";
import { SpotifyAgent } from "./spotify";
import { SpotifyTools } from "./spotify/tools";

export type AgentMap = {
  spotify: AgentHandler<SpotifyTools>;
};

export class AgentRegistry {
  private static instance: AgentRegistry;
  private agents: Map<keyof AgentMap, AgentHandler<any>>;

  private constructor() {
    this.agents = new Map();
    this.registerDefaultAgents();
  }

  public static getInstance(): AgentRegistry {
    if (!AgentRegistry.instance) {
      AgentRegistry.instance = new AgentRegistry();
    }
    return AgentRegistry.instance;
  }

  private registerDefaultAgents() {
    this.registerAgent("spotify", new SpotifyAgent());
  }

  public registerAgent<K extends keyof AgentMap>(
    name: K,
    handler: AgentMap[K]
  ) {
    this.agents.set(name, handler);
  }

  public getAgent<K extends keyof AgentMap>(name: K): AgentMap[K] | undefined {
    return this.agents.get(name) as AgentMap[K] | undefined;
  }

  public getAvailableAgents(): (keyof AgentMap)[] {
    return Array.from(this.agents.keys());
  }
}
