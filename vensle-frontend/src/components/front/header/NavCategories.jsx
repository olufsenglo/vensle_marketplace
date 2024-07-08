import { useState, useEffect, useRef, Fragment } from 'react'
import { Link } from "react-router-dom";
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import {
  XMarkIcon,
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline'

const solutions = [
  { name: 'Home Appliances', description: 'Fridges, Irons, Microwaves, Tvs', href: '/filter?searchTerm=&category_id=15', icon: ChartPieIcon },
  { name: 'Fashion', description: 'Dress shirts, Pants, Sweeters, Jeans', href: '/filter?searchTerm=&category_id=14', icon: CursorArrowRaysIcon },
  { name: 'Sporting Goods', description: "Cleats, Jerseys, Gloves", href: '/filter?searchTerm=&category_id=13', icon: FingerPrintIcon },
  { name: 'Computing', description: 'Laptops, Desktops', href: '/filter?searchTerm=&category_id=1', icon: SquaresPlusIcon },
  { name: 'Gadgets', description: 'Phones, Tablets,', href: '/filter?searchTerm=&category_id=2', icon: ArrowPathIcon },
]
const callsToAction = [
  { name: 'Requests', href: '#', icon: PlayCircleIcon },
  { name: 'Upload a product', href: '#', icon: PhoneIcon },
]

export default function NavCategories({ categories }) {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const categoryPopupRef = useRef(null);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setShowCategoryMenu(!!categoryPopupRef.current); // Toggle showTryMe based on presence of categoryPopupRef
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Popover className="flex">
      <Popover.Button onClick={() => setShowCategoryMenu(true)} className="inline-flex items-center gap-x-1 mt-[2px] lg:mt-0 lg:mb-3 leading-6">
        <Bars3Icon className="h-5 w-5" aria-hidden="true" />
        <span className="text-sm lg:font-medium" style={{textWrap: "nowrap"}}>All Categories</span>
      </Popover.Button>

	{showCategoryMenu && <XMarkIcon
	  onClick={() => setShowCategoryMenu(false)}
	  className="lg:hidden fixed w-8 h-8 top-[1rem] right-[1rem] z-[20] cursor-pointer rounded-full p-1 hover:bg-gray-200 transition-all ease-in-out duration-300"
	/>}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel ref={categoryPopupRef} className="fixed lg:absolute z-10 left-0 lg:left-[-10px] right-0 lg:right-auto bottom-0 lg:bottom-auto right-0 lg:right-auto top-0 lg:top-[2.5rem] lg:mt-5 flex lg:w-screen lg:max-w-max lg:px-4">
          <div className="w-full h-full lg:w-[86vw] lg:max-w-md flex-auto overflow-hidden lg:rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="pt-8 lg:pt-2 pb-4">
	      <h2 className="lg:hidden text-xl ml-8 font-semibold mb-2">Categories</h2>
              {categories.length > 0 ? categories.map((category) => (
                <div key={category.id} className="group px-8 py-2 border-b border-b-gray-200 relative flex rounded-lg hover:bg-gray-50">
                  <div>
                    <Link to={`/filter?searchTerm=&category_id=1`} className="font-semibold text-gray-900">
                      {category.name}
                      <span className="absolute inset-0" />
                    </Link>
                    <p className="mt-[-6px] lg:mr-[60%] text-[12px] line-clamp-1 text-gray-600">
			{category.subcategories?.map((subcategory) => 
				<span>{subcategory.name},{" "}</span>
			)}
		      ...
		    </p>
                  </div>
                </div>
              )) : <div className="py-2 px-8">Loading...</div>}
            </div>
            <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
              {callsToAction.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                >
                  <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
