import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

interface RequestFeatureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  requestText: string;
  setRequestText: (text: string) => void;
}

const RequestFeatureDialog: React.FC<RequestFeatureDialogProps> = ({
  open,
  onOpenChange,
  requestText,
  setRequestText,
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Request a New Feature</DialogTitle>
        <DialogDescription>
          We love your ideas! Please describe the feature you'd like to see.
          This is just a stub for now.
        </DialogDescription>
      </DialogHeader>
      <textarea
        className="w-full border rounded-md p-2 mt-2 min-h-[80px]"
        placeholder="Describe your feature request..."
        value={requestText}
        onChange={(e) => setRequestText(e.target.value)}
      />
      <DialogFooter>
        <Button onClick={() => onOpenChange(false)}>Close</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default RequestFeatureDialog;
