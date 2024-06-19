import bannerImage from "assets/img/front/first-banner/1.png"

const FirstBanner = () => {
    return(
      <div className="relative bg-white">
         <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:max-w-7xl lg:px-8">
	    <img className="w-full" src={bannerImage} alt="Banner" />
	 </div>
      </div>
    )
}

export default FirstBanner
