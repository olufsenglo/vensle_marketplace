import { useEffect, useState } from "react";
import axios from "axios";

import Request from "components/front/request/Request";

const baseURL = "https://nominet.vensle.com/backend";
export default function TopRequests() {
  const [productRequests, setProductRequests] = useState([]);

  const fetchProductRequests = async () => {
    try {
      const response = await axios.get(
        `${baseURL}/api/v1/products/top-by-type`,
        {
          params: {
            per_page: "4",
            type: "request",
          },
        }
      );

      setProductRequests(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProductRequests();
  }, []);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <h2
          style={{ borderBottom: "2px solid red" }}
          className="block pb-1 text-center text-xl font-normal uppercase tracking-tight text-gray-900 md:inline md:text-left md:text-2xl"
        >
          Top Requests
        </h2>

        <div className="relative grid min-h-[15rem] grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-8">
          {!productRequests.length && (
            <div
              style={{ zIndex: "5" }}
              className="absolute mb-12 flex h-full w-full justify-center pt-2 pb-12"
            >
              <p>Loading...</p>
            </div>
          )}

          {productRequests &&
            productRequests.map((product) => (
              <>
                <Request product={product} />
              </>
            ))}
        </div>
      </div>
    </div>
  );
}
