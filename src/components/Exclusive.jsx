import React from "react";

export default function Exclusive() {
    return (
        <section className="relative">
            <img src="/smartwatch.jpg" alt="smartWatch picture" />
            <div className="pageWidth">
                <article className="w-full absolute top-[75%] translate-y-[-75%] text-white">
                    <h1 className="text-xl sm:text-3xl lg:text-6xl font-medium mb-1 sm:mb-2 lg:mb-4 uppercase">Exclusive <br /> Smart Watch</h1>
                    <p className="text-base sm:text-xl lg:text-4xl mb-4 sm:mb-7 lg:mb-10 uppercase">Bigger. Bolder. bolder</p>
                    <button className="text-xs lg:text-sm block border border-white px-5 lg:px-10 py-3 uppercase transition tracking-wide hover:bg-white hover:text-black ">GEt 20% off now</button>
                </article>
            </div>
        </section>
    )
};
