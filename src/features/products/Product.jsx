import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { addToCart, } from "../../slices/cartSlice";
import useWindowSize from "../../hooks/useWindowSize";
import { motion } from "framer-motion";
import { CiHeart, CiSearch } from "react-icons/ci";
import { BsCart2 } from "react-icons/bs";
import Loader from "../../ui/Loader";
import Modal from "../../ui/Modal";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa6";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';

export default function Product({ product }) {
    const { cartOpen, isCartOpen } = useContext(CartContext);
    const { id, title, image, hoverImage, price, discountPrice, offerPercentage, desc } = product;
    const [modalQuantity, setModalQuantity] = useState(1);
    const windowWidth = useWindowSize();
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart({ ...product, quantity: modalQuantity }));
        isCartOpen(true);
    };

    const handleDecrease = () => {
        if (modalQuantity > 1) {
            setModalQuantity(prev => prev - 1);
        }
    };

    const handleIncrease = () => {
        setModalQuantity(prev => prev + 1);
    };

    function handleInput(e) {
        let value = e.target.value;

        if (value === "") {
            value = 1;
        } else {
            value = parseInt(e.target.value, 10);
        }
        setModalQuantity(value);
    }

    if (!image) return <Loader />;

    const hoverVariants = {
        hover: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
        },
        rest: {
            opacity: 0,
            y: -10,
            transition: {
                duration: 0.3,
                ease: "easeInOut",
            },
        }
    };

    return (
        <Modal>
            <article className="bg-white border border-[#eee]">
                <motion.div initial="rest" whileHover="hover" className="relative block group/product" >
                    <div className="relative">
                        <Link to={`/collections/${id}`}>
                            <div className="relative group/figure overflow-hidden">
                                <img className="w-full h-full object-cover" src={image} alt="" />
                                <motion.img
                                    initial={{ scale: 1.1, }}
                                    transition={{ duration: 0.5 }}
                                    whileHover={{ scale: 1 }}
                                    src={hoverImage} className="w-full h-full absolute top-0 left-0 right-0 bottom-0 object-contain opacity-0 transition-opacity duration-200 group-hover/figure:opacity-100" alt="" />
                            </div>
                        </Link>
                        {windowWidth > 768 && (
                            <motion.div
                                variants={hoverVariants}
                                className="absolute top-[80%] w-full flex justify-center">
                                <ButtonSet product={product} />
                            </motion.div>
                        )}
                        {offerPercentage && <span className="text-white text-xs bg-[#d75e78] p-1 rounded-full absolute top-3 left-3 lg:top-5 lg:left-5">-{offerPercentage}%</span>}
                    </div>
                    <div className="text-center pb-5">
                        <Link to={`/collections/${id}`} className="inline-block mb-2">
                            <h1 className="text-sm lg:text-base transition hover:text-red-500">{title}</h1>
                        </Link>
                        {discountPrice ? <>
                            <p className="text-sm lg:text-base font-semibold flex justify-center items-center gap-3"><span>${discountPrice}</span><del className="text-sm font-normal">${price}</del></p>
                        </> :
                            <p className="text-sm lg:text-base font-semibold flex justify-center items-center gap-3">${price}</p>
                        }
                    </div>
                </motion.div>
            </article>
            <Modal.Window name={"view"}>
                {image && hoverImage ?
                    <>
                        <article className="max-w-[800px] flex gap-3">
                            <div className="relative flex-1 group/swiperModal overflow-hidden">
                                <>
                                    <button className="bg-white flex justify-center items-center w-7 h-7 top-[50%] translate-y-[-50%] rounded-full absolute z-10 shadow cursor-pointer focus:outline-none invisible opacity-0 group-hover/swiperModal:visible group-hover/swiperModal:opacity-100 right-1 swiperButton-next-modal">
                                        <IoIosArrowForward />
                                    </button>
                                    <button className="bg-white flex justify-center items-center w-7 h-7 top-[50%] translate-y-[-50%] rounded-full absolute z-10 shadow cursor-pointer focus:outline-none invisible opacity-0 group-hover/swiperModal:visible group-hover/swiperModal:opacity-100 left-1 swiperButton-prev-modal">
                                        <IoIosArrowBack />
                                    </button>
                                    <Swiper navigation={{
                                        nextEl: ".swiperButton-next-modal",
                                        prevEl: ".swiperButton-prev-modal",
                                        disabledClass: "swiper-button-disabled",
                                    }} loop={true} modules={[Navigation]} className="mySwipermodal">
                                        <SwiperSlide>
                                            <img className="w-full h-full object-cover" src={image} alt="" />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img className="w-full h-full object-cover" src={hoverImage} alt="" />
                                        </SwiperSlide>
                                    </Swiper>
                                </>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-2xl font-semibold mb-3">{title}</h1>
                                <p className="font-medium mb-5"><span className="text-lg">${price}</span>
                                    {discountPrice && <del className="text-base text-[#696868]">${discountPrice}</del>}</p>
                                <p className="mb-5">{desc}</p>
                                <div className="flex gap-1 mb-10">
                                    <button onClick={handleDecrease} className="cartItemBtn" ><FaMinus /></button>
                                    <input className="w-10 h-7 text-center border border-[#ddd]" type="number" value={modalQuantity || "1"} onChange={handleInput} />
                                    <button onClick={handleIncrease} className="cartItemBtn"><FaPlus /></button>
                                </div>
                                <button className="w-full text-white bg-black p-[10px_0] mb-3 uppercase" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                                <Link to={`/collections/${id}`} className="inline-block w-full text-[#cf9530] hover:text-[#092143] text-base font-semibold text-center p-[10px_0] capitalize transition">
                                    <span>
                                        View more details
                                    </span>
                                </Link>
                            </div>
                        </article>
                    </> : <Loader />}
            </Modal.Window>
        </Modal>
    )
};

function ButtonSet({ product }) {
    const dispatch = useDispatch();
    const { cartOpen, isCartOpen } = useContext(CartContext);

    const handleAddToCart = (product) => {
        dispatch(addToCart({ ...product, quantity: 1 }));
        isCartOpen(true);
    };


    return (
        <>
            <div className="w-full flex gap-4 justify-center">
                <Btn text={"Add to cart"} onClick={() => handleAddToCart(product)}>
                    <BsCart2 />
                </Btn>
                <div>
                    <Modal.Open opens={"view"}>
                        <Btn text={"Quick View"}>
                            <CiSearch />
                        </Btn>
                    </Modal.Open>
                </div>
            </div>
        </>
    )
}

function Btn({ children, text, onClick }) {

    return (
        <>
            <button className="text-white bg-black w-10 h-10 rounded-md relative flex items-center justify-center leading-9 group/toolTip transition duration-300 ease-in-out hover:bg-orange-600" onClick={onClick}>
                {children}
                <span className="w-[100px] text-xs capitalize bg-slate-800 p-1 rounded-md absolute z-10 bottom-[120%] left-[50%] translate-x-[-50%] opacity-0 invisible transition duration-300 ease-in-out after:content after:absolute after:top-[100%] after:left-[50%] after:ml-[-5px] after:border-4 after:border-solid after:border-[#555_transparent_transparent_transparent] group-hover/toolTip:visible group-hover/toolTip:opacity-100">{text}</span>
            </button>
        </>
    )
}