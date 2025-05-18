import { cn } from "@sglara/cn";
import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";
import useWindowDimensions from "../dimensions/windowDimensions";
export interface DrawerRef {
	onShow: () => void;
	onHide: () => void;
}

const Drawer = forwardRef<DrawerRef, DrawerProps>(
	({ buttonContent, content, side = "left", staticModal = false }, ref) => {
		// State
		const [isOpen, setIsOpen] = useState<boolean>(false);
		const { isMobile } = useWindowDimensions();

		// Ref
		const drawerRef = useRef<HTMLDivElement>(null);
		useImperativeHandle(ref, () => ({
			onShow: openDrawer,
			onHide: hideDrawer,
		}));
		const openDrawer = () => {
			setIsOpen(true);
		};
		const hideDrawer = () => {
			setIsOpen(false);
		};

		// biome-ignore lint/correctness/useExhaustiveDependencies(hideDrawer): no infinite loops
		useEffect(() => {
			const handleClickOutside = (event: MouseEvent) => {
				const dialog = drawerRef.current;
				if (dialog && isOpen) {
					const rect = dialog.getBoundingClientRect();
					const isInDialog =
						rect.top <= event.clientY &&
						event.clientY <= rect.top + rect.height &&
						rect.left <= event.clientX &&
						event.clientX <= rect.left + rect.width;
					if (!isInDialog) {
						hideDrawer();
					}
				}
			};

			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [isOpen]);

		// Prevent body scroll when drawer is open
		useEffect(() => {
			if (isOpen) {
				document.body.style.overflow = "hidden";
			} else {
				document.body.style.overflow = "";
			}
			return () => {
				document.body.style.overflow = "";
			};
		}, [isOpen]);

		// Render
		const getPositionClasses = (): string => {
			switch (side) {
				case "top":
					return "absolute top-0 inset-x-0 w-full h-screen sm:h-1/4 md:h-1/3 lg:h-1/2 xl:h-2/3";
				case "bottom":
					return "absolute bottom-0 inset-x-0 h-screen sm:h-1/4 md:h-1/3 lg:h-1/2 xl:h-2/3";
				case "left":
					return "absolute inset-y-0 left-0 w-screen sm:w-64 md:w-80 lg:w-96 xl:w-[30rem]";
				case "right":
					return "absolute inset-y-0 right-0 w-screen sm:w-64 md:w-80 lg:w-96 xl:w-[30rem]";
				default:
					return "";
			}
		};
		const getTransform = (): string => {
			if (!isOpen) {
				switch (side) {
					case "top":
						return "translateY(-100%)";
					case "right":
						return "translateX(100%)";
					case "bottom":
						return "translateY(100%)";
					case "left":
						return "translateX(-100%)";
					default:
						return "translateX(100%)";
				}
			}
			return "translate(0, 0)";
		};
		// w-72 md:w-96
		return (
			<>
				<button
					type="button"
					onClick={openDrawer}
					className="flex items-center"
				>
					{buttonContent}
				</button>
				{isOpen && <div className="absolute inset-0 bg-[#00000080]" />}
				<div
					ref={drawerRef}
					className={cn(
						"fixed inset-0 flex transition-transform duration-300 ease-in-out",
					)}
					style={{ transform: getTransform() }}
					onClick={() => {
						if (!staticModal) {
							hideDrawer();
						}
					}}
					onKeyDown={() => {
						if (!staticModal) {
							hideDrawer();
						}
					}}
				>
					<div className={cn(getPositionClasses())}>{content}</div>
				</div>
			</>
		);
	},
);

interface DrawerProps {
	side: "left" | "right" | "top" | "bottom";
	buttonContent: React.ReactNode;
	content: React.ReactNode;
	staticModal?: boolean;
}

export default Drawer;
