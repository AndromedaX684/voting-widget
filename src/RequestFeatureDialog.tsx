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
	onSubmit: () => Promise<void>;
	loading: boolean;
	error: string | null;
}

const RequestFeatureDialog: React.FC<RequestFeatureDialogProps> = ({
	open,
	onOpenChange,
	requestText,
	setRequestText,
	onSubmit,
	loading,
	error,
}) => (
	<Dialog open={open} onOpenChange={onOpenChange}>
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Request a New Feature</DialogTitle>
				<DialogDescription>
					We love your ideas! Please describe the feature you'd like to see.
				</DialogDescription>
			</DialogHeader>
			<textarea
				className="w-full border rounded-md p-2 mt-2 min-h-[120px] resize-none"
				placeholder="Describe your feature request..."
				value={requestText}
				onChange={(e) => setRequestText(e.target.value)}
				disabled={loading}
			/>
			{error && <div className="text-red-500 text-sm mt-2">{error}</div>}
			<DialogFooter>
				<Button
					onClick={() => onOpenChange(false)}
					variant="outline"
					disabled={loading}
				>
					Close
				</Button>
				<Button onClick={onSubmit} disabled={loading || !requestText.trim()}>
					{loading ? "Submitting..." : "Submit"}
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
);

export default RequestFeatureDialog;
