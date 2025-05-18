import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import Carousel from "../components/Carousel";
import BackButton from "./BackButton";

const CarouselTest = () => {
	// Example slides with images
	const imageSlides = [
		{
			id: 1,
			content: (
				<div className="relative w-full h-[400px]">
					<img
						src="https://tecdn.b-cdn.net/img/new/slides/041.jpg"
						alt="Slide 1"
						className="object-cover overflow-hidden w-full h-full"
					/>
					<div className="absolute inset-0 flex items-center justify-center bg-black/20 p-4">
						<div className="text-center">
							<h2 className="text-3xl font-bold text-white">
								Welcome to our site
							</h2>
							<p className="mt-2 text-white">
								Discover amazing products and services
							</p>
						</div>
					</div>
				</div>
			),
		},
		{
			id: 2,
			content: (
				<div className="relative w-full h-[400px]">
					<img
						src="https://fastly.picsum.photos/id/20/3670/2462.jpg?hmac=CmQ0ln-k5ZqkdtLvVO23LjVAEabZQx2wOaT4pyeG10I"
						alt="Slide 1"
						className="object-cover overflow-hidden w-full h-full"
					/>
					<div className="absolute inset-0 flex items-center justify-center bg-black/20 p-4">
						<div className="text-center">
							<h2 className="text-3xl font-bold text-white">Special Offers</h2>
							<p className="mt-2 text-white">
								Limited time deals you don't want to miss
							</p>
						</div>
					</div>
				</div>
			),
		},
		{
			id: 3,
			content: (
				<div className="relative w-full h-[400px]">
					<img
						src="https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0"
						alt="Slide 1"
						className="object-cover overflow-hidden w-full h-full"
					/>
					<div className="absolute inset-0 flex items-center justify-center bg-black/20 p-4">
						<div className="text-center">
							<h2 className="text-3xl font-bold text-white">
								Join Our Community
							</h2>
							<p className="mt-2 text-white">
								Connect with like-minded individuals
							</p>
						</div>
					</div>
				</div>
			),
		},
	];

	// Example slides with content cards
	const contentSlides = [
		{
			id: 1,
			content: (
				<div className="flex h-[300px] items-center justify-center bg-rose-100 p-8">
					<div className="max-w-md text-center">
						<h3 className="text-2xl font-bold text-rose-800">
							Customer Testimonials
						</h3>
						<p className="mt-4 text-rose-700">
							"This product changed my life! I can't imagine going back to the
							way things were before."
						</p>
						<p className="mt-2 font-medium text-rose-800">- Sarah Johnson</p>
					</div>
				</div>
			),
		},
		{
			id: 2,
			content: (
				<div className="flex h-[300px] items-center justify-center bg-emerald-100 p-8">
					<div className="max-w-md text-center">
						<h3 className="text-2xl font-bold text-emerald-800">Our Mission</h3>
						<p className="mt-4 text-emerald-700">
							"We strive to create products that make a difference in people's
							lives while respecting our planet."
						</p>
						<p className="mt-2 font-medium text-emerald-800">- Our Founder</p>
					</div>
				</div>
			),
		},
		{
			id: 3,
			content: (
				<div className="flex h-[300px] items-center justify-center bg-amber-100 p-8">
					<div className="max-w-md text-center">
						<h3 className="text-2xl font-bold text-amber-800">Our Values</h3>
						<p className="mt-4 text-amber-700">
							"Innovation, integrity, and customer satisfaction are at the core
							of everything we do."
						</p>
						<p className="mt-2 font-medium text-amber-800">- Leadership Team</p>
					</div>
				</div>
			),
		},
	];

	return (
		<div className="mx-4 space-y-4 min-h-screen">
			<div className="h-2" />
			<BackButton />
			<h1 className="text-center font-bold text-2xl md:text-4xl">
				Carousel Component
			</h1>
			<section className="mb-12">
				<h2 className="mb-4 text-xl font-semibold">
					Image Carousel with Captions
				</h2>
				<Carousel slides={imageSlides} autoPlay={true} interval={5000} />
			</section>
			<section className="mb-12">
				<h2 className="mb-4 text-xl font-semibold">Content Card Carousel</h2>
				<Carousel slides={contentSlides} showArrows={true} />
			</section>
			<section>
				<h2 className="mb-4 text-xl font-semibold">
					Custom Carousel (No Auto-play, No Infinite Loop)
				</h2>
				<Carousel
					slides={imageSlides.slice(0, 2)}
					autoPlay={false}
					infinite={false}
					className="max-w-2xl mx-auto justify-center"
				/>
			</section>
			<section className="mb-12">
				<h2 className="mb-4 text-xl font-semibold">
					Custom Carousel (Arrows, Indicators)
				</h2>
				<Carousel
					slides={contentSlides}
					showArrows={true}
					indicatorClass={"w-3 h-3 bg-black"}
					indicatorSelectedClass={"w-3 h-3 bg-black/50 hover:bg-black/80"}
					leftArrow={
						<div className="relative w-6 h-6">
							{" "}
							<FaCaretLeft className="absolute w-6 h-6 -left-0.5" />{" "}
						</div>
					}
					rightArrow={
						<div className="relative w-6 h-6">
							{" "}
							<FaCaretRight className="absolute w-6 h-6 -right-0.5" />{" "}
						</div>
					}
				/>
			</section>
		</div>
	);
};

export default CarouselTest;
