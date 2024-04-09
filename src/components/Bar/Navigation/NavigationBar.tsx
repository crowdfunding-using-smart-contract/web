import useGlobalStore from "@/store/useGlobalStore";
import "./style.css";
import useAuthStore from "@/store/useAuthStore";
import { CgMenuGridO } from "react-icons/cg";
import { navbarProducts } from "@/constants/menu";
import { useLocation } from "react-router-dom";
import { Fragment, useState } from "react";
import { Button } from "@mantine/core";

export default function NavigationBar() {
	const { isMenuActivated, toggleMenu, setCoreMenuActivated, setProfileMenuActivated } = useGlobalStore();
	const { isAuthenticated, user } = useAuthStore();
	// const { pathname } = window.location;
	const location = useLocation();

	if (location.pathname === "/login" || location.pathname === "/signup") {
		return null;
	}

	return (
		<nav className={`navbar ${isMenuActivated ? "navbar-open" : ""}`}>
			<a href="/" className="flex relative w-24">
				<img src="/assets/FundO.png" alt="logo" className="h-auto max-w-full" />
			</a>

			<div className="hidden lg:flex lg:items-center lg:relative lg:top-0 w-full lg:h-auto bg-white lg:p-0 text-[#090b17]">
				<MenuList />
				{!isAuthenticated ? (
					<ButtonList />
				) : (
					<div className="flex gap-x-2 items-center text-gray-900">
						<button
							className="w-10 h-10 relative place-items-center hover:bg-gray-100 rounded-full duration-150 cursor-pointer"
							onClick={() => setCoreMenuActivated(true)}
						>
							<CgMenuGridO
								size={24}
								color={"#7f7f7f"}
								className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
							/>
						</button>
						<button
							className="hover:bg-gray-100 flex items-center p-0.5 rounded-full duration-150 cursor-pointer"
							onClick={() => setProfileMenuActivated(true)}
						>
							{!user?.profileImage ? (
								<div className="w-9 h-9 bg-gray-200 shadow font-medium rounded-full flex items-center justify-center">
									{user?.fullName[0]}
								</div>
							) : (
								<img src={user.profileImage} alt={user.fullName} className="w-9 h-9 object-cover rounded-full" />
							)}
						</button>
					</div>
				)}
			</div>
			{isMenuActivated && (
				<div className="block lg:hidden fixed left-0 top-[70px] w-full h-[calc(100vh-70px)] bg-white p-8 text-[#090b17]">
					<MenuList />
					{!isAuthenticated ? (
						<ButtonList />
					) : (
						<Fragment>
							<MenuDropDown />
							<UserProfileDropDown />
						</Fragment>
					)}
				</div>
			)}
			<button className="btn-toggle-menu" aria-checked={isMenuActivated} onClick={toggleMenu}>
				<span className="border-0 w-[1px] h-[1px] absolute overflow-hidden">Toggle menu</span>
			</button>
		</nav>
	);
}

function MenuList() {
	return (
		<ul className="flex flex-col lg:flex-row text-xl sm:text-2xl lg:text-sm font-medium text-left gap-y-3 lg:gap-y-0 lg:gap-x-6 lg:mx-auto lg:my-0">
			{navbarProducts.map((p) => (
				<li key={p.label} className="menu-item">
					<a href={`/project?c=${p.url}`}>{p.label}</a>
				</li>
			))}
		</ul>
	);
}

function ButtonList() {
	return (
		<div className="flex flex-col lg:flex-row-reverse w-full lg:w-auto text-sm mb-0 mt-8 lg:mt-0 gap-y-4 lg:gap-y-0 lg:gap-x-6">
			<a href="/signup">
				<button className="w-full bg-[#5340ff] py-[0.825rem] px-6 rounded text-white text-center">Sign up</button>
			</a>
			<a href="/login">
				<button className="w-full py-4 text-center">Log in</button>
			</a>
		</div>
	);
}

function MenuDropDown() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="relative">
			<button
				className="flex flex-row items-center justify-between w-full py-2 mt-6 text-left bg-transparent rounded-lg"
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className="text-xl sm:text-2xl lg:text-sm font-medium">Menu</span>
				<svg
					fill="currentColor"
					viewBox="0 0 20 20"
					className={`inline w-8 h-8 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1 ${isOpen ? "-rotate-180" : "rotate-0"}`}
				>
					<path
						fillRule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clipRule="evenodd"
					></path>
				</svg>
			</button>
			{isOpen && (
				<div className="absolute right-0 w-full mt-2 origin-top-right rounded-md shadow-lg z-10">
					<div className="px-2 py-2 bg-white rounded-md shadow">
						<a
							className="block px-4 py-2 mt-2 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
							href="/project"
						>
							<h4 className="text-lg font-medium">Project</h4>
							<span className="text-sm text-gray-500">
								Organize or find events and other things to do online and nearby.
							</span>
						</a>
						<a
							className="block px-4 py-2 mt-2 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
							href="/forum"
						>
							<h4 className="text-lg font-medium">Forum</h4>
							<span className="text-sm text-gray-500">
								Organize or find events and other things to do online and nearby.
							</span>
						</a>
						<a
							className="block px-4 py-2 mt-2 bg-transparent rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
							href="/chat"
						>
							<h4 className="text-lg font-medium">Chat</h4>
							<span className="text-sm text-gray-500">
								Organize or find events and other things to do online and nearby.
							</span>
						</a>
					</div>
				</div>
			)}
		</div>
	);
}

function UserProfileDropDown() {
	const { user, signOut } = useAuthStore();
	const { setMenuActivated } = useGlobalStore();

	function handleSignOut() {
		signOut();
		setMenuActivated(false);
	}

	return (
		<div className="relative flex items-center justify-between mt-3">
			<span className="text-xl sm:text-2xl lg:text-sm font-medium">{user?.fullName}</span>
			<Button variant="outline" color="gray" className="text-font-primary" onClick={handleSignOut}>
				Sign out
			</Button>
		</div>
	);
}
