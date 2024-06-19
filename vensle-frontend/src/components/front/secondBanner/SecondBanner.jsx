import store1 from "assets/img/front/second-banner/1.png"
import store2 from "assets/img/front/second-banner/2.png"

const SecondBanner = () => {
    return(
      <div className="relative bg-white">
         <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
	        <img src={store1} className="w-full" alt="store banner" />
	        <img src={store2} className="w-full hidden md:block" alt="store banner" />
	    </div>
	 </div>
      </div>
    )
}

export default SecondBanner;
