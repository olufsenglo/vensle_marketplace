import { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import { ArrowRightIcon } from '@heroicons/react/20/solid'

import Request from "components/front/request/Request";

const baseURL = 'https://nominet.vensle.com/backend'
export default function TopRequests() {
    //const baseURL = 'https://nominet.vensle.com/backend';
    const [productRequests, setProductRequests] = useState([]);
  const [loading, setLoading] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)


  const fetchProductRequests = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${baseURL}/api/v1/products/top-by-type`, {
        params: {
		per_page: '2',
		type: 'request'
        },
      });

      setProductRequests(response.data.data);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false)
    }
  }

    useEffect(() => {
	fetchProductRequests();
    }, []);
  return (
    <div style={{minHeight:"30rem"}} className="bg-white relative">


{loading &&
<div style={{"zIndex":"5", left:"0", right:"0", top:"0", bottom: "0"}} className="absolute flex justify-center items-center">
	<p>Loading...</p>
</div>
}

{!loading && productRequests.length == 0 &&
<div style={{"zIndex":"5", left:"0", right:"0", top:"0", bottom: "0"}} className="absolute flex justify-center items-center">
	<p>There are no requests</p>
</div>
}

      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-6 lg:max-w-7xl lg:px-8">
        	<h2 style={{"borderBottom":"2px solid red" }} className="text-xl md:text-2xl block md:inline text-center md:text-left pb-1 font-normal tracking-tight text-gray-900 uppercase">Top Requests</h2>

        <div className="grid relative grid-cols-2 gap-x-6 gap-y-10 mt-6 md:mt-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-8">

          {!loading && productRequests.length > 0 && productRequests.map((product) => (
		  <>
	  		<Request product={product} />
		  </>
          ))}
        </div>
      </div>
    </div>
  )
}
