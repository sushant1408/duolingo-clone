import { auth } from "@clerk/nextjs/server";

export const getIsAdmin = async () => {
  const { userId } = await auth();

  if (!userId) {
    return false;
  }

  return userId === process.env.NEXT_PUBLIC_ADMIN_USER_ID;
};
