import { Request } from "express";
import { ENV } from "../utils/env";
import { createErrorResponse } from "../utils/response";
import { SupportedOAuth } from "../types";

export const checkApiKey = (req: Request) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== ENV.SERVER_API_KEY) {
    return createErrorResponse("Invalid API key", 401);
  }

  return { success: true };
};

export const checkOAuthTokens = (req: Request, oauth: SupportedOAuth[]) => {
  const missingTokens: string[] = [];
  const presentTokens: Record<string, string> = {};

  for (const oauthProvider of oauth) {
    const token = req.headers[`x-${oauthProvider}-token`];

    if (!token) {
      missingTokens.push(oauthProvider);
    } else {
      presentTokens[oauthProvider] = token as string;
    }
  }

  // If any required tokens are missing, return error
  if (missingTokens.length > 0) {
    return createErrorResponse(
      `Missing OAuth tokens: ${missingTokens.join(", ")}`,
      401
    );
  }

  // All tokens are present
  return {
    success: true,
    tokens: presentTokens,
  };
};

export const checkVariables = (req: Request, variables: string[]) => {
  const missingVariables: string[] = [];
  const presentVariables: Record<string, string> = {};

  for (const variable of variables) {
    const value = req.headers[`x-${variable}`];

    if (!value) {
      missingVariables.push(variable);
    } else {
      presentVariables[variable] = value as string;
    }
  }

  if (missingVariables.length > 0) {
    return createErrorResponse(
      `Missing variables: ${missingVariables.join(", ")}`,
      401
    );
  }

  return {
    success: true,
    variables: presentVariables,
  };
};
