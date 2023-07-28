import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buff = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buff.toString("hex")}.${salt}`;
  }

  static async comparePassword(
    storedPassword: string,
    suppliedPassword: string
  ) {
    // console.log(storedPassword);
    const [hashedPassword, salt] = storedPassword.split(".");
    // console.log(hashedPassword, ">>>", salt);

    const buff = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    // console.log(buff.toString("hex") ,"===", suppliedPassword)
    return buff.toString("hex") === hashedPassword;
  }
}
