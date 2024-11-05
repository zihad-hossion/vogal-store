import React from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../services/apiProducts";
import Loader from "../../ui/Loader";
import SectionContainer from "../../ui/SectionContainer";
import Product from "./Product";


export default function NewProducts() {
    const { isLoading, data: products } = useGetProductsQuery();

    return (
        <>
            <SectionContainer secStyle="bg-[#FAFAFA] text-center" title={"New products"}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {products?.map((item) => <Product key={item.id} product={item} />)}
                </div>
                <Link to={"/collections"}>
                    <span className="inline-block border border-black p-[10px_30px] uppercase mt-10 transition hover:text-white hover:bg-black">
                        View all
                    </span>
                </Link>
            </SectionContainer>
        </>
    )
};