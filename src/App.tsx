import VotingWidget from "./voting-widget";

function App() {
	// Use a test user for local development
	return (
		<div className="p-4 flex justify-center items-center h-screen w-screen">
			<VotingWidget
				user={{ id: "test-user", name: "Test User", email: "test@example.com" }}
				appId="widget-component"
			/>
		</div>
	);
}

export default App;
