import React from "react";
import { Link, } from "react-router-dom";

export default function NotFound() {

    return (
        <section className="h-dvh grid place-items-center">
            <article className="text-center flex flex-col " >
                <h1 className="text-2xl lg:text-5xl font-bold uppercase mb-20">404 Not found</h1>
                <div className="max-w-96 self-center">
                    <img className="w-full" src={"/Scarecrow.png"} alt="404-Scarecrow" />
                </div>
                <p className="text-xl lg:text-2xl mt-5">
                    The page you are looking for might be removed or is temporarily
                    unavailable
                </p>
                <Link className="w-40 text-white bg-[#333] self-center p-3 mt-10 uppercase rounded" to={"/"}>
                    Back to homepage
                </Link>
            </article>
        </section >
    )
};
