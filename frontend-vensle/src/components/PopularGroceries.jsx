import { StarIcon } from '@heroicons/react/20/solid'

import img5 from "../images/img5.JPG";

const products = [
    {
      id: 1,
      name: 'Dell Computer',
      href: '#',
      price: '$48',
      rating: 2,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
      color: 'Black',
    },
    {
      id: 2,
      name: 'Iphone 13',
      href: '#',
      price: '$35',
      rating: 2.5,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
      imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
      color: 'Black',
    },
    {
      id: 3,
      name: 'Asus Zenbook',
      href: '#',
      price: '$89',
      rating: 3.8,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
      imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
      color: 'Black',
    },
    {
      id: 4,
      name: 'Powerbank',
      href: '#',
      price: '$35',
      rating: 1,
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
      color: 'Black',
    },
    {
      id: 5,
      name: 'Apple watch',
      href: '#',
      price: '$48',
      rating: 2,
      imageSrc: img5,
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
      color: 'Black',
    },   
    // More products...
  ]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function PopularGroceries() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-normal tracking-tight text-gray-900 uppercase">most poplar in groceries</h2>


        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
          {products.map((product) => (
            <a key={product.id} href={product.href} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">{product.name}</h3>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      product.rating > rating ? 'text-orange-900' : 'text-orange-200',
                      'h-5 w-5 flex-shrink-0'
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div className="mt-1 flex justify-between items-center">
                <p className="text-md font-medium text-orange-900">{product.price}</p>

                <div>
                  <h3 className="text-sm text-gray-700">
                  <button
                    type="submit"
                    className="bg-transparent hover:bg-orange-500 text-orange-500 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded"
                    // className="rounded-md uppercase bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                    add to cart
                  </button>
                  </h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}