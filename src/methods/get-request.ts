import { ServerResponse, IncomingMessage } from "http";
import { getUsers } from "../utils.js";
import { getSingleUser } from "../utils.js";

export async function getRequest(
  request: IncomingMessage,
  response: ServerResponse
) {
  const userId = request.url?.split("/")[3];
  const v4 = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  );

  if (request.url === "/api" || request.url === "/") {
    response.writeHead(200, { "Content-type": "application/json" });
    response.write(JSON.stringify({ message: "Welcome to crud-api" }));
    response.end();
  } else if (
    request.url?.split("/")[1] === "api" &&
    request.url?.split("/")[2] === "users" &&
    !userId
  ) {
    response.writeHead(200, { "Content-type": "application/json" });
    response.write(JSON.stringify(await getUsers(), null, 2));
    response.end();
  } else if (userId && userId.match(v4)) {
    if (await getSingleUser(userId)) {
      response.writeHead(200, { "Content-type": "application/json" });
      response.write(JSON.stringify(await getSingleUser(userId), null, 2));
      response.end();
    } else {
      response.writeHead(404, { "Content-type": "application/json" });
      response.end(
        JSON.stringify({ message: `User with id ${userId} doesn't exist` })
      );
    }
  } else if (userId) {
    response.writeHead(400, { "Content-type": "application/json" });
    response.end(JSON.stringify({ message: `Inavlid user id` }));
  } else {
    response.writeHead(404, { "Content-type": "application/json" });
    response.end(JSON.stringify({ message: `Page not found` }));
  }
}
