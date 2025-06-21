import { createErrorResponse, createTextResponse } from "../../utils/response";
import { BaseAgentHandler } from "../base-agent";
import { CalculatorTools, calculatorTools } from "./tools";

export class CalculatorAgent extends BaseAgentHandler<CalculatorTools> {
  constructor() {
    super(calculatorTools, [], []);
  }

  async executeTool<K extends keyof CalculatorTools>(
    toolName: K,
    parameters: CalculatorTools[K]
  ): Promise<any> {
    switch (toolName) {
      case "add":
        return createTextResponse({
          result: parameters.a + parameters.b,
        });
      case "subtract":
        return createTextResponse({
          result: parameters.a - parameters.b,
        });
      default:
        return createErrorResponse(
          `Tool ${String(toolName)} not implemented`,
          404
        );
    }
  }
}
