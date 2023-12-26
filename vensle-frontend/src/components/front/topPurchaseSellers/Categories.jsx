import img1 from "assets/img/front/categories/img1.JPG";
import img2 from "assets/img/front/categories/img2.JPG";
import img3 from "assets/img/front/categories/img3.JPG";
import img4 from "assets/img/front/categories/img4.JPG";
import img5 from "assets/img/front/categories/img5.JPG";
import img6 from "assets/img/front/categories/img6.JPG";
import img7 from "assets/img/front/categories/img7.JPG";
import img8 from "assets/img/front/categories/img8.JPG";

const products = [
    {
      id: 1,
      name: 'Computing',
      href: '/filter?searchTerm=&category_id=15',
      imageSrc: img8,
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 2,
      name: 'Appliances',
      href: 'filter?searchTerm=&category_id=14',
      imageSrc: img2,
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 3,
      name: 'Electronics',
      href: 'filter?searchTerm=&category_id=13',
      imageSrc: img3,
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 4,
      name: 'Fashion',
      href: 'filter?searchTerm=&category_id=1',
      imageSrc: img7,
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 5,
      name: 'Sporting goods',
      href: 'filter?searchTerm=&category_id=2',
      imageSrc: img5,
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },
    {
      id: 6,
      name: 'Cosmetics',
      href: 'filter?searchTerm=&category_id=3',
      imageSrc: img6,
      imageAlt: "Front of men's Basic Tee in black.",
      price: '$35',
      color: 'Black',
    },                     
  ]

const ShopCategories = () => {
  const containerStyle = {
    bottom: '0',
    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(255, 255, 255, 0))',
  };

   return(
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        	<h2 style={{"borderBottom":"2px solid red", "display":"inline"}} className="text-2xl pb-1 font-normal tracking-tight text-gray-900 uppercase">Shop by categories</h2>



          <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-4 lg:grid-cols-6 xl:gap-x-6">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-sm bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>

<div className="w-full" style={containerStyle} className="mt-4 pb-6 pt-12 rounded-sm w-full absolute flex justify-between">

                  <div className="w-full">
                    <h3 style={{"color":"white"}} className="uppercase text-center font-medium text-white">
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
