import Popup from "../components/Popup";
import BackButton from "./BackButton";
const PopupTest = () => {
	// Render
	const PlaceholderContent = () => {
		return (
			<div className="bg-black p-4 text-xl rounded-lg text-white">
				Hello World
			</div>
		);
	};
	return (
		<div className="mx-4 space-y-4 min-h-screen">
			<div className="h-2" />
			<BackButton />
			<h1 className="text-center font-bold text-2xl md:text-4xl">
				Popup Component
			</h1>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mx-2 md:mx-[15%]">
				<div className="flex flex-col gap-2">
					<h2 className="font-semibold text-base md:text-2xl text-center">
						Top
					</h2>
					<Popup
						trigger={
							<div className="mx-auto bg-[#505081] text-white text-base md:text-xl cursor-pointer p-2 rounded-xl text-center">
								Hover Over Me
							</div>
						}
						content={<PlaceholderContent />}
					/>
				</div>
				<div className="flex flex-col gap-2">
					<h2 className="font-semibold text-base md:text-2xl text-center">
						Left
					</h2>
					<Popup
						trigger={
							<div className="mx-auto bg-[#505081] text-white text-base md:text-xl cursor-pointer p-2 rounded-xl text-center">
								Hover Over Me
							</div>
						}
						content={<PlaceholderContent />}
						position="left"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<h2 className="font-semibold text-base md:text-2xl text-center">
						Right
					</h2>
					<Popup
						trigger={
							<div className="mx-auto bg-[#505081] text-white text-base md:text-xl cursor-pointer p-2 rounded-xl text-center">
								Hover Over Me
							</div>
						}
						content={<PlaceholderContent />}
						position="right"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<h2 className="font-semibold text-base md:text-2xl text-center">
						Bottom
					</h2>
					<Popup
						trigger={
							<div className="mx-auto bg-[#505081] text-white text-base md:text-xl cursor-pointer p-2 rounded-xl text-center">
								Hover Over Me
							</div>
						}
						content={<PlaceholderContent />}
						position="bottom"
					/>
				</div>
			</div>
		</div>
	);
};

export default PopupTest;
