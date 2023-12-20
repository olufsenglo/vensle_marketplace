const products = [
  {
    id: 1,
    name: 'Earthen Bottle',
    href: '#',
    price: '$48',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
]

export default function TopRequests() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold mb-7 tracking-tight text-gray-900 uppercase">TOP REQUESTS</h2>

        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-8">
          {products.map((product) => (
            <a key={product.id} href={product.href} className="group">
<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>

<div className="py-5 px-7">
	<h1 className="mt-2 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Need a wall art for my living room</h1>
	<div className="mt-4">
            <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
              <li className="text-lg"><span className="text-gray-600">Im a white make who lives in a pretty huge apartment</span></li>
              <li className="text-lg"><span className="text-gray-600">Id love to have a painting like this form my living roomto give it some life</span></li>
            </ul>
          </div>

<div className="flex mt-6">
			<p className="text-xs flex items-center text-black-200 font-medium text-gray-700 mr-4" style={{"color":"#aaa"}}>
		  	

<svg className="h-4 w-4 mr-2 text-gray-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>
		  		Requested 11 hours ago
		  	</p>
			<p className="text-xs flex items-center text-black-200 font-medium text-gray-700" style={{"color":"#aaa"}}>
		  	
<svg className="h-4 w-4 mr-1 text-gray-600"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
</svg>
		  		London
		  	</p>
</div>

</div>

            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
