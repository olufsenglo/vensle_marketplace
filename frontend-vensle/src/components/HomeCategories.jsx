import img1 from "../images/img1.JPG";
import img2 from "../images/img2.JPG";
import img3 from "../images/img3.JPG";
import img4 from "../images/img4.JPG";
import img5 from "../images/img5.JPG";
import img6 from "../images/img6.JPG";
import img7 from "../images/img7.JPG";
import img8 from "../images/img8.JPG";

const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: img7,
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    imageSrc: img6,
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '#',
    imageSrc: img5,
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 4,
    name: 'Basic Tee',
    href: '#',
    imageSrc: img4,
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 5,
    name: 'Basic Tee',
    href: '#',
    imageSrc: img3,
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 6,
    name: 'Basic Tee',
    href: '#',
    imageSrc: img2,
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
]

export default function HomeCategories() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-normal tracking-tight text-gray-900 uppercase">Shop by categories</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-6 xl:gap-x-6">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-sm bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-50">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700">
                    <a href={product.href}>
                      {product.name}
                    </a>
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}