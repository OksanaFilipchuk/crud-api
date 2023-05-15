import http, { ServerResponse, IncomingMessage } from "http";
import { getRequest } from "./methods/get-request.js";
import { putRequest } from "./methods/put-request.js";
import { postRequest } from "./methods/post-request.js";
import { deleteRequest } from "./methods/delete-request.js";

import dotenv from "dotenv";
dotenv.config();

const server = http.createServer(
  (request: IncomingMessage, response: ServerResponse) => {
    switch (request.method) {
      case "GET":
        getRequest(request, response);
        break;
      case "POST":
        postRequest(request, response);
        break;
      case "DELETE":
        deleteRequest(request, response);
        break;
      case "PUT":
        putRequest(request, response);
        break;
      default:
        response.writeHead(404, { "Content-type": "application/json" });
        response.write(JSON.stringify({ message: "page not found" }));
        response.end();
    }
  }
);
try {
  server.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
  });
} catch (err) {
  console.log(err);
}
