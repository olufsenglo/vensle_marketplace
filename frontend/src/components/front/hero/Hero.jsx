import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import slider1 from "assets/img/front/hero/slider1.jpg";
import slider2 from "assets/img/front/hero/slider2.jpg";


const Hero = () => {

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  return (
    <div className="bg-white relative pt-4 md:pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Slider {...settings}>
            <div>
	      <div className="mx-auto max-w-2xl lg:max-w-7xl lg:h-[569.9px]" style={{"height":"569.69px"}}>
		<div className="flex text-center md:text-left items-end md:items-center w-full h-full" style={{backgroundImage:`url(${slider1})`}}>

		     <div className="pr-8 w-full pb-16 md:mb-0 pl-[7%]">
			
			  <h2 style={{"color":"red"}} className="text-2xl font-normal tracking-tight text-white">Enjoy 20% off</h2>
			  <h2 style={{"fontSize":"2.4rem"}} className="text-white font-bold mt-2 mb-3 tracking-tight text-gray-900">Air Jordans 1</h2>
			  <h2 className="text-2xl text-white w-full md:w-[44%] font-normal tracking-tight text-white">Tne new and improved Air Jordans Launched here first</h2>

			  <button
			    type="submit"
			    style={{"fontSize":"0.8rem"}}
			    className="mt-6 bg-white hover:bg-orange-500 font-semibold hover:text-white py-2 px-8 rounded-lg"
			    >
			    SHOP NOW
			  </button>

		     </div>
		</div>
	      </div>

            </div>



            <div>
	      <div className="mx-auto max-w-2xl lg:max-w-7xl lg:h-[569.9px]" style={{"height":"569.69px"}}>
		<div className="flex text-center md:text-left items-end md:items-center w-full h-full" style={{backgroundImage:`url(${slider2})`}}>

		     <div className="pr-8 w-full pb-16 md:mb-0 pl-[7%]">
			
			  <h2 style={{"color":"red"}} className="text-2xl font-normal tracking-tight text-white">Enjoy 70% off</h2>
			  <h2 style={{"fontSize":"2.4rem"}} className="text-white font-bold mt-2 mb-3 tracking-tight text-gray-900">Tesla Filtered</h2>
			  <h2 className="text-2xl text-white w-full md:w-[44%] font-normal tracking-tight text-white">Get it here, the Tesla Filtered Water 3000</h2>

			  <button
			    type="submit"
			    style={{"fontSize":"0.8rem"}}
			    className="mt-6 bg-white hover:bg-orange-500 font-semibold hover:text-white py-2 px-8 rounded-lg"
			    >
			    SHOP NOW
			  </button>

		     </div>
		</div>
	      </div>

            </div>
        </Slider>
      </div>
    </div>
  );
};

export default Hero;
