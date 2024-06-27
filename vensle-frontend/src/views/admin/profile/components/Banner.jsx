import React, { useEffect } from "react";

import avatar from "assets/img/avatars/avatar11.png";
import banner from "assets/img/profile/banner.png";
import Card from "components/card";
import { MdModeEditOutline } from "react-icons/md";

const Banner = ({
  user,
  imagePreview,
  handleFileChange,
}) => {
  //useEffect(() => {
  //setImagePreview(imgPath);
  //});

  return (
    <Card extra={"items-center w-full h-full p-[16px] bg-cover"}>
      <label>
        <input
          type="file"
          accept="image/*"
          name="profile_picture"
          onChange={handleFileChange}
          id="profile_image"
          className="hidden"
        />
      </label>

      <div
        className="relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
          {imagePreview && (
            <img
              className="h-full w-full rounded-full"
              src={
                imagePreview
                  ? imagePreview
                  : "https://www.flaticon.com/free-icons/user"
              }
              alt="profile"
            />
          )}
        </div>
      </div>

      {/* Name and position */}
      <div className="mt-16 flex flex-col items-center">
        <label className="cursor-pointer" htmlFor="profile_image">
          <MdModeEditOutline />
        </label>
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          {user.name}
        </h4>
        <p className="text-base font-normal text-gray-600">Seller</p>
      </div>
    </Card>
  );
};

export default Banner;
