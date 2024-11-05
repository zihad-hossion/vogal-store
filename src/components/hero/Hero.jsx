import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
// import required modules
import { Autoplay, EffectFade, Navigation, } from 'swiper/modules';

export default function Hero() {
    const [animate, setAnimate] = useState(true);

    return (
        <>
            <section className='relative group/swiperBtn'>
                <button className="swiperButton right-3 md:right-[50px] swiperButton-next">
                    <IoIosArrowForward />
                </button>
                <button className="swiperButton left-3 md:left-[50px] swiperButton-prev">
                    <IoIosArrowBack />
                </button>
                <Swiper
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    navigation={{
                        nextEl: ".swiperButton-next",
                        prevEl: ".swiperButton-prev",
                        disabledClass: "swiper-button-disabled",
                    }} effect="fade" loop={true}
                    onSlideChangeTransitionStart={() => setAnimate(false)}
                    onSlideChangeTransitionEnd={() => setAnimate(true)}
                    modules={[Autoplay, EffectFade, Navigation,]} className="mySwiper">
                    <SwiperSlide>
                        <article className=''>
                            <picture>
                                <source srcSet='/slider1-small.jpg' media='(max-width:575px)' />
                                <source srcSet='/slider1-large.jpg' media='(min-width:576px)' />
                                <img src="/slider1-large.jpg" alt="" className='hero-img' />
                            </picture>
                            <SliderText animate={animate}>
                                <h3 className='text-xl sm:text-[22px] lg:text-[80px] font-bold leading-none uppercase mb-3 md:mb-7'>
                                    Magic
                                    <br />
                                    UNWRAPPED
                                </h3>
                                <p className='text-sm xs:text-base md:text-2xl mb-3 md:mb-7'>Everyone deserves a piece of heaven.</p>
                            </SliderText >
                        </article>
                    </SwiperSlide>

                    <SwiperSlide>
                        <article className=''>
                            <picture>
                                <source srcSet='/slider2-small.jpg' media='(max-width:575px) ' />
                                <source srcSet='/slider2-large.jpg' media='(min-width:576px)' />
                                <img src="/slider2-large.jpg" alt="" className='hero-img' />
                            </picture>
                            <SliderText animate={animate}>
                                <h3 className='text-xl sm:text-[22px] lg:text-[80px] leading-none uppercase mb-3 md:mb-7 text-[#333]'>
                                    <b>50% OFF ON</b>
                                    <br />
                                    SMART WATCH
                                </h3>
                                <p className='text-sm xs:text-base md:text-2xl mb-3 md:mb-7 text-[#333]'>Don't Miss Your Last Chance.</p>
                            </SliderText >
                        </article>
                    </SwiperSlide>
                </Swiper>
            </section >
        </>
    );
}

function SliderText({ children, animate }) {

    return (<>
        <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={animate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{
                duration: 0.3,
                ease: "linear",
                repeatType: "loop",
            }}
            className=" text-white absolute top-[20%] translate-y-[-20%] left-[17%] translate-x-[-17%] lg:left-[20%] lg:translate-x-[-20%] z-5">
            {children}
            <button className='text-xs md:text-[15px] bg-[#333] border border-[#333] p-[10px_16px] uppercase rounded transition lg:p-[16px_40px] mt-3 lg:mt-10 hover:text-[#333] hover:bg-white'>Shop Now</button>
        </motion.div>
    </>)
}