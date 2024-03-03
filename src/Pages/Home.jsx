import React, { useEffect, useState } from "react";
import app from "../config";
import Modal from "react-modal";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.min.css";

import { getDatabase, ref, onValue } from "firebase/database";

function Home() {
  const [count, setCount] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isModalOpenNai, setIsModalOpenNai] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpenNai(true);
  };

  const closeModal = () => {
    setIsModalOpenNai(false);
  };

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };
  useEffect(() => {
    async function fetchCount() {
      try {
        const db = getDatabase(app);
        const counterRef = ref(db, "counter");

        const unsubscribe = onValue(counterRef, (snapshot) => {
          const currentCount = snapshot.val().count;
          setCount(currentCount);
        });
        return () => unsubscribe();
      } catch (error) {
        console.error("Error updating count:", error);
      }
    }

    fetchCount();
  }, []);

  useEffect(() => {
    setIsModalOpen(true); // Open modal when component mounts
  }, []);

  return (
    <div className="h-[100vh]">
      {/* <div className="h-[100screen] bg-red-400"> */}
      <div className="xl:bg-gray-800 top-[0.9%] left-[0.5%] bg-black z-10 absolute flex flex-col w-fit items-start justify-center text-xs  xl:px-6 px-1 py-2 rounded-md">
        <span className="text-white xl:text-lg font-bold ">
          Total Visitors : {count}
        </span>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          {/* Modal content */}
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white dark:bg-white">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-black">
                  <p>National Archives of India (NAI)</p>
                  <p>"Digital Exhibition"</p>
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)} // Close modal on button click
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 md:p-5 space-y-4">
                <img src="introImg.jpg" alt="Introduction to NAI" />
                {/* <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400"></p> */}
              </div>
              <div className="flex gap-5 items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  data-modal-hide="default-modal"
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={openVideoModal}
                >
                  Introduction to NAI
                </button>
                <button
                  data-modal-hide="default-modal"
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  onClick={openModal}
                >
                  About the Exhibition
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
     
      <iframe
        src="https://app.lapentor.com/sphere/national-archives-of-india-demo-virtual-tour"
        frameborder="0"
        width="100%"
        height="100%"
        scrolling="no"
        allow="vr,gyroscope,accelerometer"
        allowfullscreen="true"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        oallowfullscreen="true"
        msallowfullscreen="true"
      ></iframe>

      {/* Modal of intro of Exhibition */}

      <Modal
        isOpen={isModalOpenNai}
        onRequestClose={closeModal}
        contentLabel="Introduction of NAI Modal"
        portalClassName="modal-portal-nai"
        // style={{ overlay: { zIndex: 60 }, content: { zIndex: 65 } }}
        style={{ 
          overlay: {
            // backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex:'60'
          },
          content: {
          maxWidth: '80vw', 
          maxHeight: '80vh', 
          width: 'auto', 
          height: 'auto', 
          margin: '0 auto', 
          padding: '20px', 
          borderRadius: '8px', 
        }
      }}
      >
        <div className="max-w-[80vw] z-56 mx-auto p-8">
          <h2 className="text-2xl font-bold mb-4">
            सुभाष अभिनन्दन: नेताजी सुभाष चन्द्र बोस के जीवन पर आधारित एक
            प्रदर्शनी
          </h2>
          <p>
            राष्ट्रीय अभिलेखागार अपने स्थापना का 134 वां स्थापना दिवस मना रहा
            है। इस अवसर पर सुभाष चन्द्र बोस के जीवन पर आधारित एक डिजिटल
            प्रदर्शनी का आयोजन किया जा रहा है। यह प्रदर्शनी राष्ट्रीय अभिलेखागार
            में उपलब्ध दस्तावेजों पर आधारित है। नेताजी सुभाष चन्द्र बोस के निजी
            अभिलेख राष्ट्रीय अभिलेखागार में ही सुरक्षित हैं और उन्हें नेताजी
            पोर्टल (http://www.netajipapers.gov.in/) एवं अभिलेख पटल
            (https://www.abhilekh-patal.in/jspui/) पर देखा जा सकता है। इन
            अभिलेखों में उनके द्वारा लिखे गये पत्र, उनके पिताजी श्री जानकी नाथ
            बोस की डायरी, आजाद हिन्द फौज के दस्तावेज एवं उनसे संबंधित अनेक
            शासकीय दस्तावेज उपलब्ध है।
          </p>
          <p>
            इस प्रदर्शनी के 16 भाग हैं जिसमें उनके जन्म से लेकर वर्तमान समय तक
            को पिरोया गया है। इस अभिलेखीय प्रदर्शनी में दस्तावेजों के माध्यम से
            उनके जीवन की झांकी मिलती है। अनेक महत्वपूर्ण दस्तावेजों को इसमें
            देखा जा सकता है जैसे जानकी नाथ बोस की डायरी जिसमें उनके जन्म का
            उल्लेख है, सिविल सेवा में उनके परिणाम इत्यादि। 1920-1940 के दशकों के
            उनके संघर्ष को इसमें संजोया गया है। उनके भाषण उनकी साहसिक यात्रा,
            आजाद हिन्द फौज के संघर्ष की झांकी भी इस प्रदर्शनी में मिलती है। भारत
            रत्न दिया जाना एवं स्थागित करना तथा उनके सम्मान हेतु संस्कृति
            मंत्रालय द्वारा किए जा रहे प्रयासों को निम्न 16 पैनल जन्म, विलक्षण
            प्रतिभा, आजादी की लड़ाई- I, आजादी की लड़ाई- II, आजादी की लड़ाई- III,
            अन्तर्राष्ट्रीय गतिविधियां, लेख एवं भाषण-I, लेख एवं भाषण-II, साहसी
            यात्रा, आजाद हिन्द फौज (सेनापति)-I, आजाद हिन्द फौज (रानी झांसी
            रेजिमेण्ट)-II, आजाद हिन्द फौज (अलंकरण)-III, दिल्ली चलो, एक रहस्य,
            भारत रत्न, सबका प्रयास के माध्यम से दिखाया गया है। यह प्रदर्शनी एक
            अलग अनुभव प्रदान करती है इसे वर्चुअल रियालिटी (virtual reality) में
            भी देखा जा सकता है।
          </p>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </Modal>

      {/* modal of intro of NAI */}

      <ModalVideo
        channel="custom"
        isOpen={isVideoModalOpen}
        url="https://mediamesh.s3.ap-south-1.amazonaws.com/naindiaa.mp4"
        onClose={closeVideoModal}
      ></ModalVideo>
    </div>
  );
}

export default Home;
