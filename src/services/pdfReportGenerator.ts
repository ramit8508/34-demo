import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import type { ProductRecord, InspectionScenario } from '../data/productData';
import type { InspectorUser } from '../auth/authStore';

export interface PDFExportOptions {
  reportElementId: string;
  product: ProductRecord;
  scenario: InspectionScenario;
  inspector: InspectorUser;
  inspectionId: string;
  inspectionTimestamp: string;
  inspectorRemarks?: string;
  followUpAction?: string;
  frontImage?: string | null;
  backImage?: string | null;
}

/**
 * Generate and download a publication-grade official inspection PDF report.
 * Works client-side directly from the active inspection DOM and metadata.
 */
export async function exportInspectionReportToPDF(options: PDFExportOptions): Promise<string> {
  const {
    reportElementId,
    inspectionId,
  } = options;

  const targetElement = document.getElementById(reportElementId);
  if (!targetElement) {
    throw new Error(`Report element with ID "${reportElementId}" not found in DOM.`);
  }

  // Generate deterministic filename
  const filename = `MetriGuard_Inspection_${inspectionId}.pdf`;

  // Clone or capture target element at high resolution
  const canvas = await html2canvas(targetElement, {
    scale: 2, // 2x scale for crisp 300dpi-equivalent print rendering
    useCORS: true,
    logging: false,
    backgroundColor: '#FFFFFF',
    windowWidth: 1024,
    onclone: (clonedDoc) => {
      const clonedTarget = clonedDoc.getElementById(reportElementId);
      if (clonedTarget) {
        clonedTarget.style.width = '1000px';
        clonedTarget.style.padding = '24px';
        clonedTarget.style.background = '#FFFFFF';
        clonedTarget.style.color = '#202124';
      }
      // Hide non-printable interactive elements in PDF export
      const noPrintEls = clonedDoc.querySelectorAll('.no-pdf-export, .report-sticky-bar, .report-action-btn-row');
      noPrintEls.forEach((el) => {
        (el as HTMLElement).style.display = 'none';
      });
    },
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.95);

  // A4 dimensions in mm: 210 x 297
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = 210;
  const pdfHeight = 297;
  const margin = 10; // 10mm margin
  const contentWidth = pdfWidth - margin * 2;
  
  // Calculate content height in mm corresponding to canvas aspect ratio
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const totalPdfContentHeight = (imgHeight * contentWidth) / imgWidth;

  const pageContentHeight = pdfHeight - margin * 2;
  let heightLeft = totalPdfContentHeight;
  let position = margin;
  let page = 1;

  // First page
  pdf.addImage(
    imgData,
    'JPEG',
    margin,
    position,
    contentWidth,
    totalPdfContentHeight,
    undefined,
    'FAST'
  );
  
  // Add running footer to page 1
  addPageFooter(pdf, page, inspectionId);

  heightLeft -= pageContentHeight;

  // Multi-page loop if content spans across multiple A4 pages
  while (heightLeft > 0) {
    pdf.addPage();
    page += 1;
    position = margin - (page - 1) * pageContentHeight;
    pdf.addImage(
      imgData,
      'JPEG',
      margin,
      position,
      contentWidth,
      totalPdfContentHeight,
      undefined,
      'FAST'
    );
    addPageFooter(pdf, page, inspectionId);
    heightLeft -= pageContentHeight;
  }

  // Trigger download
  pdf.save(filename);
  return filename;
}

/**
 * Adds an official running footer with pagination to each generated page
 */
function addPageFooter(pdf: jsPDF, pageNum: number, inspectionId: string) {
  const pageHeight = 297;
  pdf.setFont('Helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(128, 134, 139);
  
  // Left: Official MetriGuard Notice
  pdf.text(
    'MetriGuard Legal Metrology Inspection Assistance System · Official Inspection Record',
    10,
    pageHeight - 6
  );

  // Right: Inspection ID & Page Number
  const pageText = `Inspection ID: ${inspectionId} | Page ${pageNum}`;
  pdf.text(pageText, 200, pageHeight - 6, { align: 'right' });
}
