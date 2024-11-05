import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import useWindowSize from "../../hooks/useWindowSize";

export default function FooterList() {
    const windowWidth = useWindowSize();

    return (
        <>
            {windowWidth > 575 ? <DeskLists /> : <MobLists />}
        </>
    )
}
function DeskLists() {
    return (
        <>
            <DeskList />
            <DeskList />
            <DeskList />
        </>
    )
}
function DeskList() {
    return (
        <div className="footerList col-span-3  lg:col-span-2">
            <h1 className="text-[13px] lg:text-sm font-medium uppercase tracking-[1px] mb-2">Information</h1>
            <ul className="mt-6">
                <li><a href="#">Latest News</a></li>
                <li><a href="#">Career</a></li>
                <li><a href="#">My Account</a></li>
                <li><a href="#">My Cart</a></li>
                <li><a href="#">Orders and Returns</a></li>
                <li><a href="#">Contact Us</a></li>
            </ul>
        </div>
    )
}

function MobLists() {
    const [listOpen, setlistOpen] = useState(null);

    function handleListOpen(num) {
        setlistOpen(listOpen === num ? null : num);
    }

    const lists = ["Information", "Popular Collections", "Customer Service"];

    return lists.map((title, index) => (
        <MobList
            key={index}
            title={title}
            isOpen={listOpen === index + 1}
            onClickList={() => handleListOpen(index + 1)}
        />
    ));
}

function MobList({ title, onClickList, isOpen }) {
    return (
        <div className="mb-4 footerList col-span-full">
            <div onClick={onClickList} className="flex justify-between flist">
                <h1 className="text-xs font-medium uppercase tracking-[1px] mb-2">{title}</h1>
                <FaChevronDown className={`${isOpen ? "-rotate-180" : ""} w-3 h-3 transition`} />
            </div>
            {isOpen && (
                <ul className={`${isOpen ? "h-auto visible scale-y-100" : "h-0 scale-y-0 hidden"} origin-[0_0] transition-transform`}>
                    <li><a href="#">Latest News</a></li>
                    <li><a href="#">Career</a></li>
                    <li><a href="#">My Account</a></li>
                    <li><a href="#">My Cart</a></li>
                    <li><a href="#">Orders and Returns</a></li>
                    <li><a href="#">Contact Us</a></li>
                </ul>
            )}
        </div>
    );
}