import { ConvexProvider, ConvexReactClient } from "convex/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App";
import "./index.css";

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ConvexProvider client={convex}>
			<App />
			<Toaster />
		</ConvexProvider>
	</React.StrictMode>
);
