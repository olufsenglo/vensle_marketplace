import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Dialog,
  RadioGroup,
  Transition,
  Disclosure,
  Menu,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/20/solid";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

const sortOptions = [
  { name: "Profile", href: "/admin/profile", current: false },
  { name: "Upload a product", href: "/admin/upload-product", current: false },
  { name: "Dashboard", href: "/admin/default", current: false },
  { name: "Logout", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AuthUserDropDownMenu = ({ user, handleTopNavClick }) => {
    return(
	  <Menu
	    as="div"
	    className="relative mr-2 inline-block text-left lg:hidden"
	  >
	    <div>
	      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
		Hello {user.name}
		<ChevronDownIcon
		  className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
		  aria-hidden="true"
		/>
	      </Menu.Button>
	    </div>

	    <Transition
	      as={Fragment}
	      enter="transition ease-out duration-100"
	      enterFrom="transform opacity-0 scale-95"
	      enterTo="transform opacity-100 scale-100"
	      leave="transition ease-in duration-75"
	      leaveFrom="transform opacity-100 scale-100"
	      leaveTo="transform opacity-0 scale-95"
	    >
	      <Menu.Items className="ring-black absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-opacity-5 focus:outline-none">
		<div className="py-1">
		  {sortOptions.map((option) => (
		    <Menu.Item key={option.name}>
		      {({ active }) => (
			<Link
			  to={option.href}
			  onClick={(e) =>
			    handleTopNavClick(e, option.name)
			  }
			  className={classNames(
			    option.current
			      ? "font-medium text-gray-900"
			      : "text-gray-500",
			    active ? "bg-gray-100" : "",
			    "block px-4 py-2 text-sm"
			  )}
			>
			  {option.name}
			</Link>
		      )}
		    </Menu.Item>
		  ))}
		</div>
	      </Menu.Items>
	    </Transition>
	  </Menu>
    )
}

export default AuthUserDropDownMenu;
