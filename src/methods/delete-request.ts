import { ServerResponse, IncomingMessage } from "http";

export function deleteRequest(
  request: IncomingMessage,
  response: ServerResponse
) {
  console.log("hello delete");
}
