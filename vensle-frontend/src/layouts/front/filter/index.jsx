import Header from "components/front/header/Header";
import Products from "views/filter/components/Products";
import Footer from "components/front/footer/Footer";

const Filter = () => {
    return (
        <div className="min-h-full">
            <Header />
            <Products />
            <Footer />
        </div>
    )
}

export default Filter;
