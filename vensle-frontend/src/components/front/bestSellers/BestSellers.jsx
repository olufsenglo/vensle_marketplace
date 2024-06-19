import SwipeProducts from "components/front/swipeProducts/SwipeProducts"

const BestSellers = () => {
    return (
      <div className="relative bg-white">
         <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 lg:max-w-7xl lg:px-8">
	    <SwipeProducts title="Best Sellers" type="grocery" />
	</div>
      </div>
    )
}

export default BestSellers;
