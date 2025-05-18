import { useNavigate } from "react-router-dom";
const ExampleHub = () => {
	// Navigation
	const navigate = useNavigate();
	const navigateToPage = (page: string): void => {
		navigate(page);
	};
	// Render
	return (
		<div className="m-4 space-y-4">
			<h1 className="text-center font-bold text-2xl">UI Components</h1>
			<div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 mx-2 md:mx-[15%]">
				<button
					type="button"
					onClick={() => navigateToPage("/modal")}
					className="bg-[#505081] hover:bg-[#0F0E47] text-white text-base md:text-xl cursor-pointer p-2 rounded-xl"
				>
					Modal
				</button>
				<button
					type="button"
					onClick={() => navigateToPage("/popup")}
					className="bg-[#505081] hover:bg-[#0F0E47] text-white text-base md:text-xl cursor-pointer p-2 rounded-xl"
				>
					Popup
				</button>
				<button
					type="button"
					onClick={() => navigateToPage("/slider")}
					className="bg-[#505081] hover:bg-[#0F0E47] text-white text-base md:text-xl cursor-pointer p-2 rounded-xl"
				>
					Slider
				</button>
				<button
					type="button"
					onClick={() => navigateToPage("/carousel")}
					className="bg-[#505081] hover:bg-[#0F0E47] text-white text-base md:text-xl cursor-pointer p-2 rounded-xl"
				>
					Carousel
				</button>
				<button
					type="button"
					onClick={() => navigateToPage("/accordion")}
					className="bg-[#505081] hover:bg-[#0F0E47] text-white text-base md:text-xl cursor-pointer p-2 rounded-xl"
				>
					Accordion
				</button>
				<button
					type="button"
					onClick={() => navigateToPage("/dropdown")}
					className="bg-[#505081] hover:bg-[#0F0E47] text-white text-base md:text-xl cursor-pointer p-2 rounded-xl"
				>
					Dropdown
				</button>
				<button
					type="button"
					onClick={() => navigateToPage("/drawer")}
					className="bg-[#505081] hover:bg-[#0F0E47] text-white text-base md:text-xl cursor-pointer p-2 rounded-xl"
				>
					Drawer
				</button>
			</div>
		</div>
	);
};

export default ExampleHub;
