import useGlobalStore from "@/store/useGlobalStore";
import "./style.css";
import useAuthStore from "@/store/useAuthStore";
import { User } from "@/types/user";
import { changeBrowserLanguage } from "@/i18n/functions";

export default function NavigationBar() {
	const { isMenuActivated, toggleMenu } = useGlobalStore();
	const { isAuthenticated, user } = useAuthStore();
	const { pathname } = window.location;

	if (pathname === "/login" || pathname === "/signup") {
		return null;
	}

	return (
		<nav className={`navbar ${isMenuActivated ? "navbar-open" : ""}`}>
			<a href="/" className="flex relative w-24">
				<img src="/assets/FundO.png" alt="logo" className="h-auto max-w-full" />
			</a>

			<div className="hidden lg:flex lg:items-center lg:relative lg:top-0 w-full lg:h-auto bg-white lg:p-0 text-[#090b17]">
				<MenuList />
				<button onClick={() => changeBrowserLanguage("th")}>LANG</button>
				{!isAuthenticated ? <ButtonList /> : <UserProfile user={user} />}
			</div>
			{isMenuActivated && (
				<div className="block lg:hidden fixed left-0 top-[70px] w-full h-[calc(100vh-70px)] bg-white p-8 text-[#090b17]">
					<MenuList />
					<ButtonList />
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
			<li className="menu-item">
				<a href="/">Art</a>
			</li>
			<li className="menu-item">
				<a href="/">Comis & Illustration</a>
			</li>
			<li className="menu-item">
				<a href="/">Design & Tech</a>
			</li>
			<li className="menu-item">
				<a href="/">Film</a>
			</li>
			<li className="menu-item">
				<a href="/">Food & Craft</a>
			</li>
			<li className="menu-item">
				<a href="/">Games</a>
			</li>
			<li className="menu-item">
				<a href="/">Music</a>
			</li>
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

function UserProfile({ user }: { user: User | null }) {
	if (!user) {
		return null;
	}

	return (
		<div className="flex items-center text-gray-900">
			<a href="/projects/new" className="underline mr-3">
				Create Project
			</a>
			<a
				href="/profile"
				className="hover:bg-gray-100 flex items-center gap-x-3 p-2 rounded duration-150 cursor-pointer"
			>
				{!user.profileImage ? (
					<div className="w-10 h-10 bg-gray-300 shadow font-medium rounded-full flex items-center justify-center">
						{user.fullName[0]}
					</div>
				) : (
					<img src={user.profileImage} alt={user.fullName} className="w-10 h-10 rounded-full" />
				)}
				<span>
					{user.fullName.split(" ")[0]} {`${user.fullName.split(" ")[1][0]}.`}
				</span>
			</a>
		</div>
	);
}
