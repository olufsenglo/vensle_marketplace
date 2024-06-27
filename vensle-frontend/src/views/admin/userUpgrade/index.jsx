import { Link } from "react-router-dom";
import {
	ArrowLeftIcon,
} from "@heroicons/react/20/solid";

const UserUpgrade = () => {

	return (
		<div className="mt-3">
			<div className="pl-2">
				<div className="flex items-center">
					<Link to="/admin">
						<ArrowLeftIcon className="h-6 w-6 mr-2 cursor-pointer" />
					</Link>
					<h2 className="font-medium text-xl">Upgrade</h2>
				</div>
			</div>
			<div className="mt-6 col-span-5 py-6 px-5 bg-uDashSecondary flex justify-between items-center">
				Start here
			</div>
		</div>
	);
};

export default UserUpgrade;
