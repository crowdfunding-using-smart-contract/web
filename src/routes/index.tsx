import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import {
	ChatDetailPage,
	ChatBasePage,
	ForumDetailPage,
	ForumList,
	Homepage,
	LoginPage,
	NewForumPage,
	NewProjectPage,
	Profile,
	ProjectDetail,
	ProjectList,
	RegisterPage,
	ChatMainPage,
} from "../pages";

const router = createBrowserRouter([
	{
		element: <MainLayout />,
		children: [
			{
				path: "/",
				element: <Homepage />,
			},
			{
				path: "/login",
				element: <LoginPage />,
			},
			{
				path: "/signup",
				element: <RegisterPage />,
			},
			{
				path: "/project/new",
				element: <NewProjectPage />,
			},
			{
				path: "/project",
				element: <ProjectList />,
			},
			{
				path: "/project/:projectId",
				element: <ProjectDetail />,
			},
			{
				path: "/profile",
				element: <Profile />,
			},
			{
				path: "/forum",
				element: <ForumList />,
			},
			{
				path: "/post/new",
				element: <NewForumPage />,
			},
			{
				path: "/post/:postId",
				element: <ForumDetailPage />,
			},
			{
				path: "/chat",
				element: <ChatBasePage />,
				children: [
					{
						path: "",
						element: <ChatMainPage />,
					},
					{
						path: ":roomId",
						element: <ChatDetailPage />,
					},
				],
			},
		],
	},
]);

export default router;
