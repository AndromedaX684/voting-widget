import { ConvexProvider, ConvexReactClient } from "convex/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SnackbarProvider } from "./components/snackbar-context";
import "./index.css";
const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ConvexProvider client={convex}>
			<SnackbarProvider>
				<App />
			</SnackbarProvider>
		</ConvexProvider>
	</React.StrictMode>
);
