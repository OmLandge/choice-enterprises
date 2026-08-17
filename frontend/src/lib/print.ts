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

  const clone = ref.current.cloneNode(true);
  printWindow.document.body.appendChild(clone);

  printWindow.document.title = title;

  printWindow.addEventListener("afterprint", () => {
    printWindow.close();
  });

  // Give the new window time to load styles/content
  printWindow.addEventListener("load", () => {
    printWindow.focus();
    printWindow.print();
  });

  // Fallback in case load has already fired
  setTimeout(() => {
    if (!printWindow.closed) {
      printWindow.focus();
      printWindow.print();
    }
  }, 500);
};