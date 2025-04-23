import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
	// Tables for the Voting System
	// --- Features Table ---
	features: defineTable({
		appId: v.string(),
		title: v.string(),
		description: v.string(),
		priority: v.string(),
		status: v.string(),
	}).index("by_appId", ["appId"]),

	// --- Votes Table ---
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

	// --- Feature Request Inbox Table ---
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
		status: v.union(
			v.literal("new"),
			v.literal("approved"),
			v.literal("rejected")
		),
		reviewedAt: v.optional(v.number()),
		reviewedBy: v.optional(v.string()),
	})
		.index("by_appId", ["appId"])
		.index("by_status", ["status"]),
});

export default schema;
