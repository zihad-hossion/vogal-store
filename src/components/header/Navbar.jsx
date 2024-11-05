import CatNav from "../../ui/CatNav";
import Navlist from "../../ui/Navlist";

function Navbar() {
    return (
        <div className="bg-[#333]">
            <div className="flex pageWidth">
                <CatNav />
                <div className="w-full flex items-center justify-between">
                    <Navlist />
                    <a href="#" className="text-[#fdd162] uppercase">🔥 DEAL ZONE</a>
                </div>
            </div>
        </div>
    )
};

export default Navbar;