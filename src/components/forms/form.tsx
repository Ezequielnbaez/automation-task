"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import React from "react";
import { userConfig } from "@/lib/backendactions";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { SettingsFormSchema } from "@/lib/types";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useModal } from "@/providers/modal-provider";
import { Button } from "../ui/button";

type Props = {
  fname?: string;
  lname?: string;
  mail?: string;
};

export const SettingsForm = ({ fname, lname, mail }: Props) => {
  const { setClose } = useModal();
  const form = useForm<z.infer<typeof SettingsFormSchema>>({
    mode: "onChange",
    resolver: zodResolver(SettingsFormSchema),
    defaultValues: {
      fname: "",
      lname: "",
      mail: "",
    },
  });

  const isLoading = form.formState.isLoading;
  const router = useRouter();
  const handleSubmit = async (values: z.infer<typeof SettingsFormSchema>) => {
    const promise = userConfig(values);
    
    toast.promise(promise, {
      loading: "Updating",
      success: "User updated ",
      error: "Error updating",
    });
    router.refresh();
  };

  return (
    <div className="max-w-md mx-auto  p-4 md:p-8  bg-transparent ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4 text-left"
        >
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <FormField
                disabled={isLoading}
                control={form.control}
                name="fname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Tyler" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <FormField
                disabled={isLoading}
                control={form.control}
                name="lname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Durden" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
          </div>

          <LabelInputContainer className="mb-4">
            <FormField
              disabled={isLoading}
              control={form.control}
              name="mail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>

          <Button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Accept &rarr;
            <BottomGradient />
          </Button>
        </form>
      </Form>
    </div>
  );
};

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

/*<form action={onUpdate}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="first">First name</Label>
            <Input id="first" placeholder="Tyler" name="first" type="text" />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="last">Last name</Label>
            <Input id="last" placeholder="Durden" name="last" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="mail">Email Address</Label>
          <Input
            id="mail"
            placeholder="example@gmail.com"
            name="mail"
            type="email"
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Accept &rarr;
          <BottomGradient />
        </button>
      </form>



      const onUpdate = (formData: FormData) => {
    const promise = userConfig(formData);

    
      toast.promise(promise, {
        loading: "Updating",
        success: "Updated user",
        error: "Error updating",
      });

    };
  };*/
