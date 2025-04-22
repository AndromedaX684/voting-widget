import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import confetti from "canvas-confetti";
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
	const submitFeatureRequest = useMutation(api.voting.submitFeatureRequest);
	const [requestLoading, setRequestLoading] = useState(false);
	const [requestError, setRequestError] = useState<string | null>(null);
	const [showThankYou, setShowThankYou] = useState(false);

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

	const triggerConfetti = () => {
		const defaults = {
			spread: 360,
			ticks: 50,
			gravity: 0,
			decay: 0.94,
			startVelocity: 30,
			colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
		};
		const shoot = () => {
			confetti({
				...defaults,
				particleCount: 40,
				scalar: 1.2,
				shapes: ["star"],
			});
			confetti({
				...defaults,
				particleCount: 10,
				scalar: 0.75,
				shapes: ["circle"],
			});
		};
		setTimeout(shoot, 0);
		setTimeout(shoot, 100);
		setTimeout(shoot, 200);
	};

	const handleRequestSubmit = async () => {
		setRequestLoading(true);
		setRequestError(null);
		try {
			await submitFeatureRequest({
				appId: "demo-app",
				userId: user.id,
				userInfo: { name: user.name, email: user.email },
				message: requestText,
			});
			setShowRequestDialog(false);
			setRequestText("");
			setShowThankYou(true);
			triggerConfetti();
			setTimeout(() => setShowThankYou(false), 2000);
		} catch (e) {
			setRequestError("Failed to submit request. Try again.");
		} finally {
			setRequestLoading(false);
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
						<Button size="sm">
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
			<div className="mb-2">
				<Tabs tabs={TABS} activeTab={activeTab} setActiveTab={setActiveTab} />
			</div>
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
				onSubmit={handleRequestSubmit}
				loading={requestLoading}
				error={requestError}
			/>
			{showThankYou && (
				<div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
					<Card className="font-bold text-2xl text-center shadow-lg p-12">
						<span className="bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg">
							Thank you for your request!
						</span>
					</Card>
				</div>
			)}
		</div>
	);
};

export default VotingWidget;
