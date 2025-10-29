"use client";

import * as React from "react";
import type { StagedImage } from "@tambo-ai/react";

type FileUploadContextValue = {
  images: StagedImage[];
  addImages: (files: File[]) => Promise<void>;
  removeImage: (fileId: string) => void;
  clearImages: () => void;
};

const FileUploadContext = React.createContext<FileUploadContextValue | null>(null);

export const useFileUpload = () => {
  const context = React.useContext(FileUploadContext);
  if (!context) {
    throw new Error("useFileUpload must be used within FileUploadProvider");
  }
  return context;
};

type FileUploadProviderProps = {
  children: React.ReactNode;
};

export const FileUploadProvider = (props: FileUploadProviderProps) => {
  const [images, setImages] = React.useState<StagedImage[]>([]);

  const addImages = React.useCallback(async (files: File[]) => {
    const newImages: StagedImage[] = await Promise.all(
      files.map(async (file) => {
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });

        return {
          id: Math.random().toString(36).substring(7),
          name: file.name,
          type: file.type,
          size: file.size,
          dataUrl,
          file,
        };
      })
    );

    setImages((prev) => [...prev, ...newImages]);
  }, []);

  const removeImage = React.useCallback((fileId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== fileId));
  }, []);

  const clearImages = React.useCallback(() => {
    setImages([]);
  }, []);

  const value = React.useMemo(
    () => ({
      images,
      addImages,
      removeImage,
      clearImages,
    }),
    [images, addImages, removeImage, clearImages]
  );

  return (
    <FileUploadContext.Provider value={value}>
      {props.children}
    </FileUploadContext.Provider>
  );
};
