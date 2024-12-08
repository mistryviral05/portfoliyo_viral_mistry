
"use client";

import { useState } from "react";






export default function CopyButton({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded hover:bg-amber-700 transition-colors"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}
