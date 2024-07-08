import React from 'react';

const shopCategoryLoader = ({ itemNumber }) => {
  return (
<div className="flex gap-[8px] lg:gap-[15px]">
    {[...Array(parseInt(itemNumber))].map((_, index) => (	  
	<div className="animate-pulse w-full">
		<div className="mx-auto h-[5rem] w-[5rem] lg:w-[8rem] lg:h-[8rem] rounded-full bg-gray-300"></div>
	    <div className="px-3 mt-2">
		<div className="bg-gray-300 h-[0.6rem] lg:h-4 rounded mx-auto mt-3 mb-2 w-3/4"></div>
	    </div>
	</div>
    ))}	    
</div>
  );
};

export default shopCategoryLoader;
