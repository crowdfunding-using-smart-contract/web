import { CoreMenu, NavigationBar, ProfilePictureModal, UserProfileMenu } from "@/components";
import React from "react";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
	return (
		<React.Fragment>
			<NavigationBar />
			<CoreMenu />
			<UserProfileMenu />
			<ProfilePictureModal />
			<main>
				<Outlet />
			</main>
		</React.Fragment>
	);
}
