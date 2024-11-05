import React from "react";
import { useGetProductsQuery } from "../../services/apiProducts";
import Product from "./Product";

export default function AllProducts({ priceRange }) {
    const { isLoading, data: products } = useGetProductsQuery();

    const filteredProducts = products?.filter((item) => (Number(item.price) >= priceRange.min && Number(item.price) <= priceRange.max));

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredProducts?.map((item) => <Product key={item.id} product={item} />)}
        </div>
    )
};