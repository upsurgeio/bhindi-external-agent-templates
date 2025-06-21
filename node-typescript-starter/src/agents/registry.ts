import { AgentHandler } from "./base-agent";
import { CalculatorAgent } from "./calculator";
import { TwitterAgent } from "./twitter";
import { RedisAgent } from "./redis";
import { CalculatorTools } from "./calculator/tools";
import { TwitterTools } from "./twitter/tools";
import { RedisTools } from "./redis/tools";

export type AgentMap = {
  calculator: AgentHandler<CalculatorTools>;
  twitter: AgentHandler<TwitterTools>;
  redis: AgentHandler<RedisTools>;
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
    this.registerAgent("calculator", new CalculatorAgent());
    this.registerAgent("twitter", new TwitterAgent());
    this.registerAgent("redis", new RedisAgent());
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
