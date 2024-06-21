"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EditorCanvasIconHelper from "./icon-helper";
import { onDragStart } from "@/lib/editor-utils";
import { EditorCanvasTypes } from "@/lib/types";
import Image from "next/image";

type AppCardProps = {
  description: string;
  name: string;
  connection: boolean;
  type: EditorCanvasTypes;
  img?: string;
  isEditor: boolean;
};

const AppCard = ({ name, description, connection, type, isEditor,img='' }: AppCardProps) => {
  return (
      <Card
        className="w-[450px] bg-black/75 cursor-pointer"
        draggable
        onDragStart={(event) => onDragStart(event, type)}
      >
        <CardHeader className="p-2">
          <CardTitle className="text-sm">
            {!isEditor && <Image src={img} width={30} height={30} alt={name}/>}
            {isEditor && <EditorCanvasIconHelper type={name} />}
            {name}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        {connection && (
          <CardFooter className="flex justify-end">
            <Button>Connect</Button>
          </CardFooter>
        )}
      </Card>
  );
};

export default AppCard;
