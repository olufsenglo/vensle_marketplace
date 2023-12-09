import { StarIcon } from '@heroicons/react/20/solid'
import img7 from "../../images/img7.JPG";


const product = {
    name: 'Ipason Macbook P1 Pro',
    price: '$192',
    rating: 3.9,
    reviewCount: 117,
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg',
    imageAlt: 'Two each of gray, white, and black shirts arranged on table.',
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
    ],
    sizes: [
        { name: 'XXS', inStock: true },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: 'XXL', inStock: true },
        { name: 'XXXL', inStock: false },
    ],
    location: 'London',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function TopPurchase()
{
    return(
        <div style={{ "width": "32rem" }}>
                {/* <a onClick={handleProductQuickView} key={product.id} href={product.href} className="group"> */}
                <a key={product.id} href={product.href} className="group">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                        src={img7}
                        alt="temp alt"
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-gray-900 whitespace-nowrap overflow-hidden overflow-ellipsis">
                        {product.name}
                    </h3>

                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            product.rating > rating ? 'text-gray-900' : 'text-gray-200',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <div className="mt-1 flex justify-between items-center">
                        <p className="mt-1 text-sm text-gray-700">{product.price}</p>
                        <p className="text-sm font-medium text-gray-900">{product.location}</p>
                    </div>
                </a>            
        </div>
    )
}