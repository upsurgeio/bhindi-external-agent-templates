import { Tool } from "../../types";

export interface RedisTools {
  get: {
    key: string;
  };
  set: {
    key: string;
    value: string;
    ttl?: number;
  };
  delete: {
    key: string;
  };
  list_keys: {
    pattern?: string;
  };
  increment: {
    key: string;
    amount?: number;
  };
  expire: {
    key: string;
    ttl: number;
  };
}

export const redisTools: Tool[] = [
  {
    name: "get",
    description: "Get a value from Redis by key",
    parameters: {
      type: "object",
      properties: {
        key: {
          type: "string",
          description: "Redis key to retrieve",
        },
      },
      required: ["key"],
    },
  },
  {
    name: "set",
    description: "Set a key-value pair in Redis",
    parameters: {
      type: "object",
      properties: {
        key: {
          type: "string",
          description: "Redis key to set",
        },
        value: {
          type: "string",
          description: "Value to store",
        },
        ttl: {
          type: "number",
          description: "Time to live in seconds (optional)",
        },
      },
      required: ["key", "value"],
    },
  },
  {
    name: "delete",
    description: "Delete a key from Redis",
    parameters: {
      type: "object",
      properties: {
        key: {
          type: "string",
          description: "Redis key to delete",
        },
      },
      required: ["key"],
    },
  },
  {
    name: "list_keys",
    description: "List keys matching a pattern",
    parameters: {
      type: "object",
      properties: {
        pattern: {
          type: "string",
          description: "Pattern to match keys (e.g., 'user:*')",
        },
      },
      required: [],
    },
  },
  {
    name: "increment",
    description: "Increment a numeric value in Redis",
    parameters: {
      type: "object",
      properties: {
        key: {
          type: "string",
          description: "Redis key to increment",
        },
        amount: {
          type: "number",
          description: "Amount to increment by (default: 1)",
        },
      },
      required: ["key"],
    },
  },
  {
    name: "expire",
    description: "Set expiration time for a key",
    parameters: {
      type: "object",
      properties: {
        key: {
          type: "string",
          description: "Redis key to set expiration for",
        },
        ttl: {
          type: "number",
          description: "Time to live in seconds",
        },
      },
      required: ["key", "ttl"],
    },
  },
];
