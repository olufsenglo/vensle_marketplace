import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomePage from "./components/HomePage";
import Detail from './components/Detail';


//Rename components, names are confusing as ...., same convention for exports
// import HomeCategores from "./components/HomeCategories";
import HomeSuggested from "./components/HomeSuggested";
import PopularGroceries from "./components/PopularGroceries";
import CategoryFilter from "./components/CategoryFilter";
import Header from "./components/Header";
import CartProductList from "./components/CartProductList";
import Autosuggest from "./components/test/Autosuggest";
import Cart from "./components/test/Cart";

import TestSearch from "./components/TestSearch";
import LoginPg from "./components/LoginPg";
import Login from "./components/mock/Login";
import Register from "./components/mock/Register";
import Search from "./components/mock/Search";
import SearchDropdown from "./components/mock/SearchDropdown";

import img5 from "./images/img5.JPG";
import img6 from "./images/img6.JPG";
import img7 from "./images/img7.JPG";
import img8 from "./images/img8.JPG";

const products = [
  {
    id: 1,
    name: 'Dell Computer',
    href: '#',
    price: '$48',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    location: 'london',
  },
  {
    id: 2,
    name: 'Iphone 13',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    location: 'london',
  },
  {
    id: 3,
    name: 'Asus Zenbook',
    href: '#',
    price: '$89',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    location: 'london',
  },
  {
    id: 4,
    name: 'Powerbank',
    href: '#',
    price: '$35',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    location: 'london',
  },
  {
    id: 5,
    name: 'Apple watch',
    href: '#',
    price: '$48',
    imageSrc: img5,
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    location: 'london',
  },
  {
    id: 6,
    name: 'Nomad Tumbler',
    href: '#',
    price: '$35',
    imageSrc: img6,
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    location: 'london',
  },
  {
    id: 7,
    name: 'Focus Paper Refill',
    href: '#',
    price: '$89',
    imageSrc: img7,
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 8,
    name: 'Iglass',
    href: '#',
    price: '$35',
    imageSrc: img8,
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    location: 'london',
  },    
  // More products...
]

export default function App() {
    return (
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/autosuggest" element={<Autosuggest />} />
        <Route path="/cartlist" element={<CartProductList />} />
        <Route path="/donesearch" element={<TestSearch />} />
        <Route path="/searchdropdown" element={<SearchDropdown />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginPg />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/product/:productId" element={<Detail />} />
        <Route path="/product/filter" element={<CategoryFilter />} />
        <Route path="/" element={ <HomePage/> } />

        {/* <Route path="/detail" element={ <Detail/> } /> */}
      </Routes>
      // <div>
      //   <Header />

        
      //   <HomeCategores />
      //   <TopCategories />
      //   <div style={{ "height": "45vh", "background": "purple" }}></div>

      //   {/* <CategoryFilter showTitle={true} products={products} /> */}

      //   <HomeSuggested title="NEW UPLOADS" products={products} />
      //   <div style={{ "height": "45vh", "background": "brown" }}></div>
      //   <PopularGroceries />

      // </div>
    )
  }
