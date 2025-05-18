import { useState } from "react";
import Dropdown, { type DropdownOption } from "../components/Dropdown";
import BackButton from "./BackButton";
const DropdownTest = () => {
	const [selectedValue, setSelectedValue] = useState<string>("");
	const options: DropdownOption[] = [
		{ value: "apple", label: "Apple" },
		{ value: "banana", label: "Banana" },
		{ value: "cherry", label: "Cherry" },
		{ value: "durian", label: "Durian", disabled: true },
		{ value: "elderberry", label: "Elderberry" },
		{ value: "fig", label: "Fig" },
		{ value: "grape", label: "Grape" },
	];
	return (
		<div className="mx-4 space-y-4 min-h-screen">
			<div className="h-2" />
			<BackButton />
			<h1 className="text-center font-bold text-2xl md:text-4xl">
				Dropdown Component
			</h1>
			<div className="space-y-2">
				<label
					htmlFor="fruit-select"
					className="block text-sm font-medium text-gray-700"
				>
					Select a fruit
				</label>
				<Dropdown
					options={options}
					value={selectedValue}
					onChange={setSelectedValue}
					placeholder="Choose a fruit"
				/>
				{selectedValue && (
					<p className="mt-2 text-sm text-gray-600">
						You selected:{" "}
						<span className="font-medium">
							{options.find((opt) => opt.value === selectedValue)?.label}
						</span>
					</p>
				)}
			</div>

			<div className="pt-4 border-t border-gray-200">
				<h2 className="text-lg font-semibold mb-2">Component Variations</h2>

				<div className="space-y-4">
					<div>
						<p className="mb-1 text-sm font-medium text-gray-700">
							Disabled dropdown:
						</p>
						<Dropdown
							options={options}
							disabled={true}
							placeholder="Disabled dropdown"
						/>
					</div>

					<div>
						<p className="mb-1 text-sm font-medium text-gray-700">
							With preselected value:
						</p>
						<Dropdown options={options} value="banana" onChange={() => {}} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default DropdownTest;
