import jsPDF from 'jspdf';

export const handleActionJPGToPDF = async (jpgFile) => {
  try {
    // Check if the selected file is a JPG
    if (!jpgFile || !jpgFile.type.startsWith('image/jpeg')) {
      throw new Error('Please select a valid JPG file.');
    }

    // Create a new instance of jsPDF
    const pdf = new jsPDF();

    // Load the JPG file as an image data URL
    const reader = new FileReader();
    reader.readAsDataURL(jpgFile);

    // Wait for the reader to load the file as a data URL
    await new Promise((resolve, reject) => {
      reader.onloadend = () => resolve();
      reader.onerror = () => reject();
    });

    // Get the image data URL
    const imageData = reader.result;

    // Add the image to the PDF
    pdf.addImage(imageData, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

    // Save the PDF
    pdf.save('converted.pdf');

    console.log('JPG to PDF conversion successful!');
  } catch (error) {
    console.error('Error during JPG to PDF conversion:', error.message);
    alert('Error during JPG to PDF conversion. Please try again.');
  }
};
