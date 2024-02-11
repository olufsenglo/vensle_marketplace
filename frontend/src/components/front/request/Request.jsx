import { useState } from "react";
import moment from "moment";
import { ArrowRightIcon } from "@heroicons/react/20/solid";

import PreviewPopup from "components/front/previewPopup/PreviewPopup";

const baseURL = "http://localhost:8000";
export default function Request({ product }) {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const delim = "^%*#$";

  const getImagePath = (name) => {
    return `${baseURL}/uploads/${name}`;
  };

  const handleProductQuickView = (e, product) => {
    e.preventDefault();
    setSelectedProduct(product);
    setOpen(true);
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
        href={product.href}
        className="group cursor-pointer"
      >
        <div className="aspect-h-1 aspect-w-1 lg:aspect-none relative w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-[17.5rem]">
          <div
            style={{ top: "1rem", right: "1rem", background: "#ff5959" }}
            className="absolute rounded py-3 px-8 text-white"
          >
            <p className="text-sm">${product.price} - $400</p>
          </div>
          <img
            src={
              product.display_image && getImagePath(product.display_image.name)
            }
            alt={product.name}
            className="h-full w-full rounded-md object-cover object-center group-hover:opacity-75"
          />
        </div>

        <div className="py-4 px-7">
          <h1
            style={{ fontWeight: "500", fontSize: "1.4rem" }}
            className="line-clamp-1 mt-2 text-xl tracking-tight sm:text-2xl"
          >
            {product.name}
          </h1>
          <div className="mt-4">
	    <p
            	className="line-clamp-2 font-medium text-gray-900"
	    >
                <span>{product.description}</span>
	    </p>
          </div>

          <div className="mt-6 flex flex-col lg:flex-row">
            <p
              className="text-black-200 mr-4 flex items-center text-xs font-medium text-gray-700"
              style={{ color: "#aaa" }}
            >
              <svg
                className="mr-2 h-4 w-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Requested {moment(product.created_at).fromNow()}
            </p>
            <p
              className="text-black-200 py-2 flex items-center text-xs font-medium text-gray-700"
              style={{ color: "#aaa" }}
            >
              <svg
                className="mr-1 h-4 w-4 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {product.city}
            </p>
            <span className="flex-1 hidden lg:flex cursor-pointer items-center justify-start text-xs text-red-600 justify-end">
              VIEW <ArrowRightIcon className="ml-1 h-4 w-4" />
            </span>
          </div>
        </div>
      </a>
    </>
  );
}
