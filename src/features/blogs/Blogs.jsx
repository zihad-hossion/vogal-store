import React from "react";
import { useGetBlogsQuery } from "../../services/apiBlogs";
import Blog from "./Blog";
import SectionContainer from "../../ui/SectionContainer";
import Loader from "../../ui/Loader";


function Blogs() {
    const { isLoading, data: blogs } = useGetBlogsQuery();

    return (<>
        <SectionContainer title={"latest blogs"}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {blogs?.map((item) => <Blog key={item.id} blog={item} />)}
            </div>
        </SectionContainer>
    </>)
};

export default Blogs;
