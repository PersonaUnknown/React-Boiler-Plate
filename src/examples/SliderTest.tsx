import { useState } from "react";
import DualSlider from "../components/DualSlider";
import BackButton from "./BackButton";
const SliderTest = () => {
	// State
	const [range, setRange] = useState({ min: 0, max: 100 });
	const [range2, setRange2] = useState({ min: 0, max: 100 });
	const [priceRange, setPriceRange] = useState({ min: 50, max: 500 });
	const [ageRange, setAgeRange] = useState({ min: 18, max: 65 });
	// Render
	return (
		<div className="mx-4 space-y-4 min-h-screen">
			<div className="h-2" />
			<BackButton />
			<h1 className="text-center font-bold text-2xl md:text-4xl">
				Slider Component
			</h1>
			<div className="mx-4 space-y-2">
				<div>
					<h2 className="text-lg font-medium">Without Labels</h2>
					<DualSlider
						min={0}
						max={100}
						step={1}
						defaultLow={range.min}
						defaultHigh={range.max}
						onChange={(low, high) => setRange({ min: low, max: high })}
						formatLabel={(value) => `${value} years`}
						trackClassName="bg-gray-500"
						rangeClassName="bg-red-500"
						thumbClassName="border-black focus:ring-black"
						showLabels={false}
					/>
				</div>
				<div>
					<h2 className="text-lg font-medium">No Label Formatting</h2>
					<DualSlider
						min={0}
						max={100}
						step={1}
						defaultLow={range2.min}
						defaultHigh={range2.max}
						onChange={(low, high) => setRange2({ min: low, max: high })}
						trackClassName="bg-gray-500"
						rangeClassName="bg-red-500"
						thumbClassName="border-black h-6 w-6 focus:ring-black"
					/>
				</div>
				<div>
					<h2 className="text-lg font-medium">Price Range Filter</h2>
					<DualSlider
						min={0}
						max={1000}
						step={10}
						defaultLow={priceRange.min}
						defaultHigh={priceRange.max}
						onChange={(low, high) => setPriceRange({ min: low, max: high })}
						formatLabel={(value) => `$${value}`}
						rangeClassName="bg-emerald-500"
						thumbClassName="border-emerald-500 focus:ring-emerald-500"
					/>
					<p className="mt-2 text-sm text-gray-600">
						Selected price: ${priceRange.min} - ${priceRange.max}
					</p>
				</div>
				<div>
					<h2 className="text-lg font-medium">Age Range Filter</h2>
					<DualSlider
						min={0}
						max={100}
						step={1}
						defaultLow={ageRange.min}
						defaultHigh={ageRange.max}
						onChange={(low, high) => setAgeRange({ min: low, max: high })}
						formatLabel={(value) => `${value} years`}
						rangeClassName="bg-purple-500"
						thumbClassName="border-purple-500 focus:ring-purple-500"
					/>
					<p className="mt-2 text-sm text-gray-600">
						Selected age: {ageRange.min} - {ageRange.max} years
					</p>
				</div>
			</div>
		</div>
	);
};

export default SliderTest;
