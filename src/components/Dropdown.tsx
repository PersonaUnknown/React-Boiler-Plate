import { useEffect, useRef, useState } from "react";
import { BiChevronDown } from "react-icons/bi";

export type DropdownOption = {
	value: string;
	label: string;
	disabled?: boolean;
};

type DropdownProps = {
	options: DropdownOption[];
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
};

const Dropdown = ({
	options,
	value,
	onChange,
	placeholder = "Select an option",
	disabled = false,
	className = "",
}: DropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedValue, setSelectedValue] = useState<string | undefined>(value);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Find the selected option label
	const selectedOption = options.find(
		(option) => option.value === selectedValue,
	);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	// Update internal state when value prop changes
	useEffect(() => {
		setSelectedValue(value);
	}, [value]);

	const handleSelect = (option: DropdownOption) => {
		if (option.disabled) return;

		setSelectedValue(option.value);
		setIsOpen(false);
		onChange?.(option.value);
	};

	const toggleDropdown = () => {
		if (!disabled) {
			setIsOpen(!isOpen);
		}
	};

	// Handle keyboard navigation
	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (disabled) return;

		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			toggleDropdown();
		} else if (e.key === "Escape") {
			setIsOpen(false);
		} else if (e.key === "ArrowDown" && isOpen) {
			e.preventDefault();
			const enabledOptions = options.filter((opt) => !opt.disabled);
			const currentIndex = enabledOptions.findIndex(
				(opt) => opt.value === selectedValue,
			);
			const nextIndex = (currentIndex + 1) % enabledOptions.length;
			handleSelect(enabledOptions[nextIndex]);
		} else if (e.key === "ArrowUp" && isOpen) {
			e.preventDefault();
			const enabledOptions = options.filter((opt) => !opt.disabled);
			const currentIndex = enabledOptions.findIndex(
				(opt) => opt.value === selectedValue,
			);
			const prevIndex =
				(currentIndex - 1 + enabledOptions.length) % enabledOptions.length;
			handleSelect(enabledOptions[prevIndex]);
		}
	};

	return (
		<div
			ref={dropdownRef}
			className={`relative w-full ${className}`}
			onKeyDown={handleKeyDown}
		>
			<button
				type="button"
				className={`flex items-center justify-between w-full px-4 py-2 text-left bg-white border rounded-md shadow-sm ${
					disabled
						? "cursor-not-allowed opacity-60 bg-gray-100"
						: "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
				} transition-colors`}
				onClick={toggleDropdown}
				aria-haspopup="listbox"
				aria-expanded={isOpen}
				disabled={disabled}
			>
				<span
					className={`block truncate ${!selectedValue ? "text-gray-500" : ""}`}
				>
					{selectedOption ? selectedOption.label : placeholder}
				</span>
				<BiChevronDown
					className={`w-4 h-4 ml-2 text-gray-400 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
				/>
			</button>

			{isOpen && (
				<div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
					<ul className="py-1">
						{options.map((option) => (
							<li
								key={option.value}
								id={`dropdown-option-${option.value}`}
								aria-selected={selectedValue === option.value}
								className={`px-4 py-2 cursor-pointer ${
									option.disabled
										? "text-gray-400 cursor-not-allowed bg-gray-50"
										: selectedValue === option.value
											? "bg-blue-100 text-blue-900"
											: "hover:bg-gray-100"
								}`}
								onClick={() => handleSelect(option)}
								onKeyDown={() => handleSelect(option)}
							>
								{option.label}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Dropdown;
