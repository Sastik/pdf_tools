import { PDFDocument} from 'pdf-lib';

export const handleActionSplitPDF = async (pdfFile) => {
  try {
    // Check if the selected file is a PDF
    if (!pdfFile || !pdfFile.type.startsWith('application/pdf')) {
      throw new Error('Please select a valid PDF file.');
    }

    // Load the PDF file using pdf-lib
    const pdfBytes = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Get the number of pages in the PDF
    const numPages = pdfDoc.getPages().length;

    // Split the PDF into individual pages
    for (let pageNumber = 0; pageNumber < numPages; pageNumber++) {
      // Create a new PDF containing only the current page
      const newPdf = await PDFDocument.create();
      const [newPage] = await newPdf.copyPages(pdfDoc, [pageNumber]);
      newPdf.addPage(newPage);

      // Save the current page as a new PDF file
      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      // Create a download link and simulate a click to download the PDF
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = `page_${pageNumber + 1}.pdf`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);
    }

    console.log('PDF split successful!');
  } catch (error) {
    console.error('Error during PDF split:', error.message);
    alert('Error during PDF split. Please try again.');
  }
};
