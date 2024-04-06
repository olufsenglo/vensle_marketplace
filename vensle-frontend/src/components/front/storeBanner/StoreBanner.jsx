import { HomeIcon } from "@heroicons/react/20/solid";

import store1 from "assets/img/front/banner/store1.jpg";
import store2 from "assets/img/front/banner/store2.jpg";

export default function StoreBanner() {
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
        <div
          style={{ height: "18rem" }}
          className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-8"
        >
          <div
            style={{
              backgroundImage: `url(${store2})`,
              backgroundPosition: "right",
            }}
          >
            <div
              className="flex flex-col justify-center bg-white pl-9"
              style={{ height: "100%", width: "40%" }}
            >
              <div className="flex items-center">
                <HomeIcon className="mr-2 h-5 w-5 lg:h-10 lg:w-10" />
                <div>
                  <h2 className="text-sm font-normal uppercase tracking-tight text-gray-900 lg:text-2xl">
                    official
                  </h2>
                  <h2 className="text-sm font-normal uppercase tracking-tight text-gray-900 lg:text-2xl">
                    store
                  </h2>
                </div>
              </div>
              <h1 className="mt-5 text-sm font-normal tracking-tight text-gray-900 sm:text-xl md:text-lg lg:font-bold">
                All things groceries
              </h1>
            </div>
          </div>

          <div
            style={{
              backgroundImage: `url(${store1})`,
              backgroundPosition: "right",
            }}
          >
            <div
              className="flex flex-col justify-center bg-white pl-9"
              style={{ height: "100%", width: "40%" }}
            >
              <div className="flex items-center">
                <HomeIcon className="mr-2 h-5 w-5 lg:h-10 lg:w-10" />
                <div>
                  <h2 className="text-sm font-normal uppercase tracking-tight text-gray-900 lg:text-2xl">
                    official
                  </h2>
                  <h2 className="text-sm font-normal uppercase tracking-tight text-gray-900 lg:text-2xl">
                    store
                  </h2>
                </div>
              </div>
              <h1 className="mt-5 text-sm font-normal tracking-tight text-gray-900 sm:text-xl md:text-lg lg:font-bold">
                All things Fashion
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
