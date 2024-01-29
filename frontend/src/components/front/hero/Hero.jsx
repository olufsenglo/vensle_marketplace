import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  };

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
    <div className="relative bg-white pt-4 md:pt-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Slider {...settings}>
          <div>
            <div className="mx-auto h-[439.9px] max-w-2xl lg:h-[539.9px] lg:max-w-7xl">
              <div
                className="flex h-full w-full items-end text-center md:items-center md:text-left"
                style={{ backgroundImage: `url(${slider1})` }}
              >
                <div className="mb-[5rem] w-full pr-8 pl-[10%] md:mb-0">
                  <h2
                    style={{ color: "red" }}
                    className="text-2xl font-normal tracking-tight text-white"
                  >
                    Enjoy 20% off
                  </h2>
                  <h2
                    style={{ fontSize: "2.4rem" }}
                    className="mt-2 mb-3 font-bold tracking-tight text-white text-gray-900"
                  >
                    Air Jordans 1
                  </h2>
                  <h2 className="w-full text-2xl font-normal tracking-tight text-white text-white md:w-[44%]">
                    Tne new and improved Air Jordans Launched here first
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
            <div className="mx-auto h-[439.9px] max-w-2xl lg:h-[539.9px] lg:max-w-7xl">
              <div
                className="flex h-full w-full items-end text-center md:items-center md:text-left"
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
                    style={{ fontSize: "2.4rem" }}
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
