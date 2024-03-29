import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import slider1 from "assets/img/front/hero/slider1.jpg";
import slider2 from "assets/img/front/hero/slider2.jpg";
import slider3 from "assets/img/front/hero/slider3.jpg";
import slider4 from "assets/img/front/hero/slider4.jpg";

const Hero = () => {
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
    <div className="hero__wrapper relative bg-white pt-4 lg:pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Slider {...settings}>

          <div>
            <div className="mx-auto h-[439.9px] max-w-2xl lg:h-[517px] lg:max-w-7xl">
              <div
                className="flex h-full w-full items-end text-center rounded-lg md:items-center md:text-left"
                style={{ backgroundImage: `url(${slider4})` }}
              >
                <div className="mb-[5rem] w-full pr-8 pl-[10%] md:mb-0">
                  <h2
                    style={{ color: "red", textShadow: "0 0 0 black" }}
                    className="text-2xl font-normal tracking-tight text-white"
                  >
                    Nationwide delivery
                  </h2>
                  <h2
                    style={{ fontSize: "2.4rem", textShadow: "1px 1px 1px white" }}
                    className="mt-2 mb-3 font-bold tracking-tight text-white text-gray-900"
                  >
                    From the farm straight to your doorstep
                  </h2>
                  <h2 className="w-full text-2xl font-normal tracking-tight text-white text-white md:w-[44%]">
	            Live the luxurious life you, without breaking the bank
                  </h2>

                  <button
                    type="submit"
                    style={{ fontSize: "0.8rem" }}
                    className="mt-6 rounded-lg bg-white py-2 px-8 font-semibold hover:bg-orange-500 hover:text-white"
                  >
                    SHOP NOW
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mx-auto h-[439.9px] max-w-2xl lg:h-[517px] lg:max-w-7xl">
              <div
                className="flex h-full w-full items-end text-center rounded-lg md:items-center md:text-left"
                style={{ backgroundImage: `url(${slider1})` }}
              >
                <div className="mb-[5rem] w-full pr-8 pl-[10%] md:mb-0">
                  <h2
                    style={{ color: "red", textShadow: "0 0 0 black" }}
                    className="text-2xl font-normal tracking-tight text-white"
                  >
                    Enjoy 20% off
                  </h2>
                  <h2
                    style={{ fontSize: "2.4rem", textShadow: "1px 1px 1px white" }}
                    className="mt-2 mb-3 font-bold tracking-tight text-white text-gray-900"
                  >
                    Air Jordans 1
                  </h2>
                  <h2 className="w-full text-2xl font-normal tracking-tight text-white text-white md:w-[44%]">
                    The new and improved Air Jordans Launched here first
                  </h2>

                  <button
                    type="submit"
                    style={{ fontSize: "0.8rem" }}
                    className="mt-6 rounded-lg bg-white py-2 px-8 font-semibold hover:bg-orange-500 hover:text-white"
                  >
                    SHOP NOW
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="mx-auto h-[439.9px] max-w-2xl lg:h-[517px] lg:max-w-7xl">
              <div
                className="flex h-full w-full items-end text-center rounded-lg md:items-center md:text-left"
                style={{ backgroundImage: `url(${slider2})` }}
              >
                <div className="mb-[5rem] w-full pr-8 pl-[10%] md:mb-0">
                  <h2
                    style={{ color: "red" }}
                    className="text-2xl font-normal tracking-tight text-white"
                  >
                    Enjoy 70% off
                  </h2>
                  <h2
                    style={{ fontSize: "2.4rem", textShadow: "1px 1px 1px white" }}
                    className="mt-2 mb-3 font-bold tracking-tight text-white text-gray-900"
                  >
                    Bath and Kitchen works
                  </h2>
                  <h2 className="w-full text-2xl font-normal tracking-tight text-white text-white md:w-[44%]">
	            Live the luxurious life you, without breaking the bank
                  </h2>

                  <button
                    type="submit"
                    style={{ fontSize: "0.8rem", textShadow: "0 0 0 black" }}
                    className="mt-6 rounded-lg bg-white py-2 px-8 font-semibold hover:bg-orange-500 hover:text-white"
                  >
                    SHOP NOW
                  </button>
                </div>
              </div>
            </div>
          </div>


          <div>
            <div className="mx-auto h-[439.9px] max-w-2xl lg:h-[517px] lg:max-w-7xl">
              <div
                className="flex h-full w-full items-end text-center rounded-lg md:items-center md:text-left"
                style={{ backgroundImage: `url(${slider3})` }}
              >
                <div className="mb-[5rem] w-full pr-8 pl-[10%] md:mb-0">
                  <h2
                    style={{ color: "red", textShadow: "0 0 0 black" }}
                    className="text-2xl font-normal tracking-tight text-white"
                  >
                    Enjoy 70% off
                  </h2>
                  <h2
                    style={{ fontSize: "2.4rem", textShadow: "1px 1px 1px white" }}
                    className="mt-2 mb-3 font-bold tracking-tight text-white text-gray-900"
                  >
                    Tesla Filtered
                  </h2>
                  <h2 className="w-full text-2xl font-normal tracking-tight text-white text-white md:w-[44%]">
                    Get it here, the Tesla Filtered Water 3000
                  </h2>

                  <button
                    type="submit"
                    style={{ fontSize: "0.8rem" }}
                    className="mt-6 rounded-lg bg-white py-2 px-8 font-semibold hover:bg-orange-500 hover:text-white"
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
