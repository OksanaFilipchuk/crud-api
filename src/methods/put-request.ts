import { ServerResponse, IncomingMessage } from "http";

export function putRequest(request: IncomingMessage, response: ServerResponse) {
  console.log("hello post");
}
