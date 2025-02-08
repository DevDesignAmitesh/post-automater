"use client";

import React, { useState } from "react";

const PostPanel = ({ panel }: { panel: string }) => {
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handlePost = async () => {
    if (!content || !file || !email || !password) {
      alert("Please provide content and an image/video.");
      return;
    }

    const cleanPath = file.replace(/^"|"$/g, "");

    // Create form data to send to the server
    const formData = {
      content,
      imgOrVideoPath: cleanPath, // Send the file path (or you can send the file itself in a FormData request)
      email,
      password,
    };

    try {
      const response = await fetch("/api/linkedinPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error posting:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="w-full h-full px-4 relative md:px-10 pt-5 gap-4 flex flex-col justify-start items-start">
      <div className="flex w-full gap-2 flex-col justify-center items-start">
        <h1 className="text-white text-[18px] font-semibold capitalize">
          LinkedIn Email
        </h1>
        <input
          type="text"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
          className="w-full h-full bg-transparent placeholder:text-white/50 text-white px-4 py-2 flex justify-center items-center border border-white/50 rounded-md"
          placeholder="LinkedIn Email"
        />
      </div>
      <div className="flex w-full gap-2 flex-col justify-center items-start">
        <h1 className="text-white text-[18px] font-semibold capitalize">
          LinkedIn Password
        </h1>
        <input
          type="password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          className="w-full h-full bg-transparent placeholder:text-white/50 text-white px-4 py-2 flex justify-center items-center border border-white/50 rounded-md"
          placeholder="LinkedIn Password"
        />
      </div>
      <div className="flex w-full gap-2 flex-col justify-center items-start">
        <h1 className="text-white text-[18px] font-semibold capitalize">
          Post Content
        </h1>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full resize-none bg-transparent placeholder:text-white/50 text-white px-2 pt-1 border border-white/50 rounded-md"
          rows={5}
          maxLength={480}
          placeholder="Post content"
        />
      </div>
      <div className="flex w-full gap-2 flex-col justify-center items-start">
        <h1 className="text-white text-[18px] font-semibold capitalize">
          Upload Image or Video Url
        </h1>
        <input
          type="text"
          value={file}
          onChange={(e: any) => setFile(e.target.value)}
          className="w-full h-full bg-transparent placeholder:text-white/50 text-white px-4 py-2 flex justify-center items-center border border-white/50 rounded-md"
          placeholder="Image or video"
          accept="image/*, video/*" // Accepts both images and videos
        />
      </div>
      <button
        onClick={handlePost}
        className="w-full font-medium hover:bg-white/70 transition-all duration-300 bg-white text-black px-4 py-2 flex justify-center items-center border border-white/50 rounded-md"
      >
        {panel === "linkedin" && "Post on LinkedIn"}
        {panel === "twitter" && "Post on Twitter"}
        {panel === "both" && "Post on both Twitter and LinkedIn"}
      </button>
    </div>
  );
};

export default PostPanel;
