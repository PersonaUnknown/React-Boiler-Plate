import { cn } from "@sglara/cn";
import { motion } from "motion/react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { FaAngleDown } from "react-icons/fa";

const AccordionContext = createContext<{
	expanded: string[];
	toggle: (id: string) => void;
	allowMultiple: boolean;
	animationStyle: "slide" | "none";
}>({
	expanded: [],
	toggle: () => {},
	allowMultiple: false,
	animationStyle: "slide",
});

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
	defaultExpanded?: string[];
	allowMultiple?: boolean;
	animationStyle?: "slide" | "none";
	children?: React.ReactNode;
}

export function Accordion({
	defaultExpanded = [],
	allowMultiple = false,
	animationStyle = "none",
	className,
	children,
	...props
}: AccordionProps) {
	const [expanded, setExpanded] = useState<string[]>(defaultExpanded);

	const toggle = useCallback(
		(id: string) => {
			if (allowMultiple) {
				setExpanded((prev) =>
					prev.includes(id)
						? prev.filter((item) => item !== id)
						: [...prev, id],
				);
			} else {
				setExpanded((prev) => (prev.includes(id) ? [] : [id]));
			}
		},
		[allowMultiple],
	);

	return (
		<AccordionContext.Provider
			value={{ expanded, toggle, allowMultiple, animationStyle }}
		>
			<div className={cn(className)} {...props}>
				{children}
			</div>
		</AccordionContext.Provider>
	);
}

export interface AccordionItemProps
	extends React.HTMLAttributes<HTMLDivElement> {
	id: string;
	disabled?: boolean;
	children?: React.ReactNode;
}

export function AccordionItem({
	id,
	disabled = false,
	className,
	children,
	...props
}: AccordionItemProps) {
	return (
		<div
			className={cn(
				"rounded-md border",
				disabled && "cursor-not-allowed opacity-50",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}

export interface AccordionTriggerProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	icon?: React.ReactNode;
	children?: React.ReactNode;
}

export function AccordionTrigger({
	className,
	children,
	icon = (
		<FaAngleDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
	),
	...props
}: AccordionTriggerProps) {
	const { expanded, toggle } = useContext(AccordionContext);
	const itemId = useContext(AccordionItemIdContext);
	const isExpanded = expanded.includes(itemId);

	return (
		<button
			className={cn(
				"flex w-full items-center justify-between rounded-t-md px-4 py-2 font-medium transition-all hover:bg-muted/50 [&[data-state=open]>svg]:rotate-180",
				className,
			)}
			onClick={() => toggle(itemId)}
			aria-expanded={isExpanded}
			data-state={isExpanded ? "open" : "closed"}
			{...props}
		>
			{children}
			{icon}
		</button>
	);
}

export interface AccordionContentProps
	extends React.HTMLAttributes<HTMLDivElement> {
	children?: React.ReactNode;
}

const AccordionItemIdContext = createContext<string>("");

export function AccordionContent({
	className,
	children,
}: AccordionContentProps) {
	const { expanded, animationStyle } = useContext(AccordionContext);
	const id = useContext(AccordionItemIdContext);
	const isExpanded = expanded.includes(id);
	const [height, setHeight] = useState<number | undefined>(
		isExpanded ? undefined : 0,
	);

	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (!ref.current) return;

		if (isExpanded) {
			const contentHeight = ref.current.scrollHeight;
			setHeight(contentHeight);
		} else {
			setHeight(0);
		}
	}, [isExpanded]);

	const getAnimationClasses = () => {
		if (animationStyle === "none") return "";

		const animationMap = {
			slide: "transition-[height] duration-300 ease-out",
		};

		return animationMap[animationStyle] || animationMap.slide;
	};

	return (
		<div
			ref={ref}
			className={cn("overflow-hidden", getAnimationClasses(), className)}
			style={{
				height:
					animationStyle === "slide"
						? `${height}px`
						: animationStyle === "none"
							? isExpanded
								? "auto"
								: 0
							: undefined,
			}}
			aria-hidden={!isExpanded}
		>
			<div className="px-4 py-2">{children}</div>
		</div>
	);
}

export function AccordionWrapper({
	id,
	...props
}: { id: string } & React.HTMLAttributes<HTMLDivElement>) {
	return (
		<AccordionItemIdContext.Provider value={id}>
			<div {...props} />
		</AccordionItemIdContext.Provider>
	);
}
