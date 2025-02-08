"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/prisma";
import { getServerSession } from "next-auth";

export async function increaseCount() {
  const session = await getServerSession(auth);

  if (!session || !session?.user?.email) {
    return false;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  });

  if (!user) {
    return false;
  }

  const updatedUser = await prisma.user.update({
    where: { email: session?.user?.email },
    data: {
      postCount: {
        increment: 1,
      },
    },
  });

  console.log("update user", updatedUser);

  return true;
}
