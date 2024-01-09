export default function StoreBanner() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
        <div style={{"height":"17rem"}} className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-8">
	  <div style={{"background":"brown"}}>
		  <div className="pl-9 flex flex-col justify-center bg-white" style={{"height":"100%", "width":"65%"}}>
		      <div className="flex items-center">
			  
	<svg className="h-10 w-10 mr-1 text-gray-600"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
	  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
	  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
	</svg>
			<div>
				<h2 className="text-2xl font-normal tracking-tight text-gray-900 uppercase">official</h2>
				<h2 className="text-2xl font-normal tracking-tight text-gray-900 uppercase">store</h2>
			</div>

		      </div>
		      <h1 className="mt-5 text-lg font-bold tracking-tight text-gray-900 sm:text-xl">All things groceries</h1>
		  </div>
	  </div>

	  <div style={{"background":"gold"}}>
		  <div className="pl-9 flex flex-col justify-center bg-white" style={{"height":"100%", "width":"65%"}}>
		      <div className="flex items-center">
			  
	<svg className="h-10 w-10 mr-1 text-gray-600"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
	  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
	  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
	</svg>
			<div>
				<h2 className="text-2xl font-normal tracking-tight text-gray-900 uppercase">official</h2>
				<h2 className="text-2xl font-normal tracking-tight text-gray-900 uppercase">store</h2>
			</div>

		      </div>
		      <h1 className="mt-5 text-lg font-bold tracking-tight text-gray-900 sm:text-xl">All things fashion</h1>
		  </div>
	  </div>

        </div>



      </div>
    </div>
  )
}
