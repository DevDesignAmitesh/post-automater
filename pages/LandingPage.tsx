"use client";

import React, { useEffect, useState } from "react";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import PostPanel from "../components/PostPanel";
import { convertToZeroAfterOneDay } from "@/app/api/actions/convertToZeroAfterOneDay";
const LandingPage = () => {
  useEffect(() => {
    const convertToZero = async () => {
      const lastExecution = localStorage.getItem("lastExecutionTime");
      const currentTime = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;

      if (!lastExecution || currentTime - Number(lastExecution) >= oneDay) {
        await convertToZeroAfterOneDay();
        localStorage.setItem("lastExecutionTime", currentTime.toString());
      }
    };

    convertToZero();

    return () => {}; // No cleanup needed
  }, []);
  const [panel, setPanel] = useState<string>("linkedin");
  const panelList = ["linkedin"];

  return (
    <div className="w-full h-screen relative flex justify-center items-end pb-3 bg-[#111827]">
      <nav className="w-full absolute top-0 right-0 left-0 border-b border-white/50 h-16 flex items-center justify-between px-4 md:px-10">
        <h1 className="text-white text-[18px] md:text-2xl font-bold">
          Post Automater
        </h1>

        {/* contact developer and linkedin and github and twitter icons */}
        <div className="flex items-center gap-4">
          <div className="flex text-white items-center gap-3">
            <h3 className="text-white hidden md:block capitalize font-semibold">
              Build By
            </h3>
            {/* a line btween icons and text a vertical line */}
            <div className="h-[30px] w-[.5px] hidden md:block opacity-80 bg-white"></div>
            <a
              href="https://x.com/Amitesh48256"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/amitesh-singh-504b2b281/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn size={20} />
            </a>
            <a
              href="https://github.com/DevDesignAmitesh"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={20} />
            </a>
          </div>
        </div>
      </nav>
      <div className="w-[90%] md:w-[60%] h-auto border border-white/50 rounded-md relative flex flex-col justify-start items-center">
        <div className="w-full h-[80px] bg-gray-700 flex justify-between px-4 md:px-10 items-center">
          {panelList.map((item, index) => (
            <h3
              onClick={() => setPanel(item)}
              key={index}
              className={`text-white w-full text-center text-[14px] md:text-[18px] py-2 px-4 rounded-md font-semibold capitalize ${
                panel === item ? "bg-black/80 text-white" : ""
              }`}
            >
              {item}
            </h3>
          ))}
        </div>
        <div className="w-full h-full md:h-auto pb-4 bg-black/20 rounded-md">
          <PostPanel panel={panel} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
