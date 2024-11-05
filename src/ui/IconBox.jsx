import React from "react";

function IconBox({ svgIcon, text, children, onClick }) {
    return (
        <>
            <div className="text-[#333] text-center p-[10px] relative transition cursor-pointer hover:text-black" onClick={onClick}>
                {svgIcon}
                <p className="text-xs pt-1 uppercase">{text}</p>
                {children}
            </div >
        </>
    )
};

export default IconBox;
