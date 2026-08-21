"use client";

import { CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "./ui/button";

type Props = {
  open: boolean;
  close: (open: boolean) => void;
  title?: string;
  description?: string;
};

/**
 * Built on Base UI's Dialog rather than a hand-rolled fixed div (the
 * previous version here) — focus trap, Escape-to-close, aria-modal, and
 * returning focus to whatever triggered it are all handled by the primitive
 * itself, not reimplemented and inevitably missed on one of those.
 */
export default function SuccessMessage({ open, close, title, description }: Props) {
  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="text-center" showCloseButton={false}>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-8 w-8 text-primary" aria-hidden="true" />
        </div>

        <DialogTitle className="normal-case tracking-normal font-heading text-xl mt-2">
          {title || "Message sent"}
        </DialogTitle>
        <DialogDescription className="text-center">
          {description || "Thank you for reaching out. We've received your message."}
        </DialogDescription>

        <Button className="w-full mt-2" onClick={() => close(false)}>
          Okay
        </Button>
      </DialogContent>
    </Dialog>
  );
}
