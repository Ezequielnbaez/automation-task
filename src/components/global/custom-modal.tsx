import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useModal } from "@/providers/modal-provider";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

type modalProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const CustomModal = ({
  title,
  subtitle,
  children,
}: modalProps) => {
  const { isOpen, setClose } = useModal();
  const handleClose = () => setClose();
 
  return (
      <Drawer open={isOpen} onClose={handleClose}>
        <DrawerContent className="bg-black/40">
          <DrawerHeader className="flex-col w-full justify-center">
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>
              <div className="mb-5">{subtitle}</div>
              {children}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose>
              <Button onClick={handleClose} variant="outline">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
  );
};

export default CustomModal;
