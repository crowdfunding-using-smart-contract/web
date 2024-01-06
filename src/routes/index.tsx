import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Homepage, LoginPage } from "../pages";

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/login" element={<LoginPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
