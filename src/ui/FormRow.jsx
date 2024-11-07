import React from "react";

export default function FormRow({ label, error, children, customStyle, errStyle }) {

    return (
        <div className={customStyle ? `relative ${customStyle}` : "relative"}>
            {label && <label htmlFor={children?.props?.id} className="capitalize">{label}</label>}
            {children}
            {error && <span className={errStyle ? `block text-xs text-red-700 font-medium ml-1 mt-2 ${errStyle}` : "text-xs text-red-700 font-medium ml-1 mt-1"}>{error}</span>}
        </div>
    )
};

