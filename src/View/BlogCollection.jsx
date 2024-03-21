import React, { useEffect ,useState,Fragment} from 'react';
import { useFormData } from '../Context/FormDataContext';
import { useNavigate } from 'react-router';
import Loader from '../Loader/Loader';
import { BlogByPagination } from '../API/BackendAPI/BlogsAPI/BlogByPagination';
import * as images from '../Constant/images';
const BlogCollection = () => {
  const navigate = useNavigate();
  const { setShowHeader, setTopNavBar } = useFormData();
  const [blogData , setBlogData] = useState([]);
  const [isLoading ,setLoading] = useState(false);
  const [pageSize ,setPageSize] = useState(15);
  const [page, setPage] = useState(1);

  const getBlogbypage = async () =>{
    try{
      const obj = {
        pageNumber :page,
        pageSize :pageSize
      }
      const responce = await BlogByPagination(obj);
      console.log('blogbyPage-Responce',responce);
      const newBlogData = responce.data.payload.blogs;
      setBlogData(prevBlogData => [...prevBlogData, ...newBlogData]);
    }catch(error){
      console.error("Error1",error);
    }
  }

  useEffect(()=>{
    getBlogbypage();
  },[page]);

  useEffect(() => {
    setShowHeader(false);
    setTopNavBar(false);

    return () => {
      setShowHeader(true);
      setTopNavBar(true);
    };
  }, [setShowHeader, setTopNavBar]);

  const handleBlogContent = (headerUrl) =>{
    // const formattedTitle = mainTitle.replace(/\s+/g, '-'); 
    navigate(`/blogs/${encodeURIComponent(headerUrl)}`);
  }
  const handleChange = () => {
    setPage(prevPage => prevPage +1);
  };

  return (
    isLoading ? (<Loader/>) :(
      <div className='my_custom_section bg-white'>
      <div className=" blog_main_section">
          <div className="sec_content_blog overlay_blog">
            <h1 className="blog_heading">Your Journey Begins Here</h1>
            <p className="blog_main">Travel More</p>
          </div>
          <div className='blog_bc_image'>
              <img src={images.blogBackGround} alt="" width = '100%' />
          </div>
      </div>
      <div className="container">
      {blogData.length ? 
          (
           <Fragment>
           <div className="d-flex justify-content-start flex-wrap ">
              {blogData.map((items,index)=>(
                      <div className="blog1" key={index} onClick={()=>handleBlogContent(items.headerUrl)}>
                        <div className="blogimg">
                          <img className="img_detail" src={items.img} alt="" width = '100%' />
                        </div>
                        <h5 className='Blogtitle'>{items.mainTitle}</h5>
                      </div>
                  ))
                }
          </div>
          <div className='d-flex justify-content-center py-3'>
          <button id="load-more-posts" className="btn btn-primary btn-loadmore" onClick={handleChange}>
            Load More
            </button>
          </div>
           </Fragment>
          ):(
            <h2 className='NoBlogFound'>No Blogs Found</h2>
          )
        }
      </div>
    </div>
    )
  );
};

export default BlogCollection;