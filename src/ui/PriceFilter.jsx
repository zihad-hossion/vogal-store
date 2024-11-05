import React, { useState, useEffect } from "react";

export default function PriceFilter({ onPriceChange }) {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(2000);
    const priceGap = 100;
    const maxRange = 2000;

    const handleMinInputChange = (e) => {
        let value = parseInt(e.target.value);
        if (maxPrice - value >= priceGap) {
            setMinPrice(value);
        }
    };

    const handleMaxInputChange = (e) => {
        let value = parseInt(e.target.value);
        if (value - minPrice >= priceGap) {
            setMaxPrice(value);
        }
    };

    const handleRangeMinChange = (e) => {
        let value = parseInt(e.target.value);
        if (maxPrice - value >= priceGap) {
            setMinPrice(value);
        }
    };

    const handleRangeMaxChange = (e) => {
        let value = parseInt(e.target.value);
        if (value - minPrice >= priceGap) {
            setMaxPrice(value);
        }
    };

    useEffect(() => {
        onPriceChange(minPrice, maxPrice);
    }, [minPrice, maxPrice,]);

    return (
        <>
            <h1 className="text-lg mb-4">Price</h1>
            <div className="mb-10">
                <div className="flex mb-5">
                    <input type="number" name="min" value={minPrice} onChange={handleMinInputChange}
                        className="block max-w-[80px] border border-[#ddd] px-[10px] py-[5px]" />
                    <span className="text-3xl mx-2">-</span>
                    <input type="number" name="max" value={maxPrice} onChange={handleMaxInputChange}
                        className="block max-w-[80px] border border-[#ddd] px-[10px] py-[5px]" />
                </div>
                <div className="w-48 h-1.5 bg-[#ddd] relative rounded-md overflow-hidden">
                    <div className="h-full bg-[#17A2B8] absolute rounded-md"
                        style={{
                            left: `${(minPrice / maxRange) * 100}%`,
                            right: `${100 - (maxPrice / maxRange) * 100}%`,
                        }}
                    ></div>
                </div>
                <div className="w-48 relative">
                    <input type="range"
                        min="0" max={maxRange} value={minPrice} step="100" onChange={handleRangeMinChange}
                        className="w-full h-1.5 absolute -top-1.5 bg-transparent pointer-events-none appearance-none focus:border-none"
                    />
                    <input type="range"
                        min="0" max={maxRange} value={maxPrice} step="100" onChange={handleRangeMaxChange}
                        className="w-full h-1.5 absolute -top-1.5 bg-transparent pointer-events-none appearance-none focus:border-none"
                    />
                </div>
            </div>
        </ >
    )
};