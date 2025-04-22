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

Here’s what you need in **any other app** to make your voting/feature request system work with your npm package:

---

## **1. The UI Package**

- Install your npm package (e.g., `@andromedax684/voting-widget`).
- Install all its peer dependencies (React, Convex, Tailwind, etc. as required).

---

## **2. Convex Backend Files**

You **must** copy these files into the new app’s `convex/` directory:

- **`voting.ts`**
  Handles voting logic (submitting votes, getting results).

- **`featureRequests.ts`**
  Handles feature request submission, admin actions, and ticket creation.

- **Any referenced Convex schema:**
  - Make sure your `convex/schema.ts` includes the tables and indexes for:
    - `features`
    - `votes`
    - `featureRequests`
    - `featureTickets`
  - The schema must match the one you used to develop the widget and admin.

---

## **3. Convex Schema**

- Your `convex/schema.ts` must include all the tables and indexes required by `voting.ts` and `featureRequests.ts`.
- If you miss a table or index, Convex will throw errors.

---

## **4. Convex Auth (if you want user info)**

- If your widget expects user info, you need to have Convex Auth set up and the `users` table in your schema.

---

## **5. Convex Functions Deployment**

- After copying the files, run `npx convex dev` or `npx convex deploy` to push the backend functions.

---

## **6. Frontend Integration**

- Import and use the widget in your React app.
- Use the Convex React hooks (`useQuery`, `useMutation`) as shown in your VotingPage/AdminPage.

---

## **Summary Table**

| File/Setup                | Required? | Purpose                           |
| ------------------------- | --------- | --------------------------------- |
| npm voting widget package | ✅        | UI component                      |
| voting.ts                 | ✅        | Voting backend logic              |
| featureRequests.ts        | ✅        | Feature request backend logic     |
| schema.ts (with tables)   | ✅        | Convex DB structure               |
| Convex Auth setup         | ✅\*      | For user info (if widget uses it) |
| Convex React/Client deps  | ✅        | For frontend hooks                |

---

**TL;DR:**

- The UI package is just the frontend.
- You must copy the backend files (`voting.ts`, `featureRequests.ts`, and schema) and deploy them.
- Make sure your schema matches.
- Set up Convex Auth if you want user info.

If you want a checklist or a ready-to-copy template for a new app, just say the word!

You nailed it! Here’s your checklist for new apps using your voting widget:

---

## **Voting Widget Integration Checklist**

1. **Install the npm package and all dependencies**

   - `npm install @andromedax684/voting-widget`
   - Install any required peer dependencies (React, Convex, etc.)

2. **Copy/Create Convex backend files**

   - Add the correct `schema.ts` (with `features`, `votes`, and `featureRequests` tables + indexes)
   - Add the voting/feature request mutations and queries (as in your last message)

3. **Create a page/component to use the widget**

   - Import your widget in a React page:
     ```tsx
     import VotingWidget from "@andromedax684/voting-widget";
     // ...get user info...
     <VotingWidget user={user} />;
     ```
   - Make sure you pass the correct user object if required

4. **Deploy Convex functions**
   - Run `npx convex dev` or `npx convex deploy` to push your backend code

---

**That’s it!**
You’re ready to vote, request features, and bask in the glory of code reuse.
If you want a copy-paste starter template, just say the word!
