import { ServerResponse, IncomingMessage } from "http";
import { getUsers, writeDBFile } from "../utils.js";
import { createUser } from "../utils.js";
import { isUserValid } from "../utils.js";
import { getRequestBody } from "../utils.js";

export async function postRequest(
  request: IncomingMessage,
  response: ServerResponse
) {
  getRequestBody(request).then(async (data) => {
    return new Promise(async (res, reject) => {
      const users = await getUsers();
      try {
        if (typeof data === "string" && data) {
          const newUserObj = JSON.parse(data);
          if (isUserValid(data)) {
            const newUser = createUser(newUserObj);
            users.push(newUser);
            await writeDBFile(users);
            res(newUser);
          } else throw new Error("Invalid user data");
        } else throw new Error("Invalid user data");
      } catch (err) {
        reject(err);
      }
    })
      .then((user) => {
        response.writeHead(201, { "Content-type": "application/json" });
        response.write(JSON.stringify(user));
        response.end();
      })
      .catch((err) => {
        response.writeHead(400, { "Content-type": "application/json" });
        response.end(err.message);
      });
  });
}
