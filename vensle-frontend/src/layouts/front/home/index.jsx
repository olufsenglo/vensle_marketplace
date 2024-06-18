import { useState } from "react";

import Header from "components/front/header/Header";
import Sliders from "components/front/sliders/Sliders";
import Hero from "components/front/hero/Hero";
import ShopByCategories from "components/front/shopByCategories/ShopByCategories";
import TopPurchases from "components/front/topPurchases/TopPurchases";
import DeliverBanner from "components/front/deliverBanner/DeliverBanner";
import NewUploads from "components/front/newUploads/NewUploads";
import PopularGroceries from "components/front/popularGroceries/PopularGroceries";
import StoreBanner from "components/front/storeBanner/StoreBanner";
import TopRequests from "components/front/topRequests/TopRequests";
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
      {/*<Hero />*/}
      <ShopByCategories />
      <TopPurchases />
      <TopPurchaseSellers />
      <DeliverBanner />
      <NewUploads />
      <PopularGroceries />
      <StoreBanner />
      <TopRequests />
      <MoreToLove />
      <Subscribe />
      <Footer />
    </div>
  );
};

export default Home;
