import React from "react";
import FeatureCard from "./FeatureCard";
import { Feature, Vote, VotingResult } from "./types";

interface FeatureListProps {
	features: VotingResult[];
	hasVoted: (votes: Vote[]) => boolean;
	loadingVote: string | null;
	onVote: (feature: Feature) => void;
}

const FeatureList: React.FC<FeatureListProps> = ({
	features,
	hasVoted,
	loadingVote,
	onVote,
}) => {
	if (features.length === 0) {
		return <div className="text-gray-400 text-center">No features found.</div>;
	}
	return (
		<div className="space-y-3">
			{features.map((r) => (
				<FeatureCard
					key={r.feature._id}
					feature={r.feature}
					votes={r.votes}
					voteCount={r.voteCount}
					status={r.feature.status || "PLANNED"}
					type={r.feature.type || "FEATURE"}
					hasVoted={hasVoted(r.votes)}
					loadingVote={loadingVote === r.feature._id}
					onVote={onVote}
				/>
			))}
		</div>
	);
};

export default FeatureList;
