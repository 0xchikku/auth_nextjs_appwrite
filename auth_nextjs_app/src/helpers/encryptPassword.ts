import bcryptjs from "bcryptjs";

export async function encryptPassword(salt: number, password: string) {
  const genSalt = await bcryptjs.genSalt(salt);
  return await bcryptjs.hash(password, genSalt);
}