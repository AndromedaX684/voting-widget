import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// --- Get all features ---
export const getFeatures = query({
	args: {},
	returns: v.array(
		v.object({
			_id: v.id("features"),
			title: v.string(),
			description: v.string(),
		})
	),
	handler: async (ctx) => {
		return await ctx.db.query("features").collect();
	},
});

// Mutation to submit a new feature request
export const submitFeatureRequest = mutation({
	args: {
		appId: v.string(),
		userId: v.optional(v.string()),
		userInfo: v.optional(
			v.object({
				name: v.optional(v.string()),
				email: v.optional(v.string()),
			})
		),
		message: v.string(),
	},
	handler: async (ctx, args) => {
		await ctx.db.insert("featureRequests", {
			appId: args.appId,
			userId: args.userId,
			userInfo: args.userInfo,
			message: args.message,
			createdAt: Date.now(),
			status: "new",
		});
		return { success: true };
	},
});
