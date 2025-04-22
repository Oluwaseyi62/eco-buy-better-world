import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

export const hashString = async (str: string) => {
  const salt = await bcrypt.genSalt(10);

  const hashedString = await bcrypt.hash(str, salt);
  return hashedString;
};

export const compareString = async (userPassword: string, password: string) => {
  const isMatch = await bcrypt.compare(userPassword, password);
  return isMatch;
};

interface JWTData {
  userId: string;
}

export function createJWT(id: string): string {
  return JWT.sign(
    { userId: id } as JWTData,
    process.env.JWT_SECRET_KEY as string
  );
}
