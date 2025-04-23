import { Request } from "express";
import { createErrorResponse, createTextResponse } from "../../utils/response";
import { BaseAgentHandler } from "../base-agent";
import { TwitterTools, twitterTools } from "./tools";
import { checkBearerToken } from "../../middleware/auth";
import { ENV } from "../../utils/env";

export class TwitterAgent extends BaseAgentHandler<TwitterTools> {
  constructor() {
    super(twitterTools, true);
  }

  async executeTool<K extends keyof TwitterTools>(
    toolName: K,
    parameters: TwitterTools[K],
    bearerToken?: string
  ): Promise<any> {
    switch (toolName) {
      case "tweet":
        if (!parameters?.content) {
          return createErrorResponse("Content is required", 400);
        }
        return createTextResponse({
          message: "Tweet posted successfully",
          tweet: parameters?.content,
          bearerToken: bearerToken,
          apiKey: `Interact with Twitter API using ${ENV.TWITTER_API_KEY}`,
        });
    }
    switch (toolName) {
      case "tweet":
        if (!parameters?.content) {
          return createErrorResponse("Content is required", 400);
        }
        return createTextResponse({
          message: "Tweet posted successfully",
          tweet: parameters?.content,
          bearerToken: bearerToken,
        });
      default:
        return createErrorResponse(
          `Tool ${String(toolName)} not implemented`,
          404
        );
    }
  }
}
