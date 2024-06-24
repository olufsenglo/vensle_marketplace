import React, { useState } from "react";

import PreviewPopup from "components/front/previewPopup/PreviewPopup";


import Product from "components/front/product/Product";
import Grocery from "components/front/product/Grocery";

export default function SimilarProducts({ products }) {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-normal tracking-tight text-gray-900">
          More like this
        </h2>

        {selectedProduct && (
          <PreviewPopup
            open={open}
            setOpen={setOpen}
            selectedProduct={selectedProduct}
          />
        )}

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <>
              {product.type == "product" ? (
                <Product product={product} height="14" />
              ) : (
                <Grocery product={product} height="14" />
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
