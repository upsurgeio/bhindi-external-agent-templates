import express, { Router, RequestHandler, Request, Response } from "express";
import { createErrorResponse } from "./utils/response";
import { AgentMap, AgentRegistry } from "./agents/registry";
import { checkApiKey, checkBearerToken } from "./middleware/auth";

interface AgentParams {
  agent: string;
  toolName?: string;
}

const app = express();
const router = Router();
const port = process.env.PORT || 3000;

app.use(express.json());

// GET /:agent
const getAgentHandler: RequestHandler<{ agent: keyof AgentMap }> = (
  req,
  res
) => {
  const { agent } = req.params;
  const agentHandler = AgentRegistry.getInstance().getAgent(agent);
  if (!agentHandler) {
    res.status(404).json(createErrorResponse(`Agent ${agent} not found`, 404));
    return;
  }
  res.json({ status: "ok" });
  return;
};

// GET /:agent/tools
const getToolsHandler: RequestHandler<{ agent: keyof AgentMap }> = (
  req,
  res
) => {
  try {
    const { agent } = req.params;
    const agentHandler = AgentRegistry.getInstance().getAgent(agent);

    if (!agentHandler) {
      res
        .status(404)
        .json(createErrorResponse(`Agent ${agent} not found`, 404));
      return;
    }

    const response = agentHandler.getTools();
    res.json(response);
  } catch (error) {
    res
      .status(500)
      .json(
        createErrorResponse(
          error instanceof Error ? error.message : "Unknown error"
        )
      );
  }
};

// POST /:agent/tools/:toolName
const executeToolHandler: RequestHandler<{
  agent: keyof AgentMap;
  toolName: string;
}> = async (req, res) => {
  const { agent, toolName } = req.params;
  const parameters = req.body;

  const agentHandler = AgentRegistry.getInstance().getAgent(agent);
  if (!agentHandler) {
    res.status(404).json(createErrorResponse(`Agent ${agent} not found`, 404));
    return;
  }

  const validateApiKeyResponse = checkApiKey(req);
  if (!validateApiKeyResponse.success) {
    res.status(401).json(validateApiKeyResponse);
    return;
  }

  const tools = agentHandler.getTools();
  let bearerToken: string | undefined;
  if (tools.requiresAuth) {
    const validateBearerTokenResponse = checkBearerToken(req);
    if (!validateBearerTokenResponse.success) {
      res.status(401).json(validateBearerTokenResponse);
      return;
    }
    bearerToken = (validateBearerTokenResponse as any).token;
  }

  const result = await (agentHandler as any).executeTool(
    toolName,
    parameters,
    bearerToken
  );
  if (result.success) {
    res.json(result).status(200);
  } else {
    res.json(result).status(result.error.code);
  }
};

router.get("/:agent/tools", getToolsHandler);
router.post("/:agent/tools/:toolName", executeToolHandler);
router.get("/", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});
router.get("/:agent", getAgentHandler);

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
