import { users } from "./db";
import * as types from "./types";
import * as google from "./google";

export function getUserByEmail(email: string) {
  return users().where({ email }).select().first();
}

export function getUserById(id: number) {
  return users().where({ id }).select().first();
}

export function generateAuthUri() {
  return google.generateAuthUri();
}

export async function getOrCreateUser(userData: { name: string; email: string }) {
  let user = await getUserByEmail(userData.email);

  if (!user) {
    [user] = await users().insert(userData).returning("*");
  }

  return user;
}

export async function authenticate(code: string): Promise<types.UserType | null> {
  const userData = await google.fetchUserData(code);

  if (!userData) {
    return null;
  }

  return getOrCreateUser(userData);
}
