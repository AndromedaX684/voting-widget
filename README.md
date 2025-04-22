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

## Step-by-Step Install & Setup

### **Add the Voting Widget**

- Import and use the widget in your app:

  ```tsx
  import VotingWidget from "voting-widget";

  function MyPage() {
  	return (
  		<VotingWidget
  			user={{ id: "user-id", name: "Name", email: "email@example.com" }}
  			// Optionally, pass a unique appId for multi-app separation
  			appId="my-unique-app-id"
  		/>
  	);
  }
  ```

- **user**: Pass your authenticated user object.
- **appId**: (Recommended) Pass a unique string to separate data per app.

### **Customize (Optional)**

- The widget will inherit your Tailwind theme and Shadcn UI styles.
- You can override styles or extend the widget as needed.

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
