import React, { useState } from "react";
import {  PDFDocument, rgb, StandardFonts } from "pdf-lib";
import download from "downloadjs";
import { getDatabase, ref, push } from "firebase/database";
import app from "../config";


function Certificate() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");

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
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const modifyPdf = async () => {
    try {
      const url = "/NAI_Certificate_Of_Participation.pdf";
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
        y: 400,
        size: 20,
        font: timesRomanFont,
        color: rgb(0, 0, 0),
      });

      saveToFirebase(); // Save data to Firebase
      const pdfBytes = await pdfDoc.save();
      download(pdfBytes, "certificate.pdf", "application/pdf");
    } catch (error) {
      console.error("Error modifying PDF:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen"
    style={{
      backgroundImage: `url('bg.jpeg')`, // Use the correct path to your image
      backgroundSize: 'cover', // Adjust the background size as needed
      backgroundPosition: 'center', // Adjust the background position as needed
      opacity:1
    }}
    >
      <div className="bg-white p-8 shadow-md rounded-lg w-96 md:w-[40vw]">
        <p className="text-center">
          Enter your name, email, and feedback, and click the button to
          download your certificate
        </p>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Enter your name"
          className="w-full mt-4 p-2 border border-gray-300 rounded-md"
        />

        <input
          type="text"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          className="w-full mt-4 p-2 border border-gray-300 rounded-md"
        />
        <textarea
          type="text"
          value={comments}
          onChange={handleCommentsChange}
          placeholder="Enter your feedback"
          className="w-full mt-4 p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={modifyPdf}
          className="w-full mt-4 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
        <p className="text-xs text-center mt-2">
          (Your browser will download the resulting certificate)
        </p>
      </div>
    </div>
  );
}

export default Certificate;
