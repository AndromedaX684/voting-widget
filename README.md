# Voting Widget

A plug-and-play, full-stack feature voting widget for React apps, powered by [Convex](https://convex.dev/), [Tailwind CSS v4](https://tailwindcss.com/), and [Shadcn UI](https://ui.shadcn.com/).
Let your users upvote features, request new ones, and see what's planned—all in a beautiful, modern UI.

---

## Features

- 🗳 **Feature Voting:** Users can upvote features, one vote per user per feature.
- 📋 **Feature List:** See all features, their descriptions, statuses, and vote counts.
- 🔍 **Search & Filter:** Search by keyword, filter by status, and view only features you've voted for.
- ✨ **Request Features:** Users can submit new feature requests (admin inbox).
- 🌗 **Responsive & Themed:** Mobile-first, supports light/dark mode, and uses your Tailwind theme tokens.
- ⚡ **Real-time:** Updates instantly with Convex backend.
- 🦾 **Type-safe & Modern:** Built with TypeScript, React 18+, and functional patterns.

---

## Demo

![Voting Widget Screenshot](https://raw.githubusercontent.com/henrylevo/voting-widget/main/.github/voting-widget-demo.png)
_If you don't see a screenshot, it's because you haven't added one yet. Go flex your design skills!_

---

## Installation

```bash
npm install voting-widget
# or
yarn add voting-widget
```

> **Peer dependencies:**
> You must have `react`, `convex`, `@radix-ui/react-*`, and `tailwindcss` v4+ installed in your project.

---

## Usage

1. **Set up Convex**

   - Add the schema and voting logic from `convex/schema.ts` and `convex/voting.ts` to your Convex project.
   - Run `npx convex push` to sync schema.

2. **Wrap your app with ConvexProvider**

```tsx
import { ConvexProvider, ConvexReactClient } from "convex/react";
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

<ConvexProvider client={convex}>
	<App />
</ConvexProvider>;
```

3. **Add the Voting Widget**

```tsx
import VotingWidget from "voting-widget";

function MyPage() {
	return <VotingWidget />;
}
```

4. **Style with Tailwind & Shadcn UI**
   - Make sure Tailwind v4 is set up (no config file needed!).
   - Import your Tailwind CSS in your main entry (e.g., `import "./index.css"`).

---

## Customization

- **Feature Statuses:**
  Edit `statusMap` or extend the schema to add more statuses/types.
- **User Info:**
  Replace the `mockUser` logic with your actual user authentication.
- **Feature Requests:**
  The request dialog is a stub—hook it up to your backend or Convex mutation for real submissions.

---

## API

- `getResults`: Query to fetch all features and their votes.
- `submitVote`: Mutation to submit a vote (one per user per feature).
- `featureRequests`: Table for user-submitted feature requests.

---

## Publishing

- This package is ready for npm and GitHub.
- Peer dependencies are set for maximum compatibility.
- Main entry: `dist/voting-widget.js`
- Types: `dist/voting-widget.d.ts`

---

## Contributing

PRs, issues, and feature requests are welcome!
Want to add tests, improve accessibility, or make the widget even fancier? Open a PR or start a discussion.

---

## License

MIT © Henry Levo

---

## FAQ

**Q: Does it work with Next.js?**
A: Yes, but you'll need to use the Convex client in a Client Component.

**Q: Can I use my own design system?**
A: Absolutely! Swap out the UI components for your own, or extend the widget as needed.

---

If you want a CONTRIBUTING.md, usage GIF, or more code examples, just say the word!
