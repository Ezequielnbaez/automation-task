"use client";

import { usePathname } from "next/navigation";
import Creatorbar from "@/app/(main)/(routes)/dashboard/workflows/editor/[editorId]/_components/creatorbar";
import React, { useCallback } from "react";

import "reactflow/dist/style.css";
import EditorCanvas from "@/app/(main)/(routes)/dashboard/workflows/editor/[editorId]/_components/editorcanvas";
import EditorProvider from "@/providers/editor-provider";
import { ConnectionsProvider } from "@/providers/connection-provider";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

const WorkflowIdPage = () => {
  return (
    <div className="h-screen pb-40 flex">
      <EditorProvider>
        <ConnectionsProvider>
          <EditorCanvas/>
        </ConnectionsProvider>
      </EditorProvider>
    </div>
  );
};

export default WorkflowIdPage;
