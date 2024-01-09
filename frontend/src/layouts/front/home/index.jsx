import Header from "components/front/header/Header";
import Hero from "components/front/hero/Hero";
import Categories from "components/front/categories/Categories";
import DeliverBanner from "components/front/deliverBanner/DeliverBanner";
import NewUploads from "components/front/newUploads/NewUploads";
import PopularGroceries from "components/front/popularGroceries/PopularGroceries";
import StoreBanner from "components/front/storeBanner/StoreBanner";
import TopRequests from "components/front/topRequests/TopRequests";
import MoreToLove from "components/front/moreToLove/MoreToLove";
import TopPurchaseSellers from "components/front/topPurchaseSellers/TopPurchaseSellers";
import Subscribe from "components/front/subscribe/Subscribe";



import Best from "components/front/best/Best";
import Footer from "components/front/footer/Footer";
import GrocerySuggest from "components/front/grocerySuggest/GrocerySuggest";

const Home = () => {
    return (
        <div className="min-h-full">
            <Header />
            <Hero />

	    {/*<Categories />*/}
	    <TopPurchaseSellers />
	    {/*<Best />*/}
	    <DeliverBanner />
	    <NewUploads />
	    <PopularGroceries />
	    <StoreBanner />
	    <TopRequests />
	    <MoreToLove />
	    <Subscribe />
	    {/*<GrocerySuggest />*/}
            <Footer />
        </div>
    )
}

export default Home;
