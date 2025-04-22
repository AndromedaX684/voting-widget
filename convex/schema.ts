import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
	// Features table (publicly visible feature tickets)
	// Tables for the Voting System
	features: defineTable({
		title: v.string(),
		description: v.string(),
	}),
	featureRequests: defineTable({
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
		status: v.string(), // or use v.union(v.literal("new")) for stricter typing
	}),
	votes: defineTable({
		featureId: v.id("features"),
		userId: v.string(), // Use string for cross-app user IDs
		userInfo: v.optional(
			v.object({
				// Store extra user info if needed
				name: v.optional(v.string()),
				email: v.optional(v.string()),
				// Add more fields as needed
			})
		),
		timestamp: v.number(), // Store as ms since epoch
	}).index("by_feature_user", ["featureId", "userId"]),
});

export default schema;
