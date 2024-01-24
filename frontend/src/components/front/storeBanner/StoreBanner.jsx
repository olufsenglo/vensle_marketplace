import { HomeIcon } from '@heroicons/react/20/solid'

import store1 from "assets/img/front/banner/store1.jpg";
import store2 from "assets/img/front/banner/store2.jpg";


export default function StoreBanner() {
  return (
    <div className="bg-white relative">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
        <div style={{"height":"18rem"}} className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-8">
	  <div style={{backgroundImage:`url(${store2})`, backgroundPosition: 'right'}}>
		  <div className="pl-9 flex flex-col justify-center bg-white" style={{"height":"100%", "width":"40%"}}>
		      <div className="flex items-center">
			  
		<HomeIcon className="h-5 lg:h-10 w-5 lg:w-10 mr-2"/>
			<div>
				<h2 className="text-sm lg:text-2xl font-normal tracking-tight text-gray-900 uppercase">official</h2>
				<h2 className="text-sm lg:text-2xl font-normal tracking-tight text-gray-900 uppercase">store</h2>
			</div>

		      </div>
		      <h1 className="mt-5 text-sm md:text-lg font-normal lg:font-bold tracking-tight text-gray-900 sm:text-xl">All things groceries</h1>
		  </div>
	  </div>

	  <div style={{backgroundImage:`url(${store1})`, backgroundPosition: 'right'}}>
		  <div className="pl-9 flex flex-col justify-center bg-white" style={{"height":"100%", "width":"40%"}}>
		      <div className="flex items-center">
			  
		<HomeIcon className="h-5 lg:h-10 w-5 lg:w-10 mr-2"/>
			<div>
				<h2 className="text-sm lg:text-2xl font-normal tracking-tight text-gray-900 uppercase">official</h2>
				<h2 className="text-sm lg:text-2xl font-normal tracking-tight text-gray-900 uppercase">store</h2>
			</div>

		      </div>
		      <h1 className="mt-5 text-sm md:text-lg font-normal lg:font-bold tracking-tight text-gray-900 sm:text-xl">All things Fashion</h1>
		  </div>
	  </div>

        </div>



      </div>
    </div>
  )
}
