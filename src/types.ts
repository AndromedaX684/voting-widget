import { Id } from "convex/_generated/dataModel.js";

export type Feature = {
  _id: Id<"features">;
  title: string;
  description: string;
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

export const mockFeatures: Feature[] = [
  {
    _id: "feature-1" as Id<"features">,
    title: "Dark Mode",
    description: "Add support for dark mode throughout the app.",
  },
  {
    _id: "feature-2" as Id<"features">,
    title: "Export Data",
    description: "Allow users to export their data as CSV or JSON.",
  },
  {
    _id: "feature-3" as Id<"features">,
    title: "Real-time Notifications",
    description: "Push notifications for important updates.",
  },
];
