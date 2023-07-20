import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';

export const handleActionPDFMerger = async (files) => {
  try {
  
    // This function will be called when the "Merge Now" button is clicked.
    const pdfDocs = [];

    // Load all the selected PDF files into an array of PDF documents
    for (const file of files) {
      const pdfBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      pdfDocs.push(pdfDoc);
    }

    // Create a new PDF document to merge into
    const mergedPdf = await PDFDocument.create();

    // Merge the pages from all the PDF documents into the new document
    for (const pdfDoc of pdfDocs) {
      const pages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));
    }

    // Save the merged PDF to a new ArrayBuffer
    const mergedPdfBytes = await mergedPdf.save();

    // Download the merged PDF
    const mergedBlob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
    saveAs(mergedBlob, 'merged.pdf');
    console.log('PDFs merged and downloaded successfully!');
  } catch (error) {
    console.error('Error merging PDFs:', error);
  }
};
