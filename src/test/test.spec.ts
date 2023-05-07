import http from "http";

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

  test("get users", async () => {
    const data = await helper();
    expect(data).toStrictEqual([]);
  });
});
