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

  const clone = ref.current.cloneNode(true);

  printWindow.document.body.appendChild(clone);

  printWindow.document.title = title;

  printWindow.document.body.style.margin = "0";
  printWindow.document.body.style.background = "white";

  setTimeout(() => {
    printWindow.focus();
    printWindow.print();
  }, 1000);
  setTimeout(() => {
    printWindow.close();
  }, 6000);
};