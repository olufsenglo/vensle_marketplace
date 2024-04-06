import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "actions/actions";

import { StarIcon } from "@heroicons/react/20/solid";

import PreviewPopup from "components/front/previewPopup/PreviewPopup";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const baseURL = "https://nominet.vensle.com/backend";

export default function Grocery({ product, wrapper, lineClamp = 1, custom, listView, btnSize }) {
  const displayImageId = product?.display_image?.id;
  if (product.images?.length > 0 && displayImageId) {
    // Find the index of the display_image in the images array
    const displayImageIndex = product.images.findIndex(
      (img) => img.id === displayImageId
    );

    // Rearrange the images array if display_image is found
    const rearrangedImages =
      displayImageIndex !== -1
        ? [
            product.images[displayImageIndex],
            ...product.images.slice(0, displayImageIndex),
            ...product.images.slice(displayImageIndex + 1),
          ]
        : product.images;

    // Update the product object with rearranged or unchanged images
    product = {
      ...product,
      images: rearrangedImages,
    };
  }

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);


function formatPrice(price) {
  return Number(parseFloat(price).toFixed(2)).toLocaleString('en', {
    minimumFractionDigits: 2
  });	
}

  const handleProductQuickView = (e, product) => {
    e.preventDefault();
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
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

      <div
        key={product.id}
        style={{ background: "#f4f4f4a3" }}
        className={`group h-full flex rounded-lg ${
          listView === "list" ? "flex-row" : "flex-col"
        }`}
      >
        <div
          onClick={(e) => handleProductQuickView(e, product)}
          className={`aspect-h-1 aspect-w-1 xl:aspect-h-8 xl:aspect-w-7 overflow-hidden rounded-lg bg-gray-200 ${
            listView === "list" ? "" : "w-full flex-1"
          }`}
        >
          <div
            className={`relative flex h-full min-h-[6rem] w-full cursor-pointer overflow-hidden rounded-xl ${
	      wrapper === 'slick' ? 'h-full' : (custom === 'height' ? `lg:h-[10rem]` : "lg:h-40")}
	      ${listView === "list" ? " w-40" : ""}`
	    }>
            <img
              className="peer absolute top-0 right-0 h-full w-full object-cover group-hover:opacity-75"
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
          </div>
        </div>

        <div
          className={`p-2 ${
            listView === "list" && "flex flex-1 flex-col items-start px-4 py-2"
          }`}
        >
          <h2
            className={`text-lg font-medium text-gray-900 line-clamp-${lineClamp} ${
		lineClamp > 1 && "text-base mt-2 leading-5 min-h-[3rem]"
	    }`}
            style={{ fontWeight: "500", fontSize: "0.95rem" }}
          >
            {product.name}
          </h2>

          <div
            className={`mb-1 flex flex-col justify-between ${
              listView === "list" ? "flex-1" : "md:flex-row "
            }`}
          >
            <div className="flex flex-col justify-between">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      product.ratings > rating
                        ? "text-orange-900"
                        : "text-orange-200",
                      "h-3 w-3 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="mt-1 text-sm text-red-600">
                {product.currency} {formatPrice(product.price)}
              </p>
            </div>

            <button
              type="submit"
              onClick={(e) => handleAddToCart(e, product)}
              className={`bg-transparent h-8 text-[0.8rem] hover:border-transparent rounded border border-red-500 px-2 font-semibold text-red-500 hover:bg-red-500 hover:text-white uppercase ${
		btnSize === 'sm' && "md:text-[0.6rem]"
	      }`}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
