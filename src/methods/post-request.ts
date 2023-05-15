import { ServerResponse, IncomingMessage } from "http";
import { getUsers, writeDBFile } from "../utils.js";
import { createUser } from "../utils.js";
import { isNewUserValid } from "../utils.js";

async function getPostBody(request: IncomingMessage) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      request.on("data", (chunk) => {
        body += chunk;
      });

      request.on("end", () => {
        resolve(body);
      });
    } catch (err) {
      reject(err);
    }
  });
}

export async function postRequest(
  request: IncomingMessage,
  response: ServerResponse
) {
  getPostBody(request).then(async (data) => {
    return new Promise(async (res, reject) => {
      const users = await getUsers();
      try {
        if (typeof data === "string" && data) {
          const newUserObj = JSON.parse(data);
          if (isNewUserValid(data)) {
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
