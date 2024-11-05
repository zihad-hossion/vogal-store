import React from "react";
import Categories from "../features/categories/Categories";
import NewProducts from "../features/products/NewProducts";
import Blogs from "../features/blogs/Blogs";
import Hero from "../components/hero/Hero";
import Exclusive from "../components/Exclusive";
import Support from "../components/Support";


function Home() {

    return (
        <>
            <Hero />
            <Categories />
            <NewProducts />
            <Exclusive />
            <Support />
            <Blogs />
        </>
    )
};

export default Home;

