import { useEffect, useState } from "react";

import {
  StarIcon,
  ArrowLeftIcon,
  ChevronLeftIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  ChevronRightIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/20/solid";

const baseURL = "https://nominet.vensle.com/backend";

const UploadPreview = ({
  formData,
  loading,
  imagePreviews,
  mainImageIndex,
  setUploadPreview,
}) => {
  const [mainPreviewImage, setMainPreviewImage] = useState(null);

  const getDisplayImage = (product) => {
    const displayImage = product.images.find(
      (image) => image.id === product.display_image_id
    );
    return displayImage ? `${baseURL}/uploads/${displayImage.name}` : "";
  };

  const getImagePath = (name) => {
    return `${baseURL}/uploads/${name}`;
  };

  const handleSetMainPreviewImage = (e, preview) => {
    e.preventDefault();
    setMainPreviewImage(preview);
  };

  const handleShowSelectedImage = (preview) => {
    return (
      <a
        onClick={(e) => handleSetMainPreviewImage(e, preview)}
        href="#"
        className="dark:border-transparent block border border-red-300 hover:border-red-300 dark:hover:border-red-300 rounded-md overflow-hidden"
      >
        <img src={preview} alt="Preview" className="w-full object-cover lg:h-20" />
      </a>
    );
  };

  useEffect(() => {
    const defaultImagePreview =
      imagePreviews[mainImageIndex] || imagePreviews[0] || "";

    setMainPreviewImage(defaultImagePreview);
  }, [imagePreviews]);

  return (
    <div
      style={{ top: "0", left: "0", zIndex: "5" }}
      className="absolute h-full w-full bg-white p-4"
    >
      <p
        className="ml-2 mb-4 cursor-pointer"
        onClick={() => setUploadPreview(false)}
      >
	<ArrowLeftIcon className="h-4 w-4" />
      </p>

      <div className="bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto rounded-3xl ring-1 ring-gray-200 lg:mx-0 lg:flex lg:max-w-none">
            <div className="w-full">
              <div className="sticky top-0 z-50 overflow-hidden ">
                <div className="relative p-2 mb-2 lg:mb-8 lg:h-[28rem]">
                  <img
                    src={mainPreviewImage}
                    alt="x"
                    className="w-[200rem] rounded-2xl object-cover lg:h-full "
                  />
                </div>
                <div className="hidden flex-wrap md:flex ">
                  {imagePreviews &&
                    imagePreviews.map((preview) => (
                      <div className="w-1/2 p-2 sm:w-1/4">
                        {handleShowSelectedImage(preview)}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-xs lg:flex-shrink-0">
              <div className="lg:pt:6 rounded-2xl bg-gray-50 py-5 ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:pb-8">
                <div className="px-8">
		  <h3
		    className="mb-1 lg:mb-5 text-base lg:text-2xl font-medium line-clamp-2 tracking-tight"
		  >
                    {formData.name}
                  </h3>
                  <div className="flex items-center">
                    <p className="text-sm leading-5 text-gray-600">
                      No Feedback
                    </p>
                  </div>
		  <h4 className="mt-2 lg:mt-3 mg-3 lg:mb-5 text-xl text-primaryColor">
                    $ {formData.price}
                  </h4>
		   <h4 className="text-xl hidden lg:block">
                    Product Details
                  </h4>

                  <p className="lg:block mt-1 line-clamp-7 text-base leading-7">
                    {formData.description}
                  </p>

                  <p className="mt-3 lg:mt-5 flex items-center text-sm font-medium">
                    <MapPinIcon className="mr-1 lg:mr-2 h-3 lg:h-4 w-3 lg:w-4" />
                    London
                  </p>
                  <p className="mt-1 lg:mt-3 flex items-center text-sm font-medium">
                                    <ClockIcon className="mr-1 lg:mr-2 h-3 lg:h-4 w-3 lg:w-4" />
                    Now
                  </p>

                  <div className="flex items-center">
                    <button
                      type="submit"
                      disabled={loading}
                      className="linear mt-8 w-full rounded-xl bg-red-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200"
                    >
                      {loading ? "Loading ..." : "SUBMIT"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPreview;
