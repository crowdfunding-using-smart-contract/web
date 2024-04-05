import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";
import { MetaMaskProvider } from "@metamask/sdk-react";
import router from "./routes";
import { RouterProvider } from "react-router-dom";
// import MainLayout from "./layouts/MainLayout";

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider>
				<MetaMaskProvider
					debug={true}
					sdkOptions={{
						dappMetadata: {
							name: "FundO DApp",
							url: window.location.href,
						},
					}}
				>
					<RouterProvider router={router} />
				</MetaMaskProvider>
			</MantineProvider>
		</QueryClientProvider>
	);
}

export default App;
