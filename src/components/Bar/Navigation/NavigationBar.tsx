import useGlobalStore from "@/store/useGlobalStore";
import "./style.css";

export default function NavigationBar() {
	const { isMenuActivated, toggleMenu } = useGlobalStore();

	return (
		<nav className={`navbar ${isMenuActivated ? "navbar-open" : ""}`}>
			<a href="/" className="flex relative w-24">
				<img src="/assets/FundO.png" alt="logo" className="h-auto max-w-full" />
			</a>
			{isMenuActivated && (
				<div className="block lg:flex fixed left-0 top-[70px] w-full h-[calc(100vh-70px)] bg-white p-8 text-[#090b17]">
					<ul className="flex flex-col text-2xl font-medium text-left">
						<li className="menu-item">Art</li>
						<li className="menu-item">Comis & Illustration</li>
						<li className="menu-item">Design & Tech</li>
						<li className="menu-item">Film</li>
						<li className="menu-item">Food & Craft</li>
						<li className="menu-item">Games</li>
						<li className="menu-item">Music</li>
					</ul>
				</div>
			)}
			<button className="btn-toggle-menu" aria-checked={isMenuActivated} onClick={toggleMenu}>
				<span className="border-0 w-[1px] h-[1px] absolute overflow-hidden">Toggle menu</span>
			</button>
		</nav>
	);
}
