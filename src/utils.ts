import { readFile, writeFile } from "fs/promises";
import path from "path";
import { User } from "./types.js";
import { v4 as uuidv4 } from "uuid";

const dbPath = path.resolve("./src", "db.json");

export async function getUsers() {
  const users = JSON.parse((await readFile(dbPath)).toString()).users;
  return users;
}

export async function getSingleUser(id: string) {
  const db = await readFile(dbPath);
  const obj = await JSON.parse(db.toString());
  const user = obj.users.filter((el: User) => el.id === id)[0];
  return user;
}
export async function writeDBFile(data: User[]) {
  return writeFile(dbPath, JSON.stringify({ users: data }, null, 2));
}

export function createUser(data: Omit<User, "id">) {
  const {
    username,
    age,
    hobbies: [...rest],
  } = data;
  if (username && age && rest.length) {
    const user = {
      id: uuidv4(),
      username: username,
      age: age,
      hobbies: [...rest],
    };
    return user;
  }
}

export function isNewUserValid(data: string) {
  const newUserObj = JSON.parse(data);
  if (
    newUserObj.username &&
    typeof newUserObj.username === "string" &&
    newUserObj.age &&
    typeof newUserObj.age === "number" &&
    Array.isArray(newUserObj.hobbies) &&
    newUserObj.hobbies.every((el: string) => typeof el === "string") &&
    newUserObj.hobbies.length > 0
  )
    return true;
}
