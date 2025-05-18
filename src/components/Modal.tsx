import { cn } from "@sglara/cn"; // Utility function to deal with Tailwind Class Name Management
import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";

export interface ModalRef {
	onShow: () => void;
	onHide: () => void;
}

const Modal = forwardRef<ModalRef, ModalProps>(
	(
		{
			buttonContent,
			content,
			position = "center",
			backdrop = true,
			staticModal = false,
		},
		ref,
	) => {
		// State
		const [isOpen, setIsOpen] = useState<boolean>(false);

		// Ref
		const dialogRef = useRef<HTMLDivElement>(null);
		useImperativeHandle(ref, () => ({
			onShow: openModal,
			onHide: closeModal,
		}));

		// Function
		const openModal = () => {
			setIsOpen(true);
		};

		const closeModal = () => {
			setIsOpen(false);
		};

		// biome-ignore lint/correctness/useExhaustiveDependencies(closeModal): no infinite loops
		useEffect(() => {
			const handleClickOutside = (event: MouseEvent) => {
				const dialog = dialogRef.current;
				if (dialog && isOpen) {
					const rect = dialog.getBoundingClientRect();
					const isInDialog =
						rect.top <= event.clientY &&
						event.clientY <= rect.top + rect.height &&
						rect.left <= event.clientX &&
						event.clientX <= rect.left + rect.width;
					if (!isInDialog) {
						closeModal();
					}
				}
			};

			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [isOpen]);

		// Render
		const getCenteringStyle = (): string => {
			switch (position) {
				case "top-left":
					return "justify-start items-start";
				case "top-center":
					return "justify-center items-start";
				case "top-right":
					return "justify-end items-start";
				case "center-left":
					return "items-center justfy-start";
				case "center":
					return "justify-center items-center";
				case "center-right":
					return "items-center justify-end";
				case "bottom-left":
					return "justify-start items-end";
				case "bottom-center":
					return "items-end justify-center";
				default:
					return "justify-end items-end";
			}
		};
		return (
			<>
				<button type="button" onClick={openModal} className="flex items-center">
					{buttonContent}
				</button>
				{isOpen && backdrop && (
					<div className="absolute inset-0 bg-[#00000080]" />
				)}
				{isOpen && (
					<div
						ref={dialogRef}
						className={cn("fixed inset-0 flex", getCenteringStyle())}
						onClick={() => {
							if (!staticModal) {
								closeModal();
							}
						}}
						onKeyDown={() => {
							if (!staticModal) {
								closeModal();
							}
						}}
					>
						{content}
					</div>
				)}
			</>
		);
	},
);

interface ModalProps {
	buttonContent: React.ReactNode;
	content: React.ReactNode;
	position?:
		| "top-left"
		| "top-center"
		| "top-right"
		| "center-left"
		| "center"
		| "center-right"
		| "bottom-left"
		| "bottom-center"
		| "bottom-right";
	backdrop?: boolean;
	staticModal?: boolean;
}

export default Modal;
