import { UserDB } from "../types/users.server";

export const mapUser = (user: UserDB) => ({
  id: user.user_id,
  username: user.username,
  userEmail: user.user_email,
  createdAt: user.created_at,
});
