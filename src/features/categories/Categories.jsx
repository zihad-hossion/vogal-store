import { useGetCategoriesQuery } from "../../services/apiCategories";
import SectionContainer from "../../ui/SectionContainer";
import Category from "./Category";
import Loader from "../../ui/Loader";

function Categories() {
    const { isLoading, data: categories } = useGetCategoriesQuery();
    if (isLoading || !categories) return <Loader />;

    return (
        <>
            <SectionContainer title={"Top Categories"}>
                <div className="grid grid-cols-2 gap-12 sm:grid-cols-3 lg:grid-cols-5 lg:gap-16">
                    {categories?.map((item) => <Category key={item.id} category={item} />)}
                </div>
            </SectionContainer>
        </>

    )
};

export default Categories;

