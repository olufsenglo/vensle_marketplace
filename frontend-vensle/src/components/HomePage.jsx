import FeaturedProducts from "./FeaturedProducts";
import TopCategories from "../components/HomeTop/TopCategories";
import PopularGroceries from "./PopularGroceries";

const HomePage = () => {
    return (
        <div>
            <TopCategories />
            <div style={{ "height": "65vh", "background": "purple" }}></div>
            <FeaturedProducts />
            <PopularGroceries />
            <div style={{ "height": "45vh", "background": "brown" }}></div>
        </div>
    )
}

export default HomePage;