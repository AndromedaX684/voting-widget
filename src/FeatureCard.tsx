import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronUp } from "lucide-react";
import React from "react";
import { useSnackbar } from "./components/snackbar-context";
import { Feature, Vote } from "./types";

interface FeatureCardProps {
	feature: Feature;
	votes: Vote[];
	voteCount: number;
	status: string;
	type: string;
	hasVoted: boolean;
	loadingVote: boolean;
	onVote: (feature: Feature) => void;
}

const statusColor = (status: string) => {
	if (status === "FIXED")
		return { dot: "bg-green-500", text: "text-green-600" };
	if (status === "IN REVIEW")
		return { dot: "bg-yellow-400", text: "text-yellow-500" };
	return { dot: "bg-blue-500", text: "text-blue-600" };
};

const FeatureCard: React.FC<FeatureCardProps> = ({
	feature,
	voteCount,
	status,
	type,
	hasVoted,
	loadingVote,
	onVote,
}) => {
	const color = statusColor(status);
	const { snackbar } = useSnackbar();

	const handleVoteClick = () => {
		if (hasVoted) {
			snackbar.warning("You already voted for this feature.");
			return;
		}
		onVote(feature);
	};

	return (
		<div className="flex flex-row items-center p-3 gap-3 rounded-xl shadow-sm border">
			{/* Upvote */}
			<div className="flex flex-col items-center mx-2">
				<button
					className={`flex flex-col items-center justify-center w-12 h-12 rounded-md border border-border hover:border-primary hover:bg-accent shadow-md  ${hasVoted ? "text-primary bg-accent" : ""}`}
					onClick={handleVoteClick}
					disabled={loadingVote}
				>
					<ChevronUp className="w-4 h-4" />
					<span className="font-semibold text-primary text-sm">
						{voteCount}
					</span>
				</button>
			</div>
			{/* Content */}
			<div className="flex-1 min-w-0">
				<div className="font-medium text-sm truncate">{feature.title}</div>
				<div className="text-muted-foreground text-xs truncate">
					{feature.description}
				</div>
				<div className="flex gap-2 mt-4 items-center">
					<Badge variant="outline" className="text-xs px-2 py-0.5">
						{type}
					</Badge>
					<Separator
						orientation="vertical"
						className="!h-3 bg-gray-300 rounded-full mx-1"
					/>
					<span className={`inline-block w-3 h-3 rounded-full ${color.dot}`} />
					<span className={`text-xs font-medium ${color.text}`}>{status}</span>
				</div>
			</div>
		</div>
	);
};

export default FeatureCard;
