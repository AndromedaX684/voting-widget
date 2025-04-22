import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "convex/react";
import { FilterIcon, PlusIcon } from "lucide-react";
import React, { useMemo, useState } from "react";
import { api } from "./../convex/_generated/api";
import FeatureList from "./FeatureList";
import FilterPopover from "./FilterPopover";
import RequestFeatureDialog from "./RequestFeatureDialog";
import Tabs from "./Tabs";
import { Feature, VotingResult } from "./types";

interface VotingWidgetProps {
	user: { id: string; name?: string; email?: string };
}

const TABS = ["All Features", "My Votes"];
const STATUS_OPTIONS = ["PLANNED", "IN REVIEW", "FIXED"];

const VotingWidget: React.FC<VotingWidgetProps> = ({ user }) => {
	const [search, setSearch] = useState("");
	const [activeTab, setActiveTab] = useState(TABS[0]);
	const [showRequestDialog, setShowRequestDialog] = useState(false);
	const [requestText, setRequestText] = useState("");
	const [showFilter, setShowFilter] = useState(false);
	const [filterStatus, setFilterStatus] = useState<string | null>(null);
	const results = useQuery(api.voting.getResults, {});
	const submitVote = useMutation(api.voting.submitVote);
	const [loadingVote, setLoadingVote] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	// Filtered results by search, tab, and status
	const filteredResults = useMemo(() => {
		if (!results) return [];
		let filtered = results;
		if (activeTab === "My Votes") {
			filtered = filtered.filter((r: VotingResult) =>
				r.votes.some((v) => v.userId === user.id)
			);
		}
		if (filterStatus) {
			filtered = filtered.filter(
				(r: VotingResult) => (r.feature.status || "PLANNED") === filterStatus
			);
		}
		return filtered.filter(
			(r: VotingResult) =>
				r.feature.title.toLowerCase().includes(search.toLowerCase()) ||
				r.feature.description.toLowerCase().includes(search.toLowerCase())
		);
	}, [results, search, activeTab, filterStatus, user.id]);

	const hasVoted = (votes: VotingResult["votes"]) =>
		votes.some((v) => v.userId === user.id);

	const handleVote = async (feature: Feature) => {
		setLoadingVote(feature._id);
		setError(null);
		try {
			const res = await submitVote({
				featureId: feature._id,
				userId: user.id,
				userInfo: { name: user.name, email: user.email },
			});
			if (!res.success) setError(res.message);
		} catch (e) {
			setError("Failed to vote. Try again.");
		} finally {
			setLoadingVote(null);
		}
	};

	return (
		<div className="w-full max-w-lg mx-auto mt-12">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-3xl font-bold">Features</h2>
				<div className="flex gap-2">
					<FilterPopover
						open={showFilter}
						onOpenChange={setShowFilter}
						filterStatus={filterStatus}
						setFilterStatus={setFilterStatus}
						statusOptions={STATUS_OPTIONS}
					>
						<Button size="sm" variant="outline">
							<FilterIcon className="w-4 h-4" />
						</Button>
					</FilterPopover>
					<Button
						variant="default"
						size="sm"
						onClick={() => setShowRequestDialog(true)}
						aria-label="Request new feature"
					>
						<PlusIcon className="w-5 h-5" />
						<span className="text-xs">Request</span>
					</Button>
				</div>
			</div>
			<Tabs tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />
			<Input
				placeholder="Search using keywords"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="mb-4"
			/>
			{error && <div className="text-red-500 text-sm mb-2">{error}</div>}
			<FeatureList
				features={filteredResults}
				hasVoted={hasVoted}
				loadingVote={loadingVote}
				onVote={handleVote}
			/>
			<div className="text-xs text-gray-400 text-center mt-6">
				Powered by Love ❤️
			</div>
			<RequestFeatureDialog
				open={showRequestDialog}
				onOpenChange={setShowRequestDialog}
				requestText={requestText}
				setRequestText={setRequestText}
			/>
		</div>
	);
};

export default VotingWidget;
