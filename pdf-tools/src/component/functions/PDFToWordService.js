// handleActionPDFToWord.js

import { PDFDocument } from 'pdf-lib';


export const handleActionPDFToWord = async (file) => {
  try {
    // Load the PDF file using pdf-lib
    const pdfBytes = await file.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Extract text from each page of the PDF
    let text = '';
    const pages = pdfDoc.getPages();
    console.log(pages)

    for (const page of pages) {
      const pageText = await page.getText();
      text += pageText;
    }

    // Create a new Word document
    const doc = document.implementation.createHTMLDocument();
    const body = doc.body;
    const pre = doc.createElement('pre');
    pre.textContent = text;
    body.appendChild(pre);

    // Save the Word document as a .doc file
    const wordContent = doc.documentElement.outerHTML;
    const blob = new Blob([wordContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted_document.doc';
    a.click();

    // Clean up and remove the URL object
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error converting PDF to Word:', error);
    alert('Error converting PDF to Word. Please try again.');
  }
};
