import { useState } from "react";
import { useSelector } from "react-redux";
import {
	ShoppingCartIcon,
} from '@heroicons/react/24/outline'

import CartDrawer from "./CartDrawer";
import cart from "assets/img/front/cart.PNG";

const CartLink = ({ visible }) => {
  const cartItems = useSelector((state) => state.cart.items);

  const [open, setOpen] = useState(false);

  const validCartItems = cartItems.filter(item => item && item && item.price);

  const totalItems = validCartItems.reduce(
    (total, item) => total + (item.quantity ? item.quantity : 0),
    0
  );

  const totalPrice = validCartItems.reduce((total, item) => {
    const productPrice = parseFloat(item.price);
    return total + productPrice;
  }, 0);

  function formatPrice(price) {
    return Number(parseFloat(price).toFixed(2)).toLocaleString('en', {
      minimumFractionDigits: 2
    });
  }

  const formattedTotalPrice = formatPrice(totalPrice);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="min-w-auto ml-0 flex relative cursor-pointer items-center justify-end md:ml-1 lg:ml-[20px] lg:min-w-[5.1rem]"
      >
        {totalItems > 0 && (
          <span
            style={{ top: "0", left: "16px", fontSize: "0.7rem" }}
            className="absolute w-[15px] h-[15px] flex items-center justify-center rounded-full bg-red-500 text-white"
          >
            {totalItems}
          </span>
        )}
	<ShoppingCartIcon className="w-[28px] h-[28px]" />
        <div className="justify-space-between mt-0 flex hidden h-full flex-col text-right lg:ml-[1px] lg:block">
          <p style={{ fontSize: "12px", fontWeight: "bold" }}>
            Your cart
          </p>
          <h2
            className="mt-0 text-right font-medium text-[#ff5959]"
            style={{ fontSize: "14px" }}
          >
            ${formattedTotalPrice}
          </h2>
        </div>
      </div>
      <CartDrawer open={open} setOpen={setOpen} />
    </>
  );
};

export default CartLink;
