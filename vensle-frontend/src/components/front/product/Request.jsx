import {
	HeartIcon,
	MapPinIcon,
	ClockIcon,
	TruckIcon,
} from "@heroicons/react/20/solid";

const NewTopRequests = ({ image="assets/img/front/temp/2.jpg" }) => {
	return (
		<div className="relative bg-gray-100/50 rounded-md border border-gray-200 lg:border-0 lg:bg-white lg:hover:bg-gray-200/70 text-left cursor-pointer">
			<div className="absolute left-0 top-3 left-3 flex bg-white lg:border rounded-md border-primaryColor py-[0.2rem] px-2">
				<TruckIcon className="h-[0.9rem] w-[0.9rem] lg:h-5 lg:w-5 text-primaryColor mr-2" />
				<p className="text-primaryColor text-[10px] lg:text-sm">Request</p>
			</div>
			<div className="absolute cursor-pointer bg-gray-100 hover:bg-gray-300 top-2 right-3 flex justify-center items-center h-6 w-6 rounded-full">
				<HeartIcon className="h-4 w-4" />
			</div>
			<img
				src={image}
				alt="Request"
				className="h-full w-full !h-[10rem] lg:!h-[18rem] rounded-md object-cover object-center group-hover:opacity-75"
			/>

			<div className="p-2 lg:py-4 lg:px-7">
				<h1
					className="font-medium text-sm lg:text-[1.4rem] line-clamp-1 mt-2 text-xl tracking-tight"
				>
					Need a wall art for my living room
				</h1>
				<div className="mt-2 lg:mt-4">
					<ul className="text-sm lg:text-base list-disc ml-6">
						<li className="">I'm a white make who lives in a pretty huge apartment</li>
						<li className="">I'd love to have a painting like this in my living room to give it some life</li>
					</ul>
				</div>

				<div className="mt-1 lg:mt-4 flex justify-between flex-col lg:flex-row">
					<div className="flex items-center pt-2 text-gray-600">
						<ClockIcon className="h-3 w-3 mr-1" />
						<p className="text-xs md:text-sm">Requested 11 hours ago</p>
					</div>
					<div className="flex items-center mt-1 lg:mt-2 text-gray-600">
						<MapPinIcon className="h-3 w-3 mr-1" />
						<p className="text-xs md:text-sm">The underground, London</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NewTopRequests;
