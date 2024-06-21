import { WorkflowFormSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { onCreateWorkflow } from "@/lib/backendactions";
import { useModal } from "@/providers/modal-provider";

type Props = {
  title?: string;
  subTitle?: string;
};

const Workflowform = ({ subTitle, title }: Props) => {
  const { setClose } = useModal();
  const form = useForm<z.infer<typeof WorkflowFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(WorkflowFormSchema),
    defaultValues: {
      newtitle: "",
      newdesc: "",
    },
  });

  const isLoading = form.formState.isLoading;
  const router = useRouter();

  const handleSubmit = async (values: z.infer<typeof WorkflowFormSchema>) => {
    const workflow = onCreateWorkflow(values.newtitle,values.newdesc);
    
    toast.promise(workflow, {
      loading: "Creating",
      success: "Workflow created",
      error: "Error creating",
    });
    router.refresh();
    setClose();
  };
    

  return (
    <div>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Card className="w-full max-w-[650px] border-none bg-black/40">
        {title && subTitle && (
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{subTitle}</CardDescription>
          </CardHeader>
        )}
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-4 text-left"
            >
              <FormField
                disabled={isLoading}
                control={form.control}
                name="newtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={isLoading}
                control={form.control}
                name="newdesc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="mt-4" disabled={isLoading} type="submit">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving
                  </>
                ) : (
                  "Save Settings"
                )}
              </Button>
            </form>
          </Form>
                  </CardContent>
      </Card>
    </div>
  );
}


export default Workflowform;
