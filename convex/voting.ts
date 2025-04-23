import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// --- Submit a vote (one per user per feature) ---
export const submitVote = mutation({
	args: {
		featureId: v.id("features"),
		userId: v.string(),
		userInfo: v.optional(
			v.object({
				name: v.optional(v.string()),
				email: v.optional(v.string()),
			})
		),
	},
	returns: v.object({ success: v.boolean(), message: v.string() }),
	handler: async (ctx, args) => {
		const existing = await ctx.db
			.query("votes")
			.withIndex("by_feature_user", (q) =>
				q.eq("featureId", args.featureId).eq("userId", args.userId)
			)
			.unique();
		if (existing) {
			return {
				success: false,
				message: "User has already voted for this feature.",
			};
		}
		try {
			await ctx.db.insert("votes", {
				featureId: args.featureId,
				userId: args.userId,
				userInfo: args.userInfo,
				timestamp: Date.now(),
			});
			return { success: true, message: "Vote submitted." };
		} catch (err) {
			return { success: false, message: "Failed to submit vote." };
		}
	},
});

// --- Get voting results ---
export const getResults = query({
	// Widget must pass appId to only show relevant features
	args: { appId: v.string() },
	returns: v.array(
		v.object({
			feature: v.object({
				_id: v.id("features"),
				title: v.string(),
				description: v.string(),
			}),
			votes: v.array(
				v.object({
					userId: v.string(),
					userInfo: v.optional(
						v.object({
							name: v.optional(v.string()),
							email: v.optional(v.string()),
						})
					),
					timestamp: v.number(),
				})
			),
			voteCount: v.number(),
		})
	),
	handler: async (ctx, args) => {
		if (!args.appId) throw new Error("appId is required");
		const features = await ctx.db
			.query("features")
			.withIndex("by_appId", (q) => q.eq("appId", args.appId))
			.collect();
		const results = [];
		for (const feature of features) {
			const votes = await ctx.db
				.query("votes")
				.withIndex("by_feature_user", (q) => q.eq("featureId", feature._id))
				.collect();
			results.push({
				feature: {
					_id: feature._id,
					title: feature.title,
					description: feature.description,
				},
				votes: votes.map((v) => ({
					userId: v.userId,
					userInfo: v.userInfo,
					timestamp: v.timestamp,
				})),
				voteCount: votes.length,
			});
		}
		return results;
	},
});

// --- Submit a new feature request ---
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
