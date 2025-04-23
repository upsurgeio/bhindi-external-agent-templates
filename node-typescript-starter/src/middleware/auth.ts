import { Request } from "express";
import { ENV } from "../utils/env";
import { createErrorResponse } from "../utils/response";

export const checkApiKey = (req: Request) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== ENV.SERVER_API_KEY) {
    return createErrorResponse("Invalid API key", 401);
  }

  return { success: true };
};

export const checkBearerToken = (req: Request) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return createErrorResponse("Bearer token missing", 401);
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return createErrorResponse("Bearer token required", 401);
  }

  return { success: true, token: token };
};
