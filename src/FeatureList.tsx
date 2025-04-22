import React from "react";
import FeatureCard from "./FeatureCard";
import { Feature, Vote, VotingResult } from "./types";

interface FeatureListProps {
  features: VotingResult[];
  statusMap: Record<string, { status: string; type: string }>;
  hasVoted: (votes: Vote[]) => boolean;
  loadingVote: string | null;
  onVote: (feature: Feature) => void;
}

const FeatureList: React.FC<FeatureListProps> = ({
  features,
  statusMap,
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
          status={statusMap[r.feature._id]?.status || "PLANNED"}
          type={statusMap[r.feature._id]?.type || "FEATURE"}
          hasVoted={hasVoted(r.votes)}
          loadingVote={loadingVote === r.feature._id}
          onVote={onVote}
        />
      ))}
    </div>
  );
};

export default FeatureList;
