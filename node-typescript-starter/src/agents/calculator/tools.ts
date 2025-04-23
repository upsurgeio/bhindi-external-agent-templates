import { Tool } from "../../types";

export interface CalculatorTools {
  add: {
    a: number;
    b: number;
  };
  subtract: {
    a: number;
    b: number;
  };
}

export const calculatorTools: Tool[] = [
  {
    name: "add",
    description: "Add two numbers together",
    parameters: {
      type: "object",
      properties: {
        a: {
          type: "number",
          description: "First number",
        },
        b: {
          type: "number",
          description: "Second number",
        },
      },
      required: ["a", "b"],
    },
    visibleParameters: ["a", "b"],
  },
  {
    name: "subtract",
    description: "Subtract second number from first number",
    parameters: {
      type: "object",
      properties: {
        a: {
          type: "number",
          description: "First number",
        },
        b: {
          type: "number",
          description: "Second number",
        },
      },
      required: ["a", "b"],
    },
    visibleParameters: ["a", "b"],
  },
];
