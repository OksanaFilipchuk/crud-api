import { ServerResponse, IncomingMessage } from "http";
import {
  getRequestBody,
  isUserValid,
  getSingleUser,
  getUsers,
  writeDBFile,
} from "../utils.js";
import { User } from "../types.js";

export async function putRequest(
  request: IncomingMessage,
  response: ServerResponse
) {
  const v4 = new RegExp(
    /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i
  );
  const id = request.url?.split("/")[3];
  if (
    request.url?.split("/")[1] === "api" &&
    request.url.split("/")[2] === "users" &&
    id
  ) {
    if (!id.match(v4)) {
      response.writeHead(400, { "Content-type": "application/json" });
      response.write(JSON.stringify({ message: "invalid user id" }));
      response.end();
    } else if (id.match(v4) && !(await getSingleUser(id))) {
      response.writeHead(404, { "Content-type": "application/json" });
      response.write(JSON.stringify({ message: "user doesn't exist" }));
      response.end();
    } else if (await getSingleUser(id)) {
      getRequestBody(request)
        .then(async (body) => {
          if (typeof body == "string" && isUserValid(body)) {
            const users = await getUsers();
            const newUsers: User[] = [];
            users.forEach((user: User) => {
              if (user.id != id) {
                newUsers.push(user);
              }
            });
            newUsers.push(JSON.parse(body));

            return newUsers;
          }
        })
        .then(async (users) => {
          if (users) {
            await writeDBFile(users);
          }
        })
        .then(() => {
          response.writeHead(200, { "Content-type": "application/json" });
          response.write(
            JSON.stringify({ message: "user data has been opdated" })
          );
          response.end();
        });
    } else {
      response.writeHead(404, { "Content-type": "application/json" });
      response.write(JSON.stringify({ message: "bad request" }));
      response.end();
    }
  } else {
    response.writeHead(404, { "Content-type": "application/json" });
    response.write(JSON.stringify({ message: "bad request" }));
    response.end();
  }
}
