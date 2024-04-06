import barClothes from "assets/img/front/banner/bar_clothes_jpg.jfif";

const DeliverBanner = () => {
  return (
    <div className="z-1 relative bg-white">
      <div
        className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8"
        style={{ height: "30rem" }}
      >
        <div
          style={{ backgroundImage: `url(${barClothes})` }}
          className="flex h-full items-center bg-left lg:items-end lg:bg-center"
        >
          <div className="pr:0 ml-4 w-full pl-0 md:pr-8 lg:ml-0 lg:pl-[40%]">
            <h2
              style={{ color: "#a5141f" }}
              className="text-2xl font-normal uppercase tracking-tight text-white"
            >
              you stay at home
            </h2>

            <h2
              style={{
                fontSize: "4.2rem",
                color: "#a5141f",
                marginBottom: "3rem",
              }}
              className="mt-5 mb-7 font-bold uppercase tracking-tight text-white lg:mt-10"
            >
              WE DELIVER
            </h2>

            <h2
              style={{ color: "#a5141f" }}
              className="mb-0 text-right text-2xl font-normal tracking-tight text-white lg:mb-4"
            >
              Vensle Marketplace
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliverBanner;
