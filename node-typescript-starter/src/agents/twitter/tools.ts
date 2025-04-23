import { Tool } from "../../types";

export interface TwitterTools {
  tweet: {
    content: string;
  };
}

export const twitterTools: Tool[] = [
  {
    name: "tweet",
    description: "Post a tweet",
    parameters: {
      type: "object",
      properties: {
        content: {
          type: "string",
          description: "Tweet content",
        },
      },
      required: ["content"],
    },
    visibleParameters: ["content"],
  },
];
