import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const BackButton = () => {
	// Navigation
	const navigate = useNavigate();
	const backToHome = (): void => {
		navigate("/");
	};
	// Render
	return (
		<button
			type="button"
			onClick={backToHome}
			className="flex flex-row gap-2 text-white px-4 py-2 bg-[#505081] hover:bg-[#0F0E47] rounded-full items-center text-base md:text-2xl cursor-pointer"
		>
			<IoMdArrowRoundBack className="text-xl md:text-4xl" />
			Back
		</button>
	);
};

export default BackButton;
