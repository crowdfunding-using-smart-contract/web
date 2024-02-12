import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import Router from "./routes";
import MainLayout from "./layouts/MainLayout";

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider>
				<MainLayout>
					<Router />
				</MainLayout>
			</MantineProvider>
		</QueryClientProvider>
	);
}

export default App;
