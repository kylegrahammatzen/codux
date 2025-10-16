"use client";

import { PreviewHeader } from "@/components/preview/header";
import { PreviewFooter } from "@/components/preview/footer";

export const PreviewPanel = () => {
  return (
    <div className="flex-1 bg-white rounded-md flex flex-col transition-[width] ease-in-out duration-300">
      <PreviewHeader />

      {/* Loading spinner in center */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-black rounded-full animate-spin"></div>
        </div>
      </div>

      <PreviewFooter />
    </div>
  );
};
