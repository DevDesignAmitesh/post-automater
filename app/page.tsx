import React from "react";
import { redirect } from "next/navigation";
import LandingPage from "@/pages/LandingPage";
import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth";

const page = async () => {
  const session = await getServerSession(auth);
  if (!session) {
    redirect("/auth");
  }

  return <LandingPage />;
};

export default page;
