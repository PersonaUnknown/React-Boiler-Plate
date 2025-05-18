import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AccordionTest from "./examples/AccordionTest";
import CarouselTest from "./examples/CarouselTest";
import DrawerTest from "./examples/DrawerTest";
import DropdownTest from "./examples/DropdownTest";
import ExampleHub from "./examples/ExampleHub";
import ModalTest from "./examples/ModalTest";
import PopupTest from "./examples/PopupTest";
import SliderTest from "./examples/SliderTest";
function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<ExampleHub />} />
				<Route path="/modal" element={<ModalTest />} />
				<Route path="/popup" element={<PopupTest />} />
				<Route path="/slider" element={<SliderTest />} />
				<Route path="/carousel" element={<CarouselTest />} />
				<Route path="/accordion" element={<AccordionTest />} />
				<Route path="/dropdown" element={<DropdownTest />} />
				<Route path="/drawer" element={<DrawerTest />} />
			</Routes>
		</Router>
	);
}

export default App;
