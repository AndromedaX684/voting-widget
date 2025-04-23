import VotingWidget from "./voting-widget";

function App() {
	// Use a test user for local development
	return (
		<div className="p-4 flex justify-center items-center">
			<VotingWidget
				user={{ id: "test-user", name: "Test User", email: "test@example.com" }}
				appId="boilerplate"
			/>
		</div>
	);
}

export default App;
