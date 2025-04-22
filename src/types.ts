import { Id } from "convex/_generated/dataModel.js";

export type Feature = {
	_id: Id<"features">;
	title: string;
	description: string;
	status?: "PLANNED" | "IN REVIEW" | "FIXED";
	type?: "FEATURE";
};

export type Vote = {
	userId: string;
	userInfo?: {
		name?: string;
		email?: string;
	};
	timestamp: number;
};

export type VotingResult = {
	feature: Feature;
	votes: Vote[];
	voteCount: number;
	status?: "PLANNED" | "IN REVIEW" | "FIXED";
	type?: "FEATURE";
};
