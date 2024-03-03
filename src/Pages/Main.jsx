import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoUnmute } from "react-icons/go";
import { IoVolumeMute } from "react-icons/io5";
import app from "../config";
import { getDatabase, ref, set, get } from "firebase/database";

function Main() {
  // const videoSource = require('../Media/naindiaa.mp4');
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  // const [currentTime, setCurrentTime] = useState(0);
  const navigate = useNavigate();

  // const handleSkipForward = () => {
  //     const gdMessageStartTime = 86; // 2 minutes in seconds
  //     const newTime = gdMessageStartTime;
  //     videoRef.current.currentTime = newTime;
  //     setCurrentTime(newTime);
  // };

  const updateCount = async () => {
    try {
      const db = getDatabase(app);
      const counterRef = ref(db, "counter");

      const snapshot = await get(counterRef);
      const currentCount = snapshot.val().count;

      const newCount = currentCount + 1;

      await set(counterRef, {
        count: newCount,
      });

      console.log("Data saved successfully");
    } catch (error) {
      console.error("Error updating count:", error);
    }
  };

  const handlePlayPause = () => {
    const video = videoRef.current;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const getIcon = () => {
    return isMuted ? (
      <IoVolumeMute size={28} className="text-white" />
    ) : (
      <GoUnmute size={28} className="text-white" />
    );
  };
  const handleVideoEnd = () => {
    // Redirect to "/home" when the video ends

    // // calll heree *********
    updateCount();
    navigate("/home");
  };
  return (
    <div className="xl:h-[100vh] xl:w-[100vw] p-2 xl:border-4 bg-black  xl:border-white xl:border-solid m-auto w-fit  overflow-y-hidden">
      <video
        ref={videoRef}
        className="xl:h-[100%] h-full  xl:w-full"
        autoPlay
        muted={isMuted}
        onEnded={handleVideoEnd}
      >
        <source
          src={"https://mediamesh.s3.ap-south-1.amazonaws.com/naindiaa.mp4"}
          type="video/mp4"
        />
        <source
          src={"https://mediamesh.s3.ap-south-1.amazonaws.com/naindiaa.mp4"}
          type="video/ogg"
        />
        Your browser does not support the video tag.
      </video>

      <div className="flex items-center p-2 justify-between  ">
        {/* Skip button */}
        <div className="flex gap-3 mb-3">
          <Link
            className="xl:relative bottom-16 left-[1.3%] z-10"
            to={"/home"}
            onClick={updateCount}
          >
            <div className="xl:bg-gray-800   flex flex-col w-fit items-start justify-center  hover:bg-gray-400 text-xs  xl:px-6 px-1 py-2 rounded-md">
              <span className="text-white xl:text-md font-bold ">
                Digital Exhibition:{" "}
              </span>
              <span className="text-white xl:text-lg font-bold ">
                Subhash Abhinandan
              </span>
            </div>
          </Link>
          <div className=" md:relative xl:bottom-16 xl:left-[35%] left-[50%]  z-10 flex flex-col w-fit items-start justify-center  text-sm  xl:px-6 px-1 py-2 rounded-md">
            <span className="text-white xl:text-2xl font-extralight tracking-widest flex ">
              Introduction to&nbsp;
              <span className=" hidden xl:block">
                National Archives of India
              </span>{" "}
              (NAI){" "}
            </span>
          </div>
          {/* <button onClick={handleSkipForward} className='bg-white xl:relative bottom-14 left-[3%] text-sm z-10 xl:bg-gray-200   hover:bg-gray-400 text-black px-2 xl:px-6 py-2 rounded-md'>Skip to DG Message</button> */}
        </div>

        <button
          onClick={handlePlayPause}
          className="  xl:relative text-sm bottom-16 right-[-1%]  text-black xl:px-6 px-1 py-2 rounded-md"
        >
          {getIcon()}
        </button>
      </div>
    </div>
  );
}

export default Main;
