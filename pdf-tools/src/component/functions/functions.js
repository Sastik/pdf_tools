import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { AiOutlineMergeCells } from "react-icons/ai";
import { MdPictureAsPdf } from "react-icons/md";
import { ImFilePdf } from "react-icons/im";
import { BiSolidFileJpg } from "react-icons/bi";

import { handleActionPDFMerger } from "./PDFMergerService";
import { handleActionPDFToWord } from "./PDFToWordService";
import { handleActionJPGToPDF } from "./JPGToPDFService";
import { handleActionSplitPDF } from "./PDFSplitService";

export const Survices = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // ==============================Merge PDF===================================
  const handleFileInputChange = (event) => {
    const files = event.target.files;
    setSelectedFiles(files);
  };

  const handleMergeButtonClick = async () => {
    if (selectedFiles.length < 2) {
      alert("Please select 2 or more PDFs to merge...!");
    } else {
      await handleActionPDFMerger(selectedFiles);
      // Reset selectedFiles to an empty array after successful merge and download
      setSelectedFiles([]);
    }}

  // ==============================PDF to Word===================================
  // service.js

const handleFileInputChangeConvert = (event) => {
  const file = event.target.files[0]; // Get only the first file from the input
  setSelectedFile(file); // Use setSelectedFile (singular) instead of setSelectedFiles (plural)
};

const handleConvertButtonClick = async () => {
  if (!selectedFile) {
    alert("Please select a PDF file to convert to Word.");
  } else {
    await handleActionPDFToWord(selectedFile); // Pass the single file object instead of an array
    setSelectedFile(null); // Set selectedFile to null after successful conversion and download
  }
};


  // ==============================JPG toPDF===================================
  const handleFileInputChangeJPGToPDF = (event) => {
    const file = event.target.files[0]; // Get only the first file from the input

    setSelectedFiles(file);
  };

  const handleConvertJPGToPDF = async () => {
    if (!selectedFiles) {
      alert("Please select a JPG file to convert to PDF.");
    } else {
      await handleActionJPGToPDF(selectedFiles);
      setSelectedFiles(null);
    }
  };

  //==============================Split PDF====================================
  const handleFileInputSplitPDF = (event) => {
    const file = event.target.files[0]; // Get only the first file from the input

    setSelectedFiles(file);
  };

  const handleSplitPDF = async () => {
    if (!selectedFiles) {
      alert("Please select a PDF file to Split all page.");
    } else {
      await handleActionSplitPDF(selectedFiles);
      setSelectedFiles(null);
    }
  };

  const serviceData = [
    {
      id: 1,
      title: "PDF Merger",
      input: ".pdf",
      icon: AiOutlineMergeCells,
      button: "Merge Now",
      handleFileInputChange: handleFileInputChange,
      handleAction: handleMergeButtonClick,
    },
    {
      id: 3,
      title: "JPG to PDF",
      input: ".jpg",
      icon: ImFilePdf,
      button: "Convert Now",
      handleFileInputChange: handleFileInputChangeJPGToPDF,
      handleAction: handleConvertJPGToPDF,
    },
    {
      id: 4,
      title: "PDF Split",
      input: ".pdf",
      icon: MdPictureAsPdf,
      button: "Split Now",
      handleFileInputChange: handleFileInputSplitPDF,
      handleAction: handleSplitPDF,
    },
    {
      id: 2,
      title: "PDF to Word",
      input: ".pdf",
      icon: BiSolidFileJpg,
      button: "Convert Now",
      handleFileInputChange: handleFileInputChangeConvert,
      handleAction: handleConvertButtonClick,
    },
  ];

  return (
    <>
      <Typography
        variant="h3"
        color="white"
        className="pl-4 pt-4 w-full flex align-middle justify-center"
      >
        Hey! These are some easy PDF Handler tools:
      </Typography>
      <div className="flex flex-wrap my-2 align-middle items-center justify-center">
        {serviceData.map((service) => (
          <Card
            key={service.id}
            className="mt-6 mx-5 w-80 bg-gradient-to-r from-blue-500 shadow-orange-800 shadow-md hover:drop-shadow-xl"
          >
            <CardBody>
              <Typography variant="h4" color="blue-gray" className="-mt-2 mb-1">
                {service.title}
              </Typography>
              <input
                type="file"
                accept={service.input}
                multiple
                onChange={service.handleFileInputChange}
                name="file-input"
                id="file-input"
              />
            </CardBody>
            <CardFooter className="-mt-5">
              <Button
                onClick={service.handleAction}
                color="amber"
                className="flex flex-row gap-2 drop-shadow-lg hover:bg-[#51b856f5]"
              >
                {React.createElement(service.icon)}
                {service.button}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};
