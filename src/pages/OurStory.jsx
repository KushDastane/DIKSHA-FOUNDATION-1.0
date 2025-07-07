import React from "react";
import StoryTimeline from "../components/StoryTimeline";
import Team from "../components/Team";
import { Link } from "react-router-dom";

const OurStory = () => {
  return (
    <>
      <StoryTimeline />
      <Team />
      <div className="flex items-center justify-center">
        <Link
          to={"/#about"}
          className="mb-5 mt-5 py-2 px-6 bg-green-600 rounded-md text-white font-poppins x font-semibold hover:bg-green-700 transition"
        >
          Back
        </Link>
      </div>
    </>
  );
};

export default OurStory;
