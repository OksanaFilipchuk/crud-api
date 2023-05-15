import { ServerResponse, IncomingMessage } from "http";
import { getSingleUser, getUsers, writeDBFile } from "../utils.js";
import { User } from "../types.js";
import { error } from "console";

export async function deleteRequest(
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
    } else if (await getSingleUser(id)) {
      const users = await getUsers();
      const usersNew: User[] = [];
      users.forEach((element: User) => {
        if (element.id !== id) {
          usersNew.push(element);
        }
      });

      await writeDBFile(usersNew).then(() => {
        response.writeHead(204, { "Content-type": "text/html" });
        response.end();
      });
    } else if (id.match(v4) && !(await getSingleUser(id))) {
      response.writeHead(404, { "Content-type": "application/json" });
      response.write(JSON.stringify({ message: "user doesn't exist" }));
      response.end();
    }
  } else {
    response.writeHead(404, { "Content-type": "application/json" });
    response.write(JSON.stringify({ message: "bad request" }));
    response.end();
  }
}
