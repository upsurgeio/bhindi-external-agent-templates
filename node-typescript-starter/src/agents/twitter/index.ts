import { createErrorResponse, createTextResponse } from "../../utils/response";
import { BaseAgentHandler } from "../base-agent";
import { TwitterTools, twitterTools } from "./tools";
import { OAuthType, SupportedOAuth } from "../../types";

export class TwitterAgent extends BaseAgentHandler<TwitterTools> {
  constructor() {
    super(twitterTools, [OAuthType.TWITTER], []);
  }

  async executeTool<K extends keyof TwitterTools>(
    toolName: K,
    parameters: TwitterTools[K],
    oauthTokens?: Record<SupportedOAuth, string>,
    variables?: Record<string, string>
  ): Promise<any> {
    switch (toolName) {
      case "tweet":
        if (!parameters?.content) {
          return createErrorResponse("Content is required", 400);
        }
        const twitterToken = oauthTokens?.[OAuthType.TWITTER];
        if (!twitterToken) {
          return createErrorResponse("Twitter token is required", 400);
        }
        // TODO: Implement Twitter API call
        return createTextResponse({
          message: "Tweet posted successfully",
          tweet: parameters?.content,
        });
      default:
        return createErrorResponse(
          `Tool ${String(toolName)} not implemented`,
          404
        );
    }
  }
}
