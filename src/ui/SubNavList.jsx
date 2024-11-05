import React from "react";

function SubNavList() {

    return (
        <li className="relative">
            <a href="#" className="inline-block font-bold mb-3">Homepages</a>
            <ul className="">
                <NavList />
                <NavList />
                <NavList />
                <NavList />
                <NavList />
                <NavList />
                <NavList />
                <NavList />
                <NavList />
                <NavList />
                <NavList />
                <NavList />
            </ul>
        </li>
    )
};

export default SubNavList;

function NavList() {

    return (
        <li className="mb-[10px]"><a href="#" className="text-[#555] text-xs inline-flex hover:text-black">Home Default</a></li>
    )
}