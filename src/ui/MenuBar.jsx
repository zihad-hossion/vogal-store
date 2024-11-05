import { IoMenu } from "react-icons/io5";

function MenuBar() {
    return (
        <div className="min-w-[35px] max-w-[35px] flex items-center flex-1">
            <a href="#" className="block p-[5px]">
                <IoMenu size={"25px"} />
            </a>
        </div>
    )
};

export default MenuBar;
