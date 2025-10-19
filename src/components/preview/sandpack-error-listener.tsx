"use client";

import { useEffect } from "react";
import { useSandpack } from "@codesandbox/sandpack-react";
import { useSandpackContext } from "@/components/sandpack-context";

export const SandpackErrorListener = () => {
  const { listen } = useSandpack();
  const { setErrors } = useSandpackContext();

  useEffect(() => {
    const unsubscribe = listen((message) => {
      if (message.type === "error") {
        setErrors([message]);
      } else if (message.type === "success") {
        // Clear errors on successful compilation
        setErrors([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [listen, setErrors]);

  return null; // This is a listener component, it doesn't render anything
};
