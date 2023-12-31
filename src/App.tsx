import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./routes";

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<div className="App min-h-screen">
				<Router />
			</div>
		</QueryClientProvider>
	);
}

export default App;
