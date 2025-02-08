"use server";

import { prisma } from "@/prisma";
import { auth } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function convertToZeroAfterOneDay() {
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

  await prisma.user.update({
    where: { email: session?.user?.email },
    data: { postCount: 0 },
  });

  return true;
}
