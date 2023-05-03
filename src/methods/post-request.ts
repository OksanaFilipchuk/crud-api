import { ServerResponse, IncomingMessage } from "http";

export function postRequest(
  request: IncomingMessage,
  response: ServerResponse
) {
  console.log("hello post");
}
