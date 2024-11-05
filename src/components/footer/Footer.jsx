import React from "react";
import { MdOutlineEmail } from "react-icons/md";
import { SlPhone } from "react-icons/sl";
import { GrFacebookOption } from "react-icons/gr";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import FooterList from "./FooterList";

export default function Footer() {

    return (
        <footer className="w-full pb-20 lg:pb-0">
            <section className="text-[#eee] bg-[#333] py-10">
                <article className="pageWidth grid grid-cols-12 text-left">
                    <div className="col-span-full sm:col-span-6 mb-5 lg:col-span-3">
                        <CompanyInfo />
                    </div>
                    <FooterList />
                    <div className="col-span-full sm:col-span-9 lg:col-span-3">
                        <NewsLetter />
                        <DownloadApp />
                    </div>
                </article>
                <hr className="h-[1px] my-5" />
                <article className="pageWidth">
                    <div className="flex flex-col lg:flex-row items-center md:items-stretch gap-3 md:justify-between">
                        <div className="mb-3">
                            <img src="./payments.png" alt="" />
                        </div>
                        <p>
                            © 2024 Vogal. All Rights Reserved
                        </p>
                    </div>
                </article>
            </section>
        </footer>
    )
};

function CompanyInfo() {
    return (
        <div className="max-w-[300px]">
            <div className="max-w-[150px] mb-4">
                <img src="./logo-white.png" alt="Company Logo" />
            </div>
            <p className="mb-6">Our aim is to provide high quality, easy to use, fastest and affordable Shopify themes.</p>
            <p className="flex items-center gap-1 mb-3"><SlPhone /><span>: (440) 000 000 0000</span></p>
            <p className="flex items-center gap-1 mb-3"><MdOutlineEmail /><span>: sales@yousite.com</span></p>
            <SocialLinks />
        </div>
    );
}

function SocialLinks() {
    return (
        <ul className="socialIcon flex gap-5 text-white mt-7">
            <li>
                <a href="#"><GrFacebookOption /></a>
            </li>
            <li>
                <a href="#"><FaInstagram /></a>
            </li>
            <li>
                <a href="#"><FaLinkedin /></a>
            </li>
            <li>
                <a href="#"><FaYoutube /></a>
            </li>
        </ul>
    )
}

function NewsLetter() {

    return (
        <div className="mb-7">
            <h1 className="footerLinkTitle mb-2">subscribe to our newsletter</h1>
            <p className="footerLinkDesc mb-3">Get notified about product launches, special offers and news.</p>
            <div className="rounded-[5px] relative border border-[rgba(0,0,0,0)]">
                <div className="flex items-center">
                    <input type="search" className="w-full h-[42px] text-sm text-[#444] bg-[#f5f5f5] rounded-[5px] relative px-[10px] appearance-none" placeholder="Email address" />
                    <button type="submit" className=" absolute right-[3px] text-xs text-white font-semibold bg-black p-[8px_10px] rounded-3xl uppercase tracking-[1px]">
                        subscribe
                    </button>
                </div>
            </div>
        </div>
    )
}

function DownloadApp() {

    return (
        <div>
            <h1 className="footerLinkTitle">Download App</h1>
            <p className="footerLinkDesc">Vogal App is now available on App Store & Google Play. Get it now.</p>
            <ul className="flex gap-3">
                <li><a href="#"><img src="./apple.png" alt="" /></a></li>
                <li><a href="#"><img src="./google-pay.png" alt="" /></a></li>
            </ul>
        </div>
    )
}