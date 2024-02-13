import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Homepage, LoginPage, NewProjectPage, ProjectList } from "../pages";

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/projects/new" element={<NewProjectPage />} />
				<Route path="/projects" element={<ProjectList />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
