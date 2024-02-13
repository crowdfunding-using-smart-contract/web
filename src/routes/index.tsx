import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Homepage, LoginPage, NewProjectPage, ProjectList, RegisterPage } from "../pages";

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<RegisterPage />} />
				<Route path="/projects/new" element={<NewProjectPage />} />
				<Route path="/projects" element={<ProjectList />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
