import { cn } from "@sglara/cn";
import { useCallback, useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
const Carousel = ({
	slides,
	autoPlay = false,
	interval = 5000,
	showArrows = true,
	showIndicators = true,
	infinite = true,
	className,
	leftArrow,
	rightArrow,
	indicatorClass,
	indicatorSelectedClass,
}: CarouselProps) => {
	// States
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [isHovering, setIsHovering] = useState<boolean>(false);

	// Carousel Navigation
	const goToSlide = useCallback(
		(index: number) => {
			let newIndex = index;

			if (index < 0) {
				newIndex = infinite ? slides.length - 1 : 0;
			} else if (index >= slides.length) {
				newIndex = infinite ? 0 : slides.length - 1;
			}

			setCurrentIndex(newIndex);
		},
		[slides.length, infinite],
	);

	const goToNext = useCallback(() => {
		goToSlide(currentIndex + 1);
	}, [currentIndex, goToSlide]);

	const goToPrev = useCallback(() => {
		goToSlide(currentIndex - 1);
	}, [currentIndex, goToSlide]);

	// Auto-play functionality
	useEffect(() => {
		if (!autoPlay || isHovering) return;

		const timer = setInterval(() => {
			goToNext();
		}, interval);

		return () => clearInterval(timer);
	}, [autoPlay, interval, isHovering, goToNext]);

	// Handle keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "ArrowLeft") {
				goToPrev();
			} else if (e.key === "ArrowRight") {
				goToNext();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [goToNext, goToPrev]);

	if (!slides || slides.length === 0) {
		return null;
	}

	// Render
	return (
		<div
			className={cn("relative w-full overflow-hidden rounded-lg", className)}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			aria-roledescription="carousel"
		>
			<div
				className="flex transition-transform duration-500 ease-out"
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}
			>
				{slides.map((slide, index) => (
					<div
						key={slide.id}
						className="w-full flex-shrink-0"
						aria-roledescription="slide"
						aria-label={`Slide ${index + 1} of ${slides.length}`}
						aria-hidden={index !== currentIndex}
					>
						{slide.content}
					</div>
				))}
			</div>

			{/* Navigation Arrows */}
			{showArrows && slides.length > 1 && (
				<>
					<button
						type="button"
						onClick={goToPrev}
						className="absolute left-2 top-1/2 z-10 cursor-pointer -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:cursor-not-allowed disabled:opacity-50"
						disabled={!infinite && currentIndex === 0}
						aria-label="Previous slide"
					>
						{leftArrow || <FaArrowLeft className="h-6 w-6" />}
					</button>
					<button
						type="button"
						onClick={goToNext}
						className="absolute right-2 cursor-pointer top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:cursor-not-allowed disabled:opacity-50"
						disabled={!infinite && currentIndex === slides.length - 1}
						aria-label="Next slide"
					>
						{rightArrow || <FaArrowRight className="h-6 w-6" />}
					</button>
				</>
			)}

			{/* Indicators */}
			{showIndicators && slides.length > 1 && (
				<div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
					{slides.map((slide, index) => (
						<button
							type="button"
							key={slide.id}
							onClick={() => goToSlide(index)}
							className={cn(
								"h-2 w-2 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white/50",
								index === currentIndex
									? indicatorClass || "w-4 bg-white"
									: indicatorSelectedClass || "bg-white/50 hover:bg-white/80",
							)}
							aria-label={`Go to slide ${index + 1}`}
							aria-current={index === currentIndex ? "true" : "false"}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export type CarouselSlide = {
	id: string | number;
	content: React.ReactNode;
};

export interface CarouselProps {
	/**
	 * The slides to display in the carousel
	 */
	slides: CarouselSlide[];
	/**
	 * Whether to auto-play the carousel
	 * @default false
	 */
	autoPlay?: boolean;
	/**
	 * The interval between slides when auto-playing (in ms)
	 * @default 2000
	 */
	interval?: number;
	/**
	 * Whether to show navigation arrows
	 * @default true
	 */
	showArrows?: boolean;
	/**
	 * Custom navigation left arrow
	 * @default
	 */
	leftArrow?: React.ReactNode;
	/**
	 * Custom navigation right arrow
	 * @default
	 */
	rightArrow?: React.ReactNode;
	/**
	 * Whether to show slide indicators
	 * @default true
	 */
	showIndicators?: boolean;
	/**
	 * Whether to loop the carousel
	 * @default true
	 */
	infinite?: boolean;
	/**
	 * Custom class name for the carousel container
	 */
	className?: string;
	/**
	 * Custom class name for the carousel indicators
	 */
	indicatorClass?: string;
	indicatorSelectedClass?: string;
}

export default Carousel;
