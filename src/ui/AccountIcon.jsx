import React from "react";
import { Link } from "react-router-dom";
import IconBox from "./IconBox";
import { FaRegUserCircle } from "react-icons/fa";


export default function AccountIcon({ handleClick }) {

    return (
        <Link to={"/account"} onClick={handleClick || null} >
            <IconBox text={"Account"} svgIcon={<FaRegUserCircle style={{ width: "20px", height: "20px" }} />} />
        </Link>
    )
};