import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Router from "./routes";
import MainLayout from "./layouts/MainLayout";

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<MainLayout>
				<Router />
			</MainLayout>
		</QueryClientProvider>
	);
}

export default App;
