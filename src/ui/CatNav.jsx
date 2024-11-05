import { AnimatePresence, motion, } from "framer-motion";
import SubNavList from "../ui/SubNavList";
import { CiMenuFries } from "react-icons/ci";
import { GoChevronDown, GoChevronRight } from "react-icons/go";


function CatNav() {

    const childVariants = {
        hover: {
            y: 0,
            opacity: 1,
            display: "block",
            transition: {
                ease: "easeIn",
                duration: 0.3
            },
        },
        initial: {
            y: 20,
            opacity: 0,
            display: "none",
            transition: {
                ease: "easeOut",
                duration: 0.3
            },
        },
    };

    return (
        <motion.div whileHover={"hover"} initial="initial" className="flex relative">
            <div className="text-white min-w-[220px] flex items-center gap-3 relative border-r-2 border-[#666] pr-[15px] transition cursor-pointer hover:text-[#fdd162]">
                <CiMenuFries />
                <span className="text-xs font-medium uppercase">Browse Categories</span>
                <GoChevronDown />
                <CatNavList childAnimation={childVariants} />
            </div>
        </motion.div>
    )
};

export default CatNav;

function CatNavList({ childAnimation }) {

    const categories = [
        {
            name: "Smartwatches",
        },
        {
            name: "Smart TVs",
            link: "#",
            icon: <GoChevronRight />,
            subList: [
                <SubNavList key={1} />,
                <SubNavList key={2} />,
                <SubNavList key={3} />,
                <SubNavList key={4} />
            ]
        },
        {
            name: "Laptops & Computers",
            link: "#"
        },
        {
            name: "Audios & Video",
            link: "#"
        },
        {
            name: "Mobile & Tablets",
            link: "#"
        },
        {
            name: "Cameras",
            link: "#"
        },
        {
            name: "Video Games",
            link: "#"
        },
        {
            name: "Printers & Ink",
            link: "#"
        },
        {
            name: "Headphones",
            link: "#"
        },
    ];

    const subVariants = {
        hover: {
            left: "100%",
            opacity: 1,
            display: "block",
            transition: {
                ease: "easeIn",
                duration: 0.3
            },
        },
        initial: {
            left: "90%",
            opacity: 0,
            display: "none",
            transition: {
                ease: "easeOut",
                duration: 0.3
            },
        },
    };

    return (
        <>
            <motion.ul variants={childAnimation} className="w-[250px] bg-white absolute left-0 top-full py-[12px] mr-[1px] rounded-[0px_0px_6px_6px] z-50">
                {categories?.map((item, index) => (
                    <motion.li initial="initial" whileHover={"hover"} key={index}>
                        <a href="#" className="text-sm p-[8px_20px_8px_25px] flex items-center justify-between">
                            <span>{item.name}</span>
                            {item?.icon}
                        </a>
                        {item?.subList && (
                            <AnimatePresence>
                                <motion.div variants={subVariants}
                                    className="min-h-full max-h-[550px] min-w-[950px] bg-white p-[30px_35px_20px] absolute top-0">
                                    <ul className="flex flex-1 gap-10 relative">
                                        {item?.subList}
                                    </ul>
                                </motion.div>
                            </AnimatePresence>
                        )}
                    </motion.li>
                ))}
            </motion.ul>
        </>
    )
}