import TopPurchases from "./TopPurchases";
import HomeSuggested from "../HomeSuggested";
import HomeSuggestedHomeTop from "../HomeSuggestedHomeTop";

import img5 from "../../images/img5.JPG";
import img6 from "../../images/img6.JPG";
import img7 from "../../images/img7.JPG";
import img8 from "../../images/img8.JPG";

const products = [
  {
    id: 1,
    name: 'Dell Computer',
    href: '#',
    price: '$48',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    location: 'london',
  },
  {
    id: 2,
    name: 'Iphone 13',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    location: 'london',
  },
  {
    id: 3,
    name: 'Asus Zenbook',
    href: '#',
    price: '$89',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    location: 'london',
  },
  {
    id: 4,
    name: 'Powerbank',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    location: 'london',
  },
  {
    id: 5,
    name: 'Apple watch',
    href: '#',
    price: '$48',
    imageSrc: img5,
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    location: 'london',
  },
  {
    id: 6,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc: img6,
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    location: 'london',
  },
  {
    id: 7,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    imageSrc: img7,
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 8,
    name: 'Iglass',
    href: '#',
    price: '$35',
    imageSrc: img8,
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    location: 'london',
  },    
  // More products...
]

export default function TopCategories()
{
    return(
        <div className="flex flex-col lg:flex-row mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <TopPurchases />
          <HomeSuggestedHomeTop />
        </div>
    )
}