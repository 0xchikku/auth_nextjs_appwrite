import bcryptjs from "bcryptjs";

export async function isPasswordValid(passowrd: string, userPassword: string) {
  return await bcryptjs.compare(passowrd, userPassword);
}