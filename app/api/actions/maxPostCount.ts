"use server";

import { maxPostCount } from "@/app/maxPostCount";
import { auth } from "@/lib/auth";
import { prisma } from "@/prisma";
import { getServerSession } from "next-auth";

export async function getMaxPostCount() {
  const session = await getServerSession(auth);

  if (!session || !session?.user?.email) {
    return false;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user.email,
    },
  });

  if (!user) {
    return false;
  }

  const isCountValid = user.postCount < maxPostCount;

  if (!isCountValid) {
    return false;
  }

  return true;
}
