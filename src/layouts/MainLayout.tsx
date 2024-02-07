import { NavigationBar } from "@/components";
import React from "react";

type MainLayoutProps = {
	children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
	return (
		<React.Fragment>
			<NavigationBar />
			<main>{children}</main>
		</React.Fragment>
	);
}
