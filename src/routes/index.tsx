import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
	ForumList,
	Homepage,
	LoginPage,
	NewProjectPage,
	Profile,
	ProjectDetail,
	ProjectList,
	RegisterPage,
} from "../pages";

function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<RegisterPage />} />
				<Route path="/projects/new" element={<NewProjectPage />} />
				<Route path="/projects" element={<ProjectList />} />
				<Route path="/projects/:projectId" element={<ProjectDetail />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/forum" element={<ForumList />} />
			</Routes>
		</BrowserRouter>
	);
}

export default Router;
