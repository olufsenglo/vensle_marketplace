import {
  HeartIcon,
  MapPinIcon,
  ClockIcon,
  TruckIcon,
} from "@heroicons/react/20/solid";

import two from "assets/img/front/temp/2.jpg"

const NewTopRequests = () => {
  return (
              <div className="relative hover:bg-gray-200/70 text-left cursor-pointer">
		<div className="absolute left-0 top-3 left-3 flex bg-white border rounded-md border-primaryColor py-[0.2rem] px-2">
			<TruckIcon className="h-5 w-5 text-primaryColor mr-2" />
			<p className="text-primaryColor text-sm">Request</p>
		</div>
		<div className="absolute cursor-pointer bg-gray-100 hover:bg-gray-300 top-2 right-3 flex justify-center items-center h-9 w-9 rounded-full">
			<HeartIcon className="h-6 w-6" />
		</div>
		<img
			src={two}
			alt="Request"
			className="h-full w-full !h-[10rem] lg:!h-[18rem] rounded-md object-cover object-center group-hover:opacity-75"
		/>

		<div className="py-4 px-7">
		  <h1
		    style={{ fontSize: "1.4rem" }}
		    className="font-medium line-clamp-1 mt-2 text-xl tracking-tight"
		  >
		    Need a wall art for my living room
		  </h1>
		  <div className="mt-4">
		    <ul className="list-disc ml-6">
			<li>I'm a white make who lives in a pretty huge apartment</li>
			<li>I'd love to have a painting like this in my living room to give it some life</li>
		    </ul>
		  </div>

		  <div className="mt-4 flex justify-between flex-col lg:flex-row">
		    <div className="flex items-center pt-2 text-gray-600">
			<ClockIcon className="h-3 w-3 mr-1" />
			<p className="text-xs md:text-sm">Requested 11 hours ago</p>
		    </div>
		    <div className="flex items-center pt-2 text-gray-600">
			<MapPinIcon className="h-3 w-3 mr-1" />
			<p className="text-xs md:text-sm">London</p>
		    </div>
		  </div>
	       	</div>
	      </div>
  );
}

export default NewTopRequests;
