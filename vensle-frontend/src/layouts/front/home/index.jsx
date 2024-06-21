import { useState } from "react";

import Header from "components/front/header/Header";
import Sliders from "components/front/sliders/Sliders";
import Hero from "components/front/hero/Hero";
import ShopByCategories from "components/front/shopByCategories/ShopByCategories";
import ShopByGroceryCategories from "components/front/shopByGroceryCategories/ShopByGroceryCategories";
import TopPurchases from "components/front/topPurchases/TopPurchases";
import MostPopular from "components/front/mostPopular/MostPopular";
import TopSellers from "components/front/topSellers/TopSellers";
import BestSellers from "components/front/bestSellers/BestSellers";
import TopPickup from "components/front/topPickup/TopPickup";
import FirstBanner from "components/front/firstBanner/FirstBanner";
import SecondBanner from "components/front/secondBanner/SecondBanner";
import UploadsRatings from "components/front/uploadsRatings/UploadsRatings";
import DeliverBanner from "components/front/deliverBanner/DeliverBanner";
import NewUploads from "components/front/newUploads/NewUploads";
import PopularGroceries from "components/front/popularGroceries/PopularGroceries";
import StoreBanner from "components/front/storeBanner/StoreBanner";
import TopRequests from "components/front/topRequests/TopRequests";
import NewTopRequests from "components/front/topRequests/NewTopRequests";
import MoreToLove from "components/front/moreToLove/MoreToLove";
import TopPurchaseSellers from "components/front/topPurchaseSellers/TopPurchaseSellers";
import Subscribe from "components/front/subscribe/Subscribe";

import Footer from "components/front/footer/Footer";

const Home = () => {
  const [activePill, setActivePill] = useState(1)

  return (
    <div className="min-h-full">
      <Header activePill={activePill} setActivePill={setActivePill} />
      <Sliders activePill={activePill} setActivePill={setActivePill} />
      {activePill === 2 && <TopPickup />}
      {activePill === 3 && <NewTopRequests />}
      {activePill === 4 && <MostPopular />}
      {/*<Hero />*/}
      {/*<TopPurchaseSellers />*/}
      {/*<DeliverBanner />*/}
      {/*<NewUploads />*/}
      {/*<PopularGroceries />*/}
      {/*<StoreBanner />*/}
      {/*<TopRequests />*/}
      {activePill === 4 ? <ShopByGroceryCategories /> : <ShopByCategories />}
      {activePill === 4 && <BestSellers />}
      {activePill === 1 &&<TopPurchases />}
      <TopSellers />
      <FirstBanner />
      {activePill === 1 && <MostPopular />}
      <UploadsRatings />
      <SecondBanner />
      {activePill === 1 && <NewTopRequests />}
      <MoreToLove />
      <Subscribe />
      <Footer />
    </div>
  );
};

export default Home;
