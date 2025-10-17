"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type DeviceType = "desktop" | "tablet" | "mobile";

type Dimensions = {
  width: number;
  height: number;
};

type PreviewContextType = {
  device: DeviceType;
  setDevice: (device: DeviceType) => void;
  customWidth: number | null;
  setCustomWidth: (width: number | null) => void;
  customHeight: number | null;
  setCustomHeight: (height: number | null) => void;
  dimensions: Dimensions;
  setDimensions: (dimensions: Dimensions) => void;
};

const PreviewContext = createContext<PreviewContextType | undefined>(undefined);

type PreviewProviderProps = {
  children: ReactNode;
};

export const PreviewProvider = (props: PreviewProviderProps) => {
  const [device, setDevice] = useState<DeviceType>("desktop");
  const [customWidth, setCustomWidth] = useState<number | null>(null);
  const [customHeight, setCustomHeight] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 });

  return (
    <PreviewContext.Provider
      value={{ device, setDevice, customWidth, setCustomWidth, customHeight, setCustomHeight, dimensions, setDimensions }}
    >
      {props.children}
    </PreviewContext.Provider>
  );
};

export const usePreviewContext = () => {
  const context = useContext(PreviewContext);
  if (context === undefined) {
    throw new Error("usePreviewContext must be used within a PreviewProvider");
  }
  return context;
};
