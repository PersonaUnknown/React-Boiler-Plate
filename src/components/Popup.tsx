import { cn } from "@sglara/cn"; // Utility function to deal with Tailwind Class Name Management
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
const Popup = ({
	trigger,
	content,
	position = "top",
	className,
	contentClassName,
	delay = 200,
}: PopupProps) => {
	// State
	const [isMounted, setIsMounted] = useState<boolean>(false);
	const [isHovering, setIsHovering] = useState<boolean>(false);
	const [popupPosition, setPopupPosition] = useState<PopupPosition>({
		top: 0,
		left: 0,
	});

	// Refs / Contexts
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);
	const triggerRef = useRef<HTMLDivElement>(null);
	const popupRef = useRef<HTMLDivElement>(null);

	// Events / Hooks
	useEffect(() => {
		setIsMounted(true);
		return () => setIsMounted(false);
	}, []);

	useEffect(() => {
		if (isHovering) {
			window.addEventListener("resize", calculatePosition);
			window.addEventListener("scroll", calculatePosition);
		}

		return () => {
			window.removeEventListener("resize", calculatePosition);
			window.removeEventListener("scroll", calculatePosition);
		};
	}, [isHovering]);

	useEffect(() => {
		if (!isHovering && timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, [isHovering]);

	const handleMouseEnter = () => {
		timeoutRef.current = setTimeout(() => {
			setIsHovering(true);

			// Calculate position after a small delay to ensure the popup is rendered
			setTimeout(calculatePosition, 0);
		}, delay);
	};

	const handleMouseLeave = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		setIsHovering(false);
	};

	const calculatePosition = () => {
		if (!triggerRef.current || !popupRef.current) return;

		const triggerRect = triggerRef.current.getBoundingClientRect();
		const popupRect = popupRef.current.getBoundingClientRect();
		const scrollY = window.scrollY;
		const scrollX = window.scrollX;

		let top = 0;
		let left = 0;

		switch (position) {
			case "top":
				top = triggerRect.top + scrollY - popupRect.height - 8;
				left =
					triggerRect.left +
					scrollX +
					triggerRect.width / 2 -
					popupRect.width / 2;
				break;
			case "right":
				top =
					triggerRect.top +
					scrollY +
					triggerRect.height / 2 -
					popupRect.height / 2;
				left = triggerRect.right + scrollX + 8;
				break;
			case "bottom":
				top = triggerRect.bottom + scrollY + 8;
				left =
					triggerRect.left +
					scrollX +
					triggerRect.width / 2 -
					popupRect.width / 2;
				break;
			case "left":
				top =
					triggerRect.top +
					scrollY +
					triggerRect.height / 2 -
					popupRect.height / 2;
				left = triggerRect.left + scrollX - popupRect.width - 8;
				break;
		}

		// Ensure popup stays within viewport
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		if (left < scrollX) left = scrollX + 8;
		if (left + popupRect.width > scrollX + viewportWidth)
			left = scrollX + viewportWidth - popupRect.width - 8;

		if (top < scrollY) top = scrollY + 8;
		if (top + popupRect.height > scrollY + viewportHeight)
			top = scrollY + viewportHeight - popupRect.height - 8;

		setPopupPosition({ top, left });
	};

	const getPopupClasses = () => {
		const baseClasses = "z-50 transition-opacity duration-200";

		return cn(
			baseClasses,
			isHovering ? "opacity-100" : "opacity-0 pointer-events-none",
			contentClassName,
		);
	};

	// Render
	return (
		<div
			className={cn(className)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			ref={triggerRef}
		>
			{trigger}
			{isMounted &&
				createPortal(
					<div
						ref={popupRef}
						className={getPopupClasses()}
						style={{
							position: "absolute",
							top: `${popupPosition.top}px`,
							left: `${popupPosition.left}px`,
						}}
						role="tooltip"
						aria-hidden={!isHovering}
					>
						{content}
					</div>,
					document.body,
				)}
		</div>
	);
};

type Position = "top" | "right" | "bottom" | "left";

interface PopupPosition {
	top: number;
	left: number;
}

interface PopupProps {
	trigger: React.ReactNode; // What is going to spawn the Popup
	content: React.ReactNode; // What is going to be displayed on the Popup
	position?: Position; //
	className?: string; // Tailwind Styling
	contentClassName?: string; // Tailwind Styling
	delay?: number; // How long to wait before displaying Popup
}

export default Popup;
