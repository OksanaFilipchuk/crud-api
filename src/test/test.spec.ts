import * as http from "http";
import { User } from "../types.js";

describe("testing crud app", () => {
  async function helper() {
    return new Promise((resolve, rej) => {
      const options = {
        hostname: "localhost",
        port: "3000",
        path: "/api/users",
        method: "GET",
      };
      const req = http
        .request(options, (res) => {
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => resolve(JSON.parse(data)));
        })
        .on("error", (err) => {
          console.log("Error: ", err);
        })
        .end();
    });
  }
  // async function helper2(user: any) {
  //   return new Promise((resolve, reject) => {
  //     const options = {
  //       hostname: "localhost",
  //       port: "3000",
  //       path: "/api/users",
  //       method: "POST",
  //       body: `{username:"Nik",age:29,hobbies:["swimming"]}`,
  //     };
  //     const request = http
  //       .request(options, (res) => {
  //         let data = "";
  //         res.on("data", (chunk) => (data += chunk));
  //         res.on("end", () => {
  //           resolve(JSON.stringify(data));
  //         });
  //       })
  //       .on("error", (err) => {
  //         console.log("Error", err.message);
  //       })
  //       .end();
  //   });
  // }

  test("get users", async () => {
    const data = await helper();
    expect(data).toStrictEqual([]);
  });

  // test("post method", async () => {
  //   await helper2(
  //       '{"username":"Nik","age":29,"hobbies":["swimming"]}'
      
  //   ).then((res: any) => {
  //     const requestUserName = JSON.parse(res);
  //     expect(requestUserName).toEqual("Nik");
  //   });
  // });
});
