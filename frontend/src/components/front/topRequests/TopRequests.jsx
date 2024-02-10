import { useEffect, useState } from "react";
import axios from "axios";

import Request from "components/front/request/Request";

const baseURL = "http://localhost:8000";
export default function TopRequests() {
  const [productRequests, setProductRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProductRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${baseURL}/api/v1/products/top-by-type`,
        {
          params: {
            per_page: "2",
            type: "request",
          },
        }
      );

      setProductRequests(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductRequests();
  }, []);
  return (
    <div style={{ minHeight: "30rem" }} className="relative bg-white">
      {loading && (
        <div
          style={{ zIndex: "5", left: "0", right: "0", top: "0", bottom: "0" }}
          className="absolute flex items-center justify-center"
        >
          <p>Loading...</p>
        </div>
      )}

      {!loading && productRequests.length == 0 && (
        <div
          style={{ zIndex: "5", left: "0", right: "0", top: "0", bottom: "0" }}
          className="absolute flex items-center justify-center"
        >
          <p>There are no requests</p>
        </div>
      )}

      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
        <h2
          style={{ borderBottom: "2px solid red" }}
          className="block pb-1 text-center text-xl font-normal uppercase tracking-tight text-gray-900 md:inline md:text-left md:text-2xl"
        >
          Top Requests
        </h2>

        <div className="relative mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 md:mt-10 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-8">
          {!loading &&
            productRequests.length > 0 &&
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
