import React from 'react';

const Skeleton = ({ size="small", itemNumber=6 }) => {
  return (
<div className="flex gap-2 md:gap-5">
    {[...Array(parseInt(itemNumber))].map((_, index) => (	  
	<div
     	    key={index}
	    className="w-full animate-pulse border lg:border-none border-gray-200 bg-gray-100/50 lg:bg-white text-left rounded-md"
	>
	    <div className="relative">
		<div className={`h-[170px] rounded-lg bg-gray-300 ${
		    size == 'large' && "md:h-[19.5rem]"
		}`}>
		</div>
	    </div>
	    <div className="px-3 pb-2 pt-2 md:p-3">
		    <div className={`bg-gray-300 rounded w-1/2 ${
		       size == 'large' ? "h-4" : "h-[0.6rem]"
		    }`}></div>
		    <div className={`bg-gray-300 rounded mt-3 mb-2 w-3/4 ${
		       size == 'large' ? "h-4" : "h-[0.6rem]"
		    }`}></div>
		    <div className={`bg-gray-300 rounded w-1/4 ${
		       size == 'large' ? "h-4" : "h-[0.6rem]"
		    }`}></div>
	    </div>
	</div>
    ))}	    
</div>
  );
};

export default Skeleton;
