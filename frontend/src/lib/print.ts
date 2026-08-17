import { RefObject } from "react";

export const handlePrint = (
  ref: RefObject<HTMLDivElement>,
  title: string
) => {
  if (!ref.current) return;

  const printWindow = window.open("", "_blank");

  if (!printWindow) {
    alert("Please allow popups.");
    return;
  }

  document
    .querySelectorAll('link[rel="stylesheet"], style')
    .forEach((node) => {
      printWindow.document.head.appendChild(node.cloneNode(true));
    });

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

  printWindow.document.body.appendChild(
    ref.current.cloneNode(true)
  );

  printWindow.document.title = title;

  printWindow.onload = () => {
    printWindow.focus();

    printWindow.onafterprint = () => {
      printWindow.close();
    };

    printWindow.print();
  };

  printWindow.document.close();
};