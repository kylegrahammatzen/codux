"use client";

import { PreviewHeader } from "@/components/preview/header";
import { PreviewFooter } from "@/components/preview/footer";
import { PreviewProvider } from "@/components/preview/preview-context";
import { PreviewViewport } from "@/components/preview/viewport";

export const PreviewPanel = () => {
  return (
    <PreviewProvider>
      <div className="flex-1 bg-white rounded-md flex flex-col transition-[width] ease-in-out duration-300 min-h-0">
        <PreviewHeader />
        <PreviewViewport />
        <PreviewFooter />
      </div>
    </PreviewProvider>
  );
};
