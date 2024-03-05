import React, { useEffect, useState } from "react";
import app from "../config";
import Modal from "react-modal";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.min.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { getDatabase, ref, onValue, set, get } from "firebase/database";
import Image1 from "../Media/Panel 1.jpg";
import Image2 from "../Media/Panel 2.jpg";
import Image3 from "../Media/Panel 3.jpg";
import Image4 from "../Media/Panel 4.jpg";
import Image5 from "../Media/Panel 5.jpg";
import Image6 from "../Media/Panel 6.jpg";
import Image7 from "../Media/Panel 7.jpg";
import Image8 from "../Media/Panel 8.jpg";
import Image9 from "../Media/Panel 9.jpg";
import Image10 from "../Media/Panel 10.jpg";
import Image11 from "../Media/Panel 11.jpg";
import Image12 from "../Media/Panel 12.jpg";
import Image13 from "../Media/Panel 13.jpg";
import Image14 from "../Media/Panel 14.jpg";
import Image15 from "../Media/Panel 15.jpg";
import Image16 from "../Media/Panel 16.jpg";
import { TfiGallery } from "react-icons/tfi";

function Home() {
  const [count, setCount] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isModalOpenNai, setIsModalOpenNai] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);

  const Panels = [
    { src: Image1, alt: "Image 1" },
    { src: Image2, alt: "Image 2" },
    { src: Image3, alt: "Image 3" },
    { src: Image4, alt: "Image 4" },
    { src: Image5, alt: "Image 5" },
    { src: Image6, alt: "Image 6" },
    { src: Image7, alt: "Image 7" },
    { src: Image8, alt: "Image 8" },
    { src: Image9, alt: "Image 9" },
    { src: Image10, alt: "Image 10" },
    { src: Image11, alt: "Image 11" },
    { src: Image12, alt: "Image 12" },
    { src: Image13, alt: "Image 13" },
    { src: Image14, alt: "Image 14" },
    { src: Image15, alt: "Image 15" },
    { src: Image16, alt: "Image 16" },
  ];
  const openCarousel = () => {
    setIsCarouselOpen(true);
  };

  const closeCarousel = () => {
    setIsCarouselOpen(false);
  };

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
    updateCount();
    setIsModalOpen(true); // Open modal when component mounts
  }, []);

  return (
    <div className="h-[100vh] ">
      <div className="xl:bg-gray-800 top-[0.9%] left-[0.5%] bg-black z-10 absolute flex flex-col w-fit items-start justify-center text-xs  xl:px-6 px-1 py-2 rounded-md">
        <span className="text-white xl:text-lg font-bold ">
          Total Visitors : {count}
        </span>
      </div>

      {/* corousel code */}
      <button
        className=" xl:mt-[50vh]  mt-[130%] hover:cursor-pointer bg-white p-3 shadow-black shadow-md absolute z-70 "
        onClick={openCarousel}
      >
        <TfiGallery size={24} />
      </button>
      <div className="z-70 ">
        {isCarouselOpen && (
          <div className="w-full h-[100vh]  bg-black/70 overflow-hidden p-10 absolute flex items-start justify-center">
            <div className=" xl:w-[40vw] w-[60vw]  xl:h-[50vh]">
              <button
                onClick={closeCarousel}
                className="absolute top-2 right-2 text-white text-xl bg-black bg-opacity-50 rounded-full px-3 py-1 z-50"
              >
                &times;
              </button>

              <Carousel
                showArrows={true}
                showThumbs={true}
                showStatus={false}
                infiniteLoop={true}
                autoPlay={false}
                emulateTouch={true}
                showIndicators={false}
                dynamicHeight={false}
                style={{
                  ".carousel .control-dots .dot:hover": {
                    backgroundColor: "transparent !important",
                  },
                }}
              >
                {Panels.map((Panel, index) => (
                  <div key={index} className="">
                    <img
                      className=" object-contain"
                      src={Panel.src}
                      alt={Panel.alt}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        )}
      </div>

      {/* corousel code end */}

      {/* Modal */}
      {isModalOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          {/* Modal content */}
          <div className="relative flex items-center justify-center pt-10  p-2  w-full max-w-xl max-h-full ">
            <div className="relative border bg-white rounded-sm dark:bg-white">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="xl:text-xl font-semibold text-gray-900 dark:text-black">
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
              <div className="flex md:gap-5 gap-4 justify-center md:justify-normal items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  data-modal-hide="default-modal"
                  type="button"
                  className="text-white bg-gray-700 px-2 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm md:px-5  py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={openVideoModal}
                >
                  Introduction to NAI
                </button>
                <button
                  data-modal-hide="default-modal"
                  type="button"
                  className="py-2.5 md:px-5 ms-3 px-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border  hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
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
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: "60",
          },
          content: {
            maxWidth: "80vw",
            maxHeight: "85vh",
            width: "80vw",
            height: "auto",
            margin: "0 auto",
            padding: "20px",
            borderRadius: "8px",
          },
        }}
      >
        <div
          className="max-w-[80vw] z-56 mx-auto p-4 pb-7 md:p-12"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url("/National_Archives_of_India_Emblem.jpg")',
            backgroundSize: "",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <h2 className="text-2xl font-bold mb-4">
            सुभाष अभिनन्दन: नेताजी सुभाष चन्द्र बोस के जीवन पर आधारित एक
            प्रदर्शनी
          </h2>
          <p className=" text-justify text-xl mb-1">
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
          <p className=" text-justify text-xl mb-1">
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
          <br />
          <h2 className="text-2xl font-bold mb-4">
            Subhash Abhinandan: An Exhibition Based on the Life of Netaji
            Subhash Chandra Bose
          </h2>

          <p className=" text-justify text-xl mb-1">
            The National Archives of India is celebrating its 134th Foundation
            Day. On this occasion, a digital exhibition based on the life of
            Netaji Subhash Chandra Bose is being organized. This exhibition
            draws from documents available in the National Archives. The
            personal records of Netaji Subhash Chandra Bose are preserved in the
            National Archives and can be accessed via the Netaji Portal
            (http://www.netajipapers.gov.in/) and the Abhilekh Patal
            (https://www.abhilekh-patal.in/jspui/). The records include letters
            written by him, the diary of his father Shri Janaki Nath Bose,
            documents of the Azad Hind Fauj, and many government documents
            related to him.
          </p>

          <p className=" text-justify text-xl mb-1">
            The exhibition comprises 16 sections covering the period from his
            birth to the present time. It provides a glimpse into his life
            through documents, showcasing signiﬁcant items such as Janaki Nath
            Bose's diary, which mentions his birth, his civil service
            examination results, and more. The decades of struggle from 1920 to
            1940 are well-documented, offering insights into his speeches, his
            adventurous journey, and the struggles of the Azad Hind Fauj.
            Additionally, the exhibition addresses the award and deferral of the
            Bharat Ratna and the efforts made by the Ministry of Culture to
            honor Netaji . The following 16 panels discuss various aspects of
            his life: Birth, Prodigious Talent, Freedom Fighters-I, Freedom
            Fighters-II, Freedom Fighters-III, International Activities,
            Articles and Speeches-I, Articles and Speeches-II, Courageous
            Journey, Azad Hind Fauj (Senapati)-I, Azad Hind Fauj (Rani Jhansi
            Regiment)-II, Azad Hind Fauj (Decorations)-III, Delhi Chalo, Ek
            Rahasya (A Mystery), Bharat Ratna, and efforts by everyone. This
            exhibition offers a unique experience and also available in virtual
            reality.
          </p>

          <button
            className="md:mt-4 float-right bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
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
