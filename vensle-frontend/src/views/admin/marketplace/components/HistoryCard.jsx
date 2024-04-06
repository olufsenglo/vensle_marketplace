import { Link } from 'react-router-dom';
import moment from 'moment';

import Nft2 from "assets/img/nfts/Nft2.png";
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";

import Card from "components/card";

const HistoryCard = ({ products }) => {
  const baseURL = 'https://nominet.vensle.com/backend';


  const getDisplayImage = (image) => {
      const name = image ? image.name : "";
      return `${baseURL}/uploads/${name}`;
  };

  return (
    <Card extra={"mt-3 !z-5 overflow-hidden"}>
      {/* HistoryCard Header */}
      <div className="flex items-center justify-between rounded-t-3xl p-3">
        <div className="text-lg font-bold text-navy-700 dark:text-white">
          My orders
        </div>
        <button className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
          See all
        </button>
      </div>

      {/* History CardData */}

      {products.length > 0 ? products.map((data, index) => (
        <Link to={`/admin/order-items/${data.id}`} className="flex h-full w-full items-start justify-between bg-white px-3 py-[20px] rounded-md hover:bg-gray-200 dark:!bg-navy-800 dark:shadow-none dark:hover:!bg-navy-700">
          <div className="flex items-center gap-3">
            <div className="flex relative h-16 w-16 mr-4 items-center justify-center">

              <img
                className="h-full w-full relative z-[5] bg-white border border-gray-400 object-cover rounded-xl"
                src={getDisplayImage(data.items[0].product.display_image)}
                alt={data.items[0].name}
              />
              {data.items.length > 1 && <img
                className="h-full w-full object-cover absolute right-[-10px] w-[55px] h-[55px] bg-white border border-gray-300 rounded-lg"
                src={getDisplayImage(data.items[1].product.display_image)}
                alt={data.items[1].name}
              />}
            </div>
            <div className="flex flex-col">
              <h5 className="text-base font-bold text-navy-700 dark:text-white">
                {" "}
	        {data.items.length > 1 ? `${data.items[0].name}, ${data.items[0].name.slice(0,3)}...` : data.items[0].name}
              </h5>
              <p className="mt-1 text-sm font-normal text-gray-600">
                {" "}
	        {data.items[0].currency}{data.total_price}{" "}
              </p>
            </div>
          </div>

          <div className="mt-1 flex items-center justify-center text-navy-700 dark:text-white">
            <div className="ml-1 flex items-center text-xs text-navy-700 dark:text-white">
              <p className="bg-green-300 px-3 py-1 rounded-full">{data.status}</p>
            </div>
            <div className="ml-4 flex items-center text-sm font-normal text-gray-600 dark:text-white">
              <p>{moment(data.created_at).fromNow()}</p>
            </div>
          </div>
        </Link>
      )) : <p className="text-center py-8">You have no orders</p>}
    </Card>
  );
};

export default HistoryCard;
