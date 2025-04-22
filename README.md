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

Exactly! Here’s your workflow for future updates:

---

## 1. **Edit Your Code**

- Make your changes locally.

## 2. **Commit and Push to GitHub**

```bash
git add .
git commit -m "Describe your changes"
git push
```

## 3. **Bump the Version**

- Update the `version` field in your `package.json` (e.g., from `1.0.0` to `1.0.1`).
  - You can do this manually, or with:
    ```bash
    npm version patch   # or minor/major as appropriate
    ```

## 4. **Build the Package**

```bash
npm run build
```

## 5. **Publish Again**

```bash
npm publish
```

- This will publish the new version to GitHub Packages.

---

**TL;DR:**

- Edit code → commit & push → bump version → build → publish.

**Pro tip:**
You must bump the version each time you publish, or npm will reject the publish.

You’re now a package pro! 🚀
If you want a script to automate this, or want to set up GitHub Actions for auto-publishing, just ask!

---
