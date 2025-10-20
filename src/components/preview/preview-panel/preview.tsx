"use client";

import { SandpackPreview } from "@codesandbox/sandpack-react";

type PreviewProps = {
  width: number;
  height: number;
};

export const Preview = (props: PreviewProps) => {
  const containerStyle = {
    width: props.width,
    height: props.height,
  };

  return (
    <div className="w-full h-full bg-white">
      <SandpackPreview
        showOpenInCodeSandbox={false}
        showRefreshButton={false}
        style={containerStyle}
      />
    </div>
  );
};
