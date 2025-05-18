import { useRef } from "react";
import { IoClose } from "react-icons/io5";
import Drawer from "../components/Drawer";
import type { DrawerRef } from "../components/Drawer";
import BackButton from "./BackButton";
const DrawerTest = () => {
	const drawerRef = useRef<DrawerRef>(null);
	const PlaceholderContent = () => {
		return (
			<div
				className="flex flex-col bg-white m-0 p-4 w-full h-full text-center space-y-1"
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}
			>
				<button
					type="button"
					onClick={() => drawerRef?.current?.onHide()}
					className="cursor-pointer ml-auto z-10"
				>
					<IoClose size={30} />
				</button>
				<h2 className="font-bold text-3xl text-center">Header</h2>
				<div className="w-full h-0.5 bg-black" />
				<div className="text-left">
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
					minim veniam, quis nostrud exercitation ullamco laboris nisi ut
					aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
					pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
					culpa qui officia deserunt mollit anim id est laborum."
				</div>
			</div>
		);
	};
	return (
		<div className="mx-4 space-y-4 min-h-screen">
			<div className="h-2" />
			<BackButton />
			<h1 className="text-center font-bold text-2xl md:text-4xl">
				Drawer Component
			</h1>
			<div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 mx-2 md:mx-[15%]">
				<div className="flex flex-col gap-2">
					<h2 className="font-semibold text-base md:text-2xl text-center">
						Top
					</h2>
					<Drawer
						ref={drawerRef}
						buttonContent={
							<div className="mx-auto bg-[#505081] hover:bg-[#0F0E47] text-white text-base md:text-xl cursor-pointer p-2 rounded-xl">
								Press Here
							</div>
						}
						content={<PlaceholderContent />}
						side="top"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<h2 className="font-semibold text-base md:text-2xl text-center">
						Down
					</h2>
					<Drawer
						ref={drawerRef}
						buttonContent={
							<div className="mx-auto bg-[#505081] hover:bg-[#0F0E47] text-white text-base md:text-xl cursor-pointer p-2 rounded-xl">
								Press Here
							</div>
						}
						content={<PlaceholderContent />}
						side="bottom"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<h2 className="font-semibold text-base md:text-2xl text-center">
						Left
					</h2>
					<Drawer
						ref={drawerRef}
						buttonContent={
							<div className="mx-auto bg-[#505081] hover:bg-[#0F0E47] text-white text-base md:text-xl cursor-pointer p-2 rounded-xl">
								Press Here
							</div>
						}
						content={<PlaceholderContent />}
						side="left"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<h2 className="font-semibold text-base md:text-2xl text-center">
						Right
					</h2>
					<Drawer
						ref={drawerRef}
						buttonContent={
							<div className="mx-auto bg-[#505081] hover:bg-[#0F0E47] text-white text-base md:text-xl cursor-pointer p-2 rounded-xl">
								Press Here
							</div>
						}
						content={<PlaceholderContent />}
						side="right"
					/>
				</div>

				<div className="flex flex-col gap-2">
					<h2 className="font-semibold text-base md:text-2xl text-center">
						Static Drawer
					</h2>
					<Drawer
						ref={drawerRef}
						buttonContent={
							<div className="mx-auto bg-[#505081] hover:bg-[#0F0E47] text-white text-base md:text-xl cursor-pointer p-2 rounded-xl">
								Press Here
							</div>
						}
						content={<PlaceholderContent />}
						side="left"
						staticModal={true}
					/>
				</div>
			</div>
		</div>
	);
};

export default DrawerTest;
