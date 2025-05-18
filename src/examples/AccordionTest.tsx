import { cn } from "@sglara/cn";
import { FaArrowLeft, FaMinus, FaPlus } from "react-icons/fa";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	AccordionWrapper,
} from "../components/Accordion";
import BackButton from "./BackButton";

const AccordionTest = () => {
	return (
		<div className="mx-4 space-y-4 min-h-screen">
			<div className="h-2" />
			<BackButton />
			<h1 className="text-center font-bold text-2xl md:text-4xl">
				Accordion Component
			</h1>

			<div>
				<h2 className="mb-4 text-lg font-semibold">Default Accordion</h2>
				<Accordion defaultExpanded={["item-1"]}>
					{[
						"What is React?",
						"What is TypeScript?",
						"What is Tailwind CSS?",
					].map((item, index) => (
						<AccordionWrapper
							key={`item-${index + 1}`}
							id={`item-${index + 1}`}
						>
							<AccordionItem id={`item-${index + 1}`} className="mb-2">
								<AccordionTrigger>{item}</AccordionTrigger>
								<AccordionContent>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
									do eiusmod tempor incididunt ut labore et dolore magna aliqua.
								</AccordionContent>
							</AccordionItem>
						</AccordionWrapper>
					))}
				</Accordion>
			</div>

			<div>
				<h2 className="mb-4 text-lg font-semibold">Multiple Open Items</h2>
				<Accordion allowMultiple defaultExpanded={["multi-1", "multi-3"]}>
					{["First Item", "Second Item", "Third Item"].map((item, index) => (
						<AccordionWrapper
							key={`multi-${index + 1}`}
							id={`multi-${index + 1}`}
						>
							<AccordionItem
								id={`multi-${index + 1}`}
								className="mb-2 border-blue-200"
							>
								<AccordionTrigger className="bg-blue-50 hover:bg-blue-100">
									{item}
								</AccordionTrigger>
								<AccordionContent className="bg-blue-50/50">
									This accordion allows multiple items to be open
									simultaneously. Try clicking on different headers!
								</AccordionContent>
							</AccordionItem>
						</AccordionWrapper>
					))}
				</Accordion>
			</div>
			<div>
				<h2 className="mb-4 text-lg font-semibold">Animated + Custom Styles</h2>
				<Accordion
					className="border border-black rounded-lg overflow-hidden"
					animationStyle={"slide"}
					allowMultiple
				>
					{["First Item", "Second Item", "Third Item"].map((item, index) => (
						<AccordionWrapper
							key={`slide-${index + 1}`}
							id={`slide-${index + 1}`}
						>
							<AccordionItem id={`slide-${index + 1}`} className={"border-0"}>
								<AccordionTrigger className="bg-blue-400 hover:bg-blue-500 rounded-none">
									{item}
								</AccordionTrigger>
								<AccordionContent className="bg-blue-300">
									<p>
										This accordion uses the <strong>slide</strong> animation
										style.
									</p>
									<p className="mt-2">
										Try opening and closing to see the effect!
									</p>
								</AccordionContent>
							</AccordionItem>
						</AccordionWrapper>
					))}
				</Accordion>
			</div>
			<div>
				<h2 className="mb-4 text-lg font-semibold">Custom Icons</h2>
				<Accordion>
					<AccordionWrapper id="custom-1">
						<AccordionItem id="custom-1" className="mb-2 border-green-200">
							<AccordionTrigger
								className="bg-green-50 hover:bg-green-100"
								icon={
									<FaArrowLeft
										className={cn(
											"h-4 w-4 text-green-600 transition-transform duration-200",
										)}
									/>
								}
							>
								Custom Chevron Icon
							</AccordionTrigger>
							<AccordionContent className="bg-green-50/50">
								This accordion uses a custom chevron icon that rotates 90
								degrees instead of 180.
							</AccordionContent>
						</AccordionItem>
					</AccordionWrapper>

					<AccordionWrapper id="custom-2">
						<AccordionItem id="custom-2" className="border-green-200">
							<AccordionTrigger
								className="bg-green-50 hover:bg-green-100 group"
								icon={
									<div className="flex">
										<FaPlus className="h-4 w-4 text-green-600 group-data-[state=open]:hidden" />
										<FaMinus className="hidden h-4 w-4 text-green-600 group-data-[state=open]:block" />
									</div>
								}
							>
								Plus/Minus Icons
							</AccordionTrigger>
							<AccordionContent className="bg-green-50/50">
								This accordion uses plus/minus icons instead of a chevron.
							</AccordionContent>
						</AccordionItem>
					</AccordionWrapper>
				</Accordion>
			</div>
		</div>
	);
};

export default AccordionTest;
