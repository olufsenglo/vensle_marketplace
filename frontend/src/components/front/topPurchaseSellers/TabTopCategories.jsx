import img1 from "assets/img/front/suggested_categories/premium-steak.webp";
import img2 from "assets/img/front/suggested_categories/prepped-and-ready-tile.webp";
import img3 from "assets/img/front/suggested_categories/fast-and-easy.webp";
import img4 from "assets/img/front/suggested_categories/wellness.webp";
import img5 from "assets/img/front/suggested_categories/vegetarian.webp";
import img6 from "assets/img/front/suggested_categories/family-friendly.webp";
import img7 from "assets/img/front/suggested_categories/desserts.webp";
import img8 from "assets/img/front/suggested_categories/ready-to-cook.webp";

const products = [
    {
      id: 1,
      name: 'Fruits & Vegetables',
      href: '/filter?searchTerm=&category_id=15',
      imageSrc: img3,
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 2,
      name: 'Beverages',
      href: 'filter?searchTerm=&category_id=14',
      imageSrc: img5,
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 3,
      name: 'Nuts',
      href: 'filter?searchTerm=&category_id=13',
      imageSrc: img8,
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 4,
      name: 'Nuts',
      href: 'filter?searchTerm=&category_id=1',
      imageSrc: img6,
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 5,
      name: 'Cooking oils',
      href: 'filter?searchTerm=&category_id=2',
      imageSrc: img7,
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 6,
      name: 'Cereals',
      href: 'filter?searchTerm=&category_id=3',
      imageSrc: img2,
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },                     
  ]

  const containerStyle = {
    bottom: '0',
    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(255, 255, 255, 0))',
  };

const ShopCategories = () => {
   return(
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">

        	<h2 style={{"borderBottom":"2px solid red" }} className="text-xl md:text-2xl block md:inline text-center md:text-left pb-1 font-normal tracking-tight text-gray-900 uppercase">Hottest categories</h2>


          <div className="mt-6 min-h-[10rem] md:mt-10 grid grid-cols-3 gap-x-4 gap-y-8 sm:grid-cols-4 min-h-[5rem] lg:grid-cols-6 lg:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-[0.3rem] bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-[13rem]">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
<div className="w-full" style={containerStyle} className="mt-4 pb-2 md:pb-6 pt-12 rounded-[0.3rem] w-full absolute flex justify-between">
                  <div className="w-full">
                    <h3 style={{"color":"white"}} className="uppercase text-center font-medium text-gray-900">
                      <a href={product.href}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>


	</div>
   )
}

export default ShopCategories;
