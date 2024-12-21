"use server";

import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const currentUserData = async () => {
  try {
    const currentUserData = await currentUser();
    const userData = await db.user.findUnique({
      where: {
        clerkId: currentUserData?.id,
      },
    });

    return userData;
  } catch (error) {
    // console.log(error);
    return null;
  }
};
