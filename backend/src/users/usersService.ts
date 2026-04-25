import { compare, hash } from "bcrypt";
import { db } from "../database/database";
import { HttpError } from "../error/HttpError";
import { mapUser } from "../mappers/user.mapper";
import { ClientUserDTO } from "../types/users.client";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";

config();

export const getUserById = async (userId: number) => {
  const user = await db.getUserById(userId);
  if (!user) {
    throw new HttpError("Not Found", 404);
  }
  return mapUser(user);
};

export const registerUser = async (dto: ClientUserDTO) => {
  const existing = await db.getUserByEmail(dto.userEmail);
  if (existing) {
    throw new HttpError("User already exists", 409);
  }
  const hashedPassword = await hash(String(dto.password), 10);
  const user = await db.createUser({
    ...dto,
    password: hashedPassword,
  });
  return mapUser(user);
};

export const loginUser = async ({
  userEmail,
  password,
}: {
  userEmail: string;
  password: string;
}) => {
  const existing = await db.getUserByEmail(userEmail);
  if (!existing) {
    throw new HttpError("Unauthorized", 401);
  }
  const isSame = await compare(String(password), existing.password);
  if (!isSame) {
    throw new HttpError("Incorrect Credentials", 401);
  }
  const token = sign(
    {
      userId: existing.user_id,
    },
    process.env.JWT_SECRET as string,
    {
      algorithm: "HS512",
      expiresIn: "24h",
    },
  );
  return {
    token,
    userId: existing.user_id,
    username: existing.username,
  };
};
