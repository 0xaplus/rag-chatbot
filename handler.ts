import type { APIGatewayProxyEvent } from "aws-lambda";
import type { APIGatewayProxyResult } from "aws-lambda";
import { search } from "./search";

export const chatHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    console.log("Received event:", JSON.stringify(event, null, 2));

    const requestBody = event.body ? JSON.parse(event.body) : {};
    const userQuery = requestBody.query;

    if (!userQuery) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Query is required" }),
      };
    }

    const result = await search(userQuery);
    console.log("Search result:", result);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ response: result }),
    };
  } catch (error) {
    console.error("Error processing request:", error);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Internal Server Error", details: error }),
    };
  }
};
