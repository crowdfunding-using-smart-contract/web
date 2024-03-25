import { CoreMenu, NavigationBar, ProfilePictureModal, UserProfileMenu } from "@/components";
import React from "react";

type MainLayoutProps = {
	children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
	return (
		<React.Fragment>
			<NavigationBar />
			<CoreMenu />
			<UserProfileMenu />
			<ProfilePictureModal />
			<main>{children}</main>
		</React.Fragment>
	);
}
