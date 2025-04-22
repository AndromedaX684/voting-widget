import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Query: Get all features with vote counts and user info
export const getResults = query({
	args: {},
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
	handler: async (ctx) => {
		const features = await ctx.db.query("features").collect();
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

// Mutation: Submit a vote (one per user per feature)
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
		// Check for existing vote
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
