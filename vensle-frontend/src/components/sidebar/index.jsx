/* eslint-disable */

import { Link } from 'react-router-dom';
import { HiX } from "react-icons/hi";
import Links from "./components/Links";

import routes from "routes.js";

const Sidebar = ({ open, onClose }) => {
  return (
    <div
      className={`sm:none duration-175 linear h-[100vh] overflow-y-auto fixed !z-50 flex min-h-full flex-col bg-[#0b1539] pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute text-white top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`ml-[26px] mr-[30px] mt-[50px] flex items-center`}>
        <Link to='/' className="mt-1 ml-1 h-2.5 font-poppins text-[26px] font-medium uppercase text-[#bcc4f2] dark:text-white">
          VENSLE <span className="font-light">MARKET</span>
        </Link>
      </div>
      <div className="mt-[48px] mb-[12px] h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={routes} />
      </ul>

      {/* Nav item end */}
    </div>
  );
};

export default Sidebar;
