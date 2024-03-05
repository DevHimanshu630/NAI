import React, { useState } from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import download from "downloadjs";
import { getDatabase, ref, push } from "firebase/database";
import app from "../config";
import { useNavigate } from "react-router-dom";

function Certificate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const saveToFirebase = () => {
    try {
      const db = getDatabase(app);
      push(ref(db, "feedbacks"), {
        name,
        email,
        comments,
      });
    } catch (error) {
      console.error("Error saving to Firebase:", error);
    }
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    const uppercaseFirstLetter = value.charAt(0).toUpperCase() + value.slice(1);

    if (uppercaseFirstLetter.length <= 57) {
      setName(uppercaseFirstLetter);
      setError("");

    } else {
      setError("Name must be at most 57 characters long.");
    }
  };


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const validateForm = () => {
    if (name.trim() === "" || email.trim() === "") {
      comments.trim();
      setError("All fields are required");
      return false;
    }
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return false;
    }
    return true;
  };

  const modifyPdf = async () => {
    if (!validateForm()) return;

    try {
      const url = "/NAI Certificate Of Participation.pdf";
      const existingPdfBytes = await fetch(url).then((res) =>
        res.arrayBuffer()
      );

      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];

      const { width } = firstPage.getSize();

      const textWidth = timesRomanFont.widthOfTextAtSize(name, 20);

      // Calculate the x-coordinate for centering the text horizontally
      const centerX = (width - textWidth) / 2;

      // Draw the entered name and email on the PDF
      firstPage.drawText(name, {
        x: centerX,
        y: 401,
        size: 20,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      saveToFirebase(); // Save data to Firebase
      setName("");
      setEmail("");
      setComments("");
      const pdfBytes = await pdfDoc.save();
      if (pdfBytes) {
        download(pdfBytes, "certificate.pdf", "application/pdf");
        alert("Certificate Downloaded");
      }


    } catch (error) {
      console.error("Error modifying PDF:", error);
    }
  };

  const [showModel, setShowModel] = useState(true)

  const handleCloseModal = () => {
    setShowModel(false);
    navigate("/")
  };


  return (
    <>

      {showModel && (
        <div
          className="flex items-center justify-center h-screen"
          style={{
            backgroundImage: `url('bg.jpeg')`, // Use the correct path to your image
            backgroundSize: "cover", // Adjust the background size as needed
            backgroundPosition: "center", // Adjust the background position as needed
            opacity: 1,
          }}
        >
          <div className="bg-white p-8 shadow-md rounded-lg w-96 md:w-[40vw]">
            <div className="flex justify-between ">

              <p className="">
                Enter your name, email, and feedback, and click the button to download
                your certificate
              </p>
              <p onClick={handleCloseModal} className="hover:cursor-pointer text-center font-sans bg-gray-700 hover:bg-gray-800 text-white h-6 w-6 ">X</p>
            </div>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name"
              className="w-full mt-4 p-2 border capitalize  border-gray-300 rounded-md"
            />

            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="w-full mt-4 p-2 border border-gray-300 rounded-md"
            />
            <textarea
              value={comments}
              onChange={handleCommentsChange}
              placeholder="Enter your feedback"
              className="w-full mt-4 p-2 border  border-gray-300 rounded-md"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              onClick={modifyPdf}
              className="w-full mt-4 p-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
            >
              Submit
            </button>
            <p className="text-xs text-center mt-2">
              (Your browser will download the resulting certificate)
            </p>
          </div>
        </div>)}
    </>
  );
}

export default Certificate;