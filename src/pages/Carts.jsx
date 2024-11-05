import React, { useContext } from "react";
import { Link, } from "react-router-dom";
import { useSelector } from "react-redux";
import { CartContext } from "../context/CartContext";
import useWindowSize from "../hooks/useWindowSize";
import CartItem from "../features/cart/CartItem";
import Loader from "../ui/Loader";
import SectionContainer from "../ui/SectionContainer";
import Table from "../ui/Table";
import QuantityBtnSet from "../ui/QuantityBtnSet";
import { CiDeliveryTruck } from "react-icons/ci";
import useCartItems from "../features/cart/useCartItems";
import useTotalAmount from "../features/cart/useTotalAmount";
import NoItem from "../ui/NoItem";

export default function Carts() {
    const isLoading = useSelector((state) => state.cart.isLoading);
    const { isCartOpen } = useContext(CartContext);
    const windowWidth = useWindowSize();
    const cachedCartItems = useCartItems();
    const cachedTotalAmount = useTotalAmount();

    if (isLoading) return <Loader />;

    return (
        <SectionContainer title={"your cart"}>
            {cachedCartItems?.length > 0 ?
                (<div className="w-full">
                    {windowWidth > 767 ? (
                        <Table><RenderCartItems cartItems={cachedCartItems} isCartOpen={isCartOpen} /></Table>
                    ) : (
                        <><RenderMobileCartItems cartItems={cachedCartItems} /></>
                    )}
                    <Shipping totalPrice={cachedTotalAmount} />
                </div>
                ) : <NoItem />
            }
        </SectionContainer >
    )
};

function Shipping({ totalPrice, price }) {

    return (
        <>
            <div className="bg-[#f5f5f5] p-10 mt-10 rounded ">
                <p className="font-medium flex items-center gap-1 uppercase mb-5"><CiDeliveryTruck style={{ width: "25px", height: "25px" }} />
                    <span>Free Shipping eligible</span>
                </p>
                <ShipBar />
                <p className="text-lg font-semibold uppercase flex justify-between mb-10">
                    <span>Total</span><span>${totalPrice} USD</span>
                </p>
                <div className="lg:flex gap-20 mt-4">
                    <Link to={"/collections"} className="block w-full text-center text-black hover:text-white text-xs lg:text-sm bg-white hover:bg-black uppercase p-[15px_30px] border rounded mb-3 lg:mb-0 tracking-wider transition">
                        Continue shopping
                    </Link>
                    <Link className="block w-full text-center text-white hover:text-black text-xs lg:text-sm bg-black hover:bg-white uppercase p-[15px_30px] border rounded tracking-wider transition">
                        Proceed to checkout
                    </Link>
                </div>
            </div>
        </>
    )
}

function ShipBar() {
    return (
        <div className="h-2 relative rounded-lg overflow-hidden mb-12">
            <span className="bar h-full block bg-[#fabb4c] absolute top-0 left-0 animate-[barProgress_5s_linear_infinite]"></span>
        </div>
    )
}

const RenderCartItems = ({ cartItems, isCartOpen }) => {

    return cartItems.map((item, i) => (
        <tr className="text-sm lg:text-base p-3 border-b border-[#ddd]" key={i}>
            <td className="block">
                <Link to={`/collections/${item.id}`} onClick={() => isCartOpen(false)} className="flex items-center ">
                    <img src={item?.image} alt={item?.title} className="w-20" />
                    <span className="w-60 font-medium transition">{item?.title}</span>
                </Link>
            </td>
            <td className="font-semibold p-3">${item?.price}</td>
            <td>
                <QuantityBtnSet product={item} />
            </td>
            <td className="font-semibold p-3">${item?.price * item?.quantity}</td>
        </tr >
    ));
};

const RenderMobileCartItems = ({ cartItems }) => {
    return cartItems.map((item, i) => <CartItem key={i} product={item} />);
};

function AddressBook() {

    return (
        <>

        </>
    )
}