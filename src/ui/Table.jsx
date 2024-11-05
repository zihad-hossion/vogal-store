import React from "react";


export default function Table({ children }) {
    return (
        <table className="w-full overflow-hidden">
            <thead className="bg-yellow-200">
                <tr>
                    <td className="font-medium bg-[#F5F5F5] uppercase p-3">Product</td>
                    <td className="font-medium bg-[#F5F5F5] uppercase p-3">Price</td>
                    <td className="font-medium bg-[#F5F5F5] uppercase p-3">Quantity</td>
                    <td className="font-medium bg-[#F5F5F5] uppercase p-3">Total</td>
                </tr>
            </thead>
            <tbody className="overflow-hidden">
                {children}
            </tbody>
        </table>
    )
};

