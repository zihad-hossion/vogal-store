import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { BiSupport } from "react-icons/bi";
import { RiRefund2Line, RiSecurePaymentFill } from "react-icons/ri";

export default function Support() {
    return (
        <section className="relative bg-[#fafafa] py-10">
            <div className="pageWidth">
                <div className="flex flex-wrap lg:flex-nowrap gap-4">
                    <Item icon={<CiDeliveryTruck style={{ width: "40px", height: "40px" }} />} title={"FREE DELIVERY"} desc={"For all orders over $120"} />
                    <Item icon={<BiSupport style={{ width: "40px", height: "40px" }} />} title={"HELP CENTER"} desc={"Dedicated 24/7 support"} />
                    <Item icon={<RiRefund2Line style={{ width: "40px", height: "40px" }} />} title={"SATISFIED OR REFUNDED"} desc={"Free returns within 14 days"} />
                    <Item icon={<RiSecurePaymentFill style={{ width: "40px", height: "40px" }} />} title={"100% SECURE PAYMENTS"} desc={"Accept all payment methods"} />
                </div>
            </div>
        </section>
    )
};


function Item({ icon, title, desc }) {

    return (<div className="flex-1 basis-1/3 md:basis-0">
        <article className="flex gap-2">
            <span className="w-10 h-10">{icon}</span>
            <div className="text-sm">
                <h2 className="font-bold uppercase">{title}</h2>
                <p>{desc}</p>
            </div>
        </article>
    </div>)
}