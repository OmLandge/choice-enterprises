import { RefObject } from "react";

export const handlePrint = (ref: RefObject<HTMLDivElement>, title: string) => {
  if (!ref.current) return;

  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    alert("Please allow popups.");
    return;
  }

  // Copy styles
  document
    .querySelectorAll('link[rel="stylesheet"], style')
    .forEach((node) => {
      printWindow.document.head.appendChild(node.cloneNode(true));
    });

  // Remove page margins
  const style = printWindow.document.createElement("style");
  style.textContent = `
    @page {
      margin: 0;
    }

    html, body {
      margin: 0;
      padding: 0;
      background: white;
    }
  `;
  printWindow.document.head.appendChild(style);

  const clone = ref.current.cloneNode(true);
  printWindow.document.body.appendChild(clone);

  printWindow.document.title = title;

  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
  }, 1000);

  setTimeout(() => {
    printWindow.close();
  }, 6000);
};