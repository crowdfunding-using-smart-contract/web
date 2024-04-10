import { footerProducts } from "@/constants/menu";

export default function Footer() {
	return (
		<footer className="p-8 lg:p-24">
			<div className="flex flex-col lg:flex-row gap-x-28 mb-10 text-[#6f6f73]">
				<div className="grid grid-cols-2 sm:grid-cols-3 gap-y-12 lg:gap-x-28">
					<div className="flex flex-col gap-y-4">
						<h3 className="text-lg lg:text-xl font-semibold text-[#222222]">Products</h3>
						{footerProducts.map((product, index) => (
							<p className="text-sm lg:text-base" key={index}>
								{product}
							</p>
						))}
					</div>
					<div className="flex flex-col gap-y-4 ">
						<h3 className="text-lg lg:text-xl font-semibold text-[#222222]">Developers</h3>
						<p className="text-sm lg:text-base">Thanathibordee S.</p>
						<p className="text-sm lg:text-base">Thanathip S.</p>
					</div>
					<div className="flex flex-col gap-y-4">
						<h3 className="text-lg lg:text-xl font-semibold text-[#222222]">Supports</h3>
						<p className="text-sm lg:text-base">Contact</p>
						<p className="text-sm lg:text-base">Bug Report</p>
						<p className="text-sm lg:text-base">support@fundo.com</p>
					</div>
				</div>
			</div>
			<div className="flex justify-center lg:justify-start">
				<span className="text-center text-lg font-medium text-[#6f6f73]">© 2024 FundO Inc.</span>
			</div>
		</footer>
	);
}
