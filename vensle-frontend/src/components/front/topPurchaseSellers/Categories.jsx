import { Link } from "react-router-dom";

import img2 from "assets/img/front/suggested_categories/2.webp";
import img3 from "assets/img/front/suggested_categories/3.jpg";
import img5 from "assets/img/front/suggested_categories/5.jpg";
import img6 from "assets/img/front/suggested_categories/6.jpg";
import img7 from "assets/img/front/suggested_categories/8.jpg";
import img8 from "assets/img/front/suggested_categories/7.jpg";

const products = [
  {
    id: 1,
    name: "Computing",
    href: "/filter?searchTerm=&category_id=15",
    imageSrc: img8,
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 2,
    name: "Appliances",
    href: "filter?searchTerm=&category_id=14",
    imageSrc: img2,
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 3,
    name: "Electronics",
    href: "filter?searchTerm=&category_id=13",
    imageSrc: img3,
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 4,
    name: "Fashion",
    href: "filter?searchTerm=&category_id=1",
    imageSrc: img7,
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 5,
    name: "Sporting goods",
    href: "filter?searchTerm=&category_id=2",
    imageSrc: img5,
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 6,
    name: "Cosmetics",
    href: "filter?searchTerm=&category_id=3",
    imageSrc: img6,
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
];

const ShopCategories = () => {
  const containerStyle = {
    bottom: "0",
    background:
      "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(255, 255, 255, 0))",
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
      <h2
        style={{ borderBottom: "2px solid red" }}
        className="block pb-1 text-center text-xl font-normal uppercase tracking-tight text-gray-900 md:inline md:text-left md:text-2xl"
      >
        Shop by categories
      </h2>

      <div className="mt-6 grid min-h-[10rem] min-h-[5rem] grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 md:mt-10 lg:grid-cols-6 lg:gap-x-8">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <Link to={product.href}>
              <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-[0.3rem] bg-gray-200 group-hover:opacity-75 lg:h-[13rem]">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>

              <div
                style={containerStyle}
                className="absolute mt-4 flex w-full justify-between rounded-[0.3rem] pb-2 pt-12 md:pb-6"
              >
                <div className="w-full">
                  <h3 className="text-center text-sm font-medium uppercase text-white text-white">
                    {product.name}
                  </h3>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopCategories;
