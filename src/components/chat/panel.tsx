"use client";

import { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChatInput } from "@/components/chat/input";
import { HistoryPanel } from "@/components/chat/history/panel";
import { useProjectContext } from "@/components/project-context";
import { useHistory } from "@/components/history-context";
import { useSandpack } from "@codesandbox/sandpack-react";
import { X } from "lucide-react";

export const ChatPanel = () => {
  const { sandpack } = useSandpack();
  const [showHistory, setShowHistory] = useState(false);
  const { isPreviewing, setIsPreviewing, setEditorReadOnly } = useProjectContext();
  const { setDisableTracking } = useHistory();

  const handleCloseHistory = () => {
    if (isPreviewing) {
      setEditorReadOnly(false);
      setIsPreviewing(false);
      setDisableTracking(false);
    }
    setShowHistory(false);
  };

  const handleTestEdit = () => {
    const newCode = `export default function App() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">AI Edited This!</h1>
      <p className="text-gray-600">This file was edited programmatically using Sandpack API</p>
      <p className="text-sm text-gray-500 mt-4">Timestamp: ${new Date().toLocaleTimeString()}</p>
    </div>
  );
}`;
    sandpack.updateFile('/App.tsx', newCode);
  };

  return (
    <div className="flex flex-col h-full min-w-max">
      <div className="flex items-center justify-between px-2 border-b h-12 bg-white rounded-t-md">
        <div className="flex items-center gap-2">
          <div className="size-6 bg-black rounded-sm flex items-center justify-center">
            <span className="text-white text-xs font-semibold">St</span>
          </div>
          <span className="font-medium text-sm">Stan</span>
        </div>
        <Button variant="ghost" size="sm" onClick={showHistory ? handleCloseHistory : () => setShowHistory(true)}>
          {showHistory ? (
            <X className="size-4" />
          ) : (
            <svg
              className="size-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </Button>
      </div>

      {showHistory ? (
        <HistoryPanel />
      ) : (
        <>
          <CardContent className="flex-1 flex flex-col items-center justify-center gap-4">
            <p className="text-gray-400 text-sm">Chat panel</p>
            <Button onClick={handleTestEdit} variant="outline">
              Test AI Edit (Update App.tsx)
            </Button>
          </CardContent>

          <ChatInput />
        </>
      )}
    </div>
  );
};
