import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "actions/actions";

import { StarIcon } from "@heroicons/react/20/solid";

import PreviewPopup from "./PreviewPopup";

export default function Grocery({ product }) {
  const baseURL = "https://nominet.vensle.com/backend";
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductQuickView = (e, product) => {
    e.preventDefault();
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const getImagePath = (product) => {
    return `${baseURL}/uploads/${product.name}`;
  };

  return (
    <>
      {selectedProduct && (
        <PreviewPopup
          open={open}
          setOpen={setOpen}
          selectedProduct={selectedProduct}
        />
      )}

      <a
        onClick={(e) => handleProductQuickView(e, product)}
        key={product.id}
        href="#"
        style={{ background: "#eee" }}
        className="group"
      >
        <div className="aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 w-full overflow-hidden rounded-lg bg-gray-200">
          <a class="relative flex overflow-hidden rounded-xl lg:h-40" href="#">
            {console.log(product)}
            <img
              class="peer absolute top-0 right-0 h-full w-full object-cover group-hover:opacity-75"
              src={product.display_image && getImagePath(product.display_image)}
              alt={product.name}
            />
            {product.images && product.images[1] ? (
              <img
                className="peer absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
                src={getImagePath(product.images[1])}
                alt="product image"
              />
            ) : (
              ""
            )}
          </a>
        </div>

        <div className="py-1 px-2">
          <h2
            className="text-lg font-medium text-gray-900"
            style={{ fontWeight: "500", fontSize: "0.95rem" }}
          >
            {product.name}
          </h2>

          <div className="mb-1 flex justify-between">
            <div className="flex flex-col justify-between">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className="mr-1 h-3 w-3 flex-shrink-0 text-orange-900"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p
                className="mt-1 text-sm font-medium text-orange-900"
                style={{ fontSize: "0.75rem" }}
              >
                ${product.price}
              </p>
            </div>

            <button
              type="submit"
              onClick={() => handleAddToCart(product)}
              style={{ fontSize: "0.8rem" }}
              className="bg-transparent hover:border-transparent rounded border border-orange-500 py-1 px-2 font-semibold text-orange-500 hover:bg-orange-500 hover:text-white"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </a>
    </>
  );
}
