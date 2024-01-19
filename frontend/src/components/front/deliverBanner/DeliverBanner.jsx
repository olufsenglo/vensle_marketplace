import barClothes from "assets/img/front/banner/bar_clothes_jpg.jfif";

const DeliverBanner = () => {
	return (
    <div className="bg-white relative z-1">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8" style={{"height":"30rem"}}>
      	<div 
		style={{backgroundImage:`url(${barClothes})`}}
		className="flex h-full bg-left lg:bg-center items-center lg:items-end" 
	>
	   <div className="pr:0 ml-4 lg:ml-0 md:pr-8 pl-0 lg:pl-[40%] w-full">
		<h2 style={{color: "#a5141f"}} className="text-2xl font-normal tracking-tight text-white uppercase">you stay at home</h2>
			
		<h2 style={{"fontSize":"4.2rem", color: "#a5141f", "marginBottom":"3rem"}} className="font-bold mt-5 lg:mt-10 mb-7 tracking-tight text-white uppercase">WE DELIVER</h2>

		<h2 style={{color: "#a5141f"}} className="text-2xl text-right font-normal tracking-tight mb-0 lg:mb-4 text-white">Vensle Marketplace</h2>
	   </div>


	</div>
      </div>
    </div>
	)
}

export default DeliverBanner
