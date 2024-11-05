import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useGetProductsQuery } from "../services/apiProducts";
import Loader from "./Loader";
import { IoCloseOutline } from "react-icons/io5";

function SearchBox() {
    const [searchItem, setSearchItem] = useState('');
    const [filteredProducts, setFilteredProducts] = useState();
    const [isLoading, setLoading] = useState(true);
    const [isCancelButton, setIsCancelButton] = useState(false);
    const { data: products } = useGetProductsQuery();

    function handleInputChange(e) {
        let searchTerm = e.target.value;
        setSearchItem(searchTerm);

        if (searchTerm) {
            let filteredProducts = products.filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase()))

            if (searchTerm.length > 2) {
                setLoading(false);
                setFilteredProducts(filteredProducts);
                setIsCancelButton(true)
            }
        } else {
            setLoading(true);
            setFilteredProducts();
            setIsCancelButton(false);
        }
    }

    function clearSearch() {
        setSearchItem('');
        setFilteredProducts();
        setIsCancelButton(false);
    }

    return (
        <div className="flex flex-1 mgr relative">
            <form className="w-full rounded-[5px] relative border border-[rgba(0,0,0,0)]">
                <div className="flex">
                    <input type="search" className="w-full h-[42px] text-sm text-[#444] bg-[#f5f5f5] rounded-tl-[5px] rounded-bl-[5px] px-5" placeholder="Search products" value={searchItem} onChange={handleInputChange} />
                    {isCancelButton && <span className="absolute right-14 top-2" onClick={clearSearch}>
                        <IoCloseOutline style={{ width: "25px", height: "25px" }} />
                    </span>}
                    <button type="submit" className="w-[45px] h-[42px] text-white bg-[#f0ae00] rounded-[0_5px_5px_0] hover:bg-[#ba9333] transition">
                        <CiSearch className="w-[22px] h-[22px]" />
                    </button>
                </div>
            </form>
            {searchItem &&
                (<ul className="w-full min-h-40 bg-white p-3 absolute top-[100%] z-10 shadow">
                    {!isLoading ? <SearchItem product={filteredProducts} searchItem={searchItem} onClear={clearSearch} /> : <Loader />}
                </ul>)
            }
        </div >
    )
};

export default SearchBox;

function SearchItem({ product, onClear, searchItem }) {
    if (searchItem.length > 2 && product.length === 0) {
        return <p>No products found</p>;
    }

    return (
        <>
            {product?.map((item, index) =>
                <Link to={`/collections/${item.id}`} key={index} onClick={onClear} className="flex items-center my-1">
                    <img src={item.image} alt="product Image" className="w-16" />
                    <h3 className="font-medium">{item.title}</h3>
                </Link>
            )}
        </>
    )
}