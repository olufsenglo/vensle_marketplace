
const Subscribe = () => {
   return(
    	<div className="bg-gray-600">
	    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        	<div className="mx-auto lg:mx-0 lg:flex lg:max-w-none">
          		<div className="lg:mt-0 lg:pr-8 lg:w-full lg:max-w-xs lg:flex-shrink-0">
        			<h2 className="text-2xl font-normal tracking-tight text-gray-900 uppercase">Vensle</h2>
	   		</div>
                	<div className="w-full">
	    			<h1 className="text-xl tracking-tight text-gray-900 sm:text-2xl">NEW TO VENSLE</h1>
	   			<p>Sign up for our newsletter</p>


		      <div className="mt-2">
			<input
			  id="email"
			  name="email"
			  type="email"
			  autoComplete="email"
			  required
			  //value={resetFormData.email} 
			  //onChange={handleResetInputChange}
			  className="block w-full rounded-md bg-gray-600 border-2 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			/>
		      </div>




			</div>
		</div>
	   </div>
      	</div>
   )
}

export default Subscribe;
