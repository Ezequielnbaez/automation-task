"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { onDeleteWorkflow, onFlowPublish } from "@/lib/backendactions";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';

type WorkFlowProps = {
  title: string;
  desc: string;
  id: string;
  publish: boolean | null;
};

export const Workflow = ({ title, desc, id, publish }: WorkFlowProps) => {
  const router = useRouter();
  const onPublishFlow = async (event: any) => {
    const response = await onFlowPublish(
      id,
      event.target.ariaChecked === "false"
    );
    if (response) toast(response);
    router.refresh();
  };

  const onDeleteFlow = async (event: any) => {
    const promise = onDeleteWorkflow(id);
    toast.promise(promise, {
      loading: "Removing ",
      success: "Workflow removed",
      error: "Error removing",
    });
    router.refresh();
  };

  return (
    <div className="items-center space-x-4 rounded-md border p-4 bg-black/80 h-28 w-96 m-5">
      <div className="flex">
        <div className="flex space-x-4">
          <Image src={"/driveicon.png"} height={24} width={24} alt={""} />
          <Image src={"/notionicon.png"} height={24} width={24} alt={""} />
          <Image src={"/slackicon.png"} height={24} width={24} alt={""} />
        </div>
        <Button onClick={onDeleteFlow} className="ml-auto size-auto p-0 bg-transparent hover:bg-transparent">
          <Trash2Icon  color="#9B0000">
          </Trash2Icon>
        </Button>
      </div>

      <div className="flex space-y-1 m-2">
        <Link key={id} href={`/dashboard/workflows/editor/${id}`}>
          <div className="mt-2">
            <p className="text-sm font-medium leading-none">{title}</p>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </div>
        </Link>
        <div className="ml-auto">
          <div className="flex flex-col items-center gap-1">
            <Label htmlFor="airplane-mode" className="text-muted-foreground">
              {publish! ? "On" : "Off"}
            </Label>
            <Switch
              id="airplane-mode"
              onClick={onPublishFlow}
              defaultChecked={publish!}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
