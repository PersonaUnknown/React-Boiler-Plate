// Slider achieved using two absolute positioned <div> elements to represent both thumbs on a relative positioned parent <div>
// Handles mouse events to calculate position of both thumbs
import { cn } from "@sglara/cn";
import { useCallback, useEffect, useRef, useState } from "react";

const DualSlider = ({
	min, // Min Value of Slider
	max, // Max Value of Slider
	step = 1, // Step Value in-between Slider
	defaultLow = min,
	defaultHigh = max,
	onChange, // Updates current low and high values of slider to useState hook
	className = "", // Stylize
	trackClassName = "", // Stylize
	rangeClassName = "", // Stylize the area between both thumbs; ideal for setting color
	thumbClassName = "", // Stylize circular thumb
	labelClassName = "", // Stylize optional labels
	showLabels = true, // Set labels to be visible
	formatLabel = (value) => value.toString(), // How you want the labels to be formatted ($, %, etc.)
}: DualSliderProps) => {
	const [lowValue, setLowValue] = useState<number>(defaultLow);
	const [highValue, setHighValue] = useState<number>(defaultHigh);
	const [isDragging, setIsDragging] = useState<"low" | "high" | null>(null);
	const trackRef = useRef<HTMLDivElement>(null);

	// Ensure initial values are within bounds and properly stepped
	useEffect(() => {
		const validLow = Math.max(min, Math.min(defaultLow, max));
		const steppedLow = Math.round((validLow - min) / step) * step + min;

		const validHigh = Math.max(min, Math.min(defaultHigh, max));
		const steppedHigh = Math.round((validHigh - min) / step) * step + min;

		setLowValue(steppedLow);
		setHighValue(steppedHigh);
	}, [min, max, step, defaultLow, defaultHigh]);

	// Calculate percentage for positioning
	const getPercentage = useCallback(
		(value: number) => {
			return ((value - min) / (max - min)) * 100;
		},
		[min, max],
	);

	// Convert mouse position to value
	const getValueFromPosition = useCallback(
		(position: number) => {
			if (!trackRef.current) return min;

			const trackRect = trackRef.current.getBoundingClientRect();
			const trackWidth = trackRect.width;
			const offset = position - trackRect.left;

			// Calculate percentage of position along track
			let percentage = offset / trackWidth;
			percentage = Math.min(1, Math.max(0, percentage));

			// Convert to value and apply stepping
			const rawValue = percentage * (max - min) + min;
			const steppedValue = Math.round((rawValue - min) / step) * step + min;

			return Math.min(max, Math.max(min, steppedValue));
		},
		[min, max, step],
	);

	// Handle mouse/touch events
	const handleMouseDown = (event: React.MouseEvent, handle: "low" | "high") => {
		setIsDragging(handle);
		event.preventDefault();
	};

	const handleTouchStart = (_: React.TouchEvent, handle: "low" | "high") => {
		setIsDragging(handle);
	};

	const handleMove = useCallback(
		(clientX: number) => {
			if (!isDragging) return;

			const newValue = getValueFromPosition(clientX);

			if (isDragging === "low") {
				const updatedLow = Math.min(newValue, highValue - step);
				setLowValue(updatedLow);
				onChange?.(updatedLow, highValue);
			} else {
				const updatedHigh = Math.max(newValue, lowValue + step);
				setHighValue(updatedHigh);
				onChange?.(lowValue, updatedHigh);
			}
		},
		[isDragging, getValueFromPosition, highValue, lowValue, step, onChange],
	);

	const handleMouseMove = useCallback(
		(event: MouseEvent) => {
			handleMove(event.clientX);
		},
		[handleMove],
	);

	const handleTouchMove = useCallback(
		(event: TouchEvent) => {
			handleMove(event.touches[0].clientX);
		},
		[handleMove],
	);

	const handleEnd = useCallback(() => {
		setIsDragging(null);
	}, []);

	// Add and remove event listeners
	useEffect(() => {
		if (isDragging) {
			window.addEventListener("mousemove", handleMouseMove);
			window.addEventListener("mouseup", handleEnd);
			window.addEventListener("touchmove", handleTouchMove);
			window.addEventListener("touchend", handleEnd);
		}

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleEnd);
			window.removeEventListener("touchmove", handleTouchMove);
			window.removeEventListener("touchend", handleEnd);
		};
	}, [isDragging, handleMouseMove, handleTouchMove, handleEnd]);

	// Handle keyboard navigation
	const handleKeyDown = (
		event: React.KeyboardEvent,
		handle: "low" | "high",
	) => {
		let newValue: number;

		switch (event.key) {
			case "ArrowRight":
			case "ArrowUp":
				newValue = (handle === "low" ? lowValue : highValue) + step;
				break;
			case "ArrowLeft":
			case "ArrowDown":
				newValue = (handle === "low" ? lowValue : highValue) - step;
				break;
			case "Home":
				newValue = min;
				break;
			case "End":
				newValue = max;
				break;
			default:
				return;
		}

		// Ensure value is within bounds
		newValue = Math.min(max, Math.max(min, newValue));

		if (handle === "low") {
			const updatedLow = Math.min(newValue, highValue - step);
			setLowValue(updatedLow);
			onChange?.(updatedLow, highValue);
		} else {
			const updatedHigh = Math.max(newValue, lowValue + step);
			setHighValue(updatedHigh);
			onChange?.(lowValue, updatedHigh);
		}

		event.preventDefault();
	};

	return (
		<div className={cn("relative w-full py-4", className)}>
			{showLabels && (
				<div className="flex justify-between mb-2">
					<span className={cn("text-sm text-gray-500", labelClassName)}>
						{formatLabel(min)}
					</span>
					<span className={cn("text-sm text-gray-500", labelClassName)}>
						{formatLabel(max)}
					</span>
				</div>
			)}

			<div
				ref={trackRef}
				className={cn("h-2 w-full rounded-full bg-gray-200", trackClassName)}
			>
				{/* Selected range */}
				<div
					className={cn(
						"absolute h-2 rounded-full bg-gray-500",
						rangeClassName,
					)}
					style={{
						left: `${getPercentage(lowValue)}%`,
						width: `${getPercentage(highValue) - getPercentage(lowValue)}%`,
					}}
				/>

				{/* Low thumb */}
				<div
					role="slider"
					aria-valuemin={min}
					aria-valuemax={max}
					aria-valuenow={lowValue}
					aria-label="Minimum value"
					tabIndex={0}
					className={cn(
						"absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white border-2 border-gray-500 cursor-grab focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",
						`${
							isDragging === "low" ? "cursor-grabbing" : ""
						} ${thumbClassName}`,
					)}
					style={{ left: `${getPercentage(lowValue)}%` }}
					onMouseDown={(e) => handleMouseDown(e, "low")}
					onTouchStart={(e) => handleTouchStart(e, "low")}
					onKeyDown={(e) => handleKeyDown(e, "low")}
				/>

				{/* High thumb */}
				<div
					role="slider"
					aria-valuemin={min}
					aria-valuemax={max}
					aria-valuenow={highValue}
					aria-label="Maximum value"
					tabIndex={0}
					className={cn(
						"absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white border-2 border-gray-500 cursor-grab focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",
						`${
							isDragging === "low" ? "cursor-grabbing" : ""
						} ${thumbClassName}`,
					)}
					style={{ left: `${getPercentage(highValue)}%` }}
					onMouseDown={(e) => handleMouseDown(e, "high")}
					onTouchStart={(e) => handleTouchStart(e, "high")}
					onKeyDown={(e) => handleKeyDown(e, "high")}
				/>
			</div>

			{showLabels && (
				<div className="flex justify-between mt-2">
					<span className={`text-sm font-medium ${labelClassName}`}>
						{formatLabel(lowValue)}
					</span>
					<span className={`text-sm font-medium ${labelClassName}`}>
						{formatLabel(highValue)}
					</span>
				</div>
			)}
		</div>
	);
};

interface DualSliderProps {
	min: number;
	max: number;
	step?: number;
	defaultLow?: number;
	defaultHigh?: number;
	onChange?: (low: number, high: number) => void;
	className?: string;
	trackClassName?: string;
	rangeClassName?: string;
	thumbClassName?: string;
	labelClassName?: string;
	showLabels?: boolean;
	formatLabel?: (value: number) => string;
}

export default DualSlider;
