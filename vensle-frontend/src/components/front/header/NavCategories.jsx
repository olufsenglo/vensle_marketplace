import { Fragment } from 'react'
import { Link } from "react-router-dom";
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import {
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

export default function NavCategories() {
  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 mt-[2px] leading-6">
        <Bars3Icon className="h-5 w-5" aria-hidden="true" />
        <span className="font-medium">All Categories</span>
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-10 mt-5 flex w-screen max-w-max px-4">
          <div className="w-[86vw] max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {solutions.map((item) => (
                <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                  <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                  </div>
                  <div>
                    <Link to={item.href} className="font-semibold text-gray-900">
                      {item.name}
                      <span className="absolute inset-0" />
                    </Link>
                    <p className="mt-1 text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
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
