export const statusMap: Record<
  string,
  { status: "PLANNED" | "IN REVIEW" | "FIXED"; type: "FEATURE" }
> = {
  "feature-1": { status: "PLANNED", type: "FEATURE" },
  "feature-2": { status: "IN REVIEW", type: "FEATURE" },
  "feature-3": { status: "FIXED", type: "FEATURE" },
};

// Add feature IDs and statuses as you add features in your test data or backend.
