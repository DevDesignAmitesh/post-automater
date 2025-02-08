import { linkedinPost } from "@/lib/linkedinPost";
import { NextRequest, NextResponse } from "next/server";
import { getMaxPostCount } from "../actions/maxPostCount";
import { auth } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { increaseCount } from "../actions/increaseCount";

// This handler will process the POST request to trigger LinkedIn posting.
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(auth);

    if (!session || !session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
    }
    // Parse incoming JSON body
    const { content, imgOrVideoPath, email, password } = await req.json();

    if (!content || !imgOrVideoPath) {
      return NextResponse.json(
        { message: "Content and image/video path are required." },
        { status: 429 }
      );
    }

    console.log(content, imgOrVideoPath);
    console.log("in the backend route");

    const isCountValid = await getMaxPostCount();

    if (!isCountValid) {
      return NextResponse.json(
        { message: "Daily post limit reached." },
        { status: 400 }
      );
    }
    // Call the function to post on LinkedIn
    const res = await linkedinPost(
      content,
      String.raw`${imgOrVideoPath}`,
      email,
      password
    );

    if (res) {
      await increaseCount();
    }

    return NextResponse.json(
      { message: "Post published successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error posting to LinkedIn:", error);
    return NextResponse.json(
      { message: "Failed to post on LinkedIn." },
      { status: 500 }
    );
  }
}
