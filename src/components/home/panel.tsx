"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";

type HomePanelProps = {
  children?: React.ReactNode;
};

export const HomePanel = (props: HomePanelProps) => {
  return (
    <Card className="flex-1 h-full gap-0 py-0 min-h-0 min-w-max">
      <div className="flex flex-col h-full">
        {props.children}
      </div>
    </Card>
  );
};
