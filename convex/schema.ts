import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// Features table (publicly visible feature tickets)
const features = defineTable({
	title: v.string(),
	description: v.string(),
	status: v.union(
		v.literal("planned"),
		v.literal("in review"),
		v.literal("fixed")
	),
	priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
	appId: v.string(), // Which app this feature belongs to
	createdAt: v.number(),
	voteCount: v.optional(v.number()),
}).index("by_appId", ["appId"]);

// Votes table (one vote per user per feature)
const votes = defineTable({
	featureId: v.id("features"),
	userId: v.string(),
	userInfo: v.optional(
		v.object({
			name: v.optional(v.string()),
			email: v.optional(v.string()),
		})
	),
	timestamp: v.number(),
}).index("by_feature_user", ["featureId", "userId"]);

// Feature requests (inbox for admin)
const featureRequests = defineTable({
	appId: v.string(),
	userId: v.optional(v.string()),
	userInfo: v.optional(
		v.object({
			name: v.optional(v.string()),
			email: v.optional(v.string()),
		})
	),
	message: v.string(),
	createdAt: v.number(),
	status: v.union(
		v.literal("new"),
		v.literal("approved"),
		v.literal("rejected")
	),
})
	.index("by_appId", ["appId"])
	.index("by_status", ["status"]);

export default defineSchema({
	features,
	votes,
	featureRequests,
});
