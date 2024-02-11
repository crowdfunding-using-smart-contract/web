import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Homepage, LoginPage, NewProjectPage } from "../pages";

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/projects/new" element={<NewProjectPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
