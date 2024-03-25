import useGlobalStore from "@/store/useGlobalStore";
import "./style.css";
import useAuthStore from "@/store/useAuthStore";
import { CgMenuGridO } from "react-icons/cg";
import { navbarProducts } from "@/constants/menu";

export default function NavigationBar() {
	const { isMenuActivated, toggleMenu, setCoreMenuActivated, setProfileMenuActivated } = useGlobalStore();
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
								<img src={user.profileImage} alt={user.fullName} className="w-9 h-9 rounded-full" />
							)}
						</button>
					</div>
				)}
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
			{navbarProducts.map((p) => (
				<li key={p.label} className="menu-item">
					<a href={`/projects?c=${p.url}`}>{p.label}</a>
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
