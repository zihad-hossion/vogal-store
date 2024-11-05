import React from "react";

function Category({ category }) {
    const { title, image } = category;

    return (

        <div className="group/category">
            <div className="relative">
                <a href="#" className="block">
                    <div className="relative overflow-hidden rounded-[50%] mb-5">
                        <img src={image} alt="" className="block min-w-[100%] min-h-[100%] object-cover transition duration-700 ease-in-out group-hover/category:scale-110" />
                    </div>
                    <div className="text-center">
                        <p className="text-base font-medium">{title}</p>
                    </div>
                </a>
            </div>
        </div>
    )
};

export default Category;
