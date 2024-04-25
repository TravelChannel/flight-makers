import React, { useEffect ,useState,Fragment} from 'react';
import { useFormData } from '../Context/FormDataContext';
import { useNavigate } from 'react-router';
import Loader from '../Loader/Loader';
import { BlogByPagination } from '../API/BackendAPI/BlogsAPI/BlogByPagination';
import { GetCategory } from '../API/BackendAPI/BlogsAPI/getCategory';

import * as images from '../Constant/images';
import { Link } from 'react-router-dom';
const BlogCollection = () => {
  const navigate = useNavigate();
  const { setShowHeader, setTopNavBar } = useFormData();
  const [blogData , setBlogData] = useState([]);
  const [isLoading ,setLoading] = useState(false);
  const [pageSize ,setPageSize] = useState(15);
  const [page, setPage] = useState(1);
  const [isNextPage ,setNextPage] = useState();
  const [airlineOptions, setAirlineOptions] = useState([]);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
      setNextPage(responce.data.payload.hasNextPage);
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

  const handleBlogByCategory =async(id,categoryName) =>{
    const modifiedCategoryName = categoryName.replace(/ /g, '-');
    navigate(`/category/${modifiedCategoryName}`, { state: {id, categoryName } });
  }

  useEffect(() => {
    const handleGetCategory = async () => {
        try {
            const response = await GetCategory();
            const options = response.data.payload.map(item => ({
                value: item.id,
                label: item.name
            }));
            setAirlineOptions(options);
            console.log("options",options);
        } catch (error) {
            console.error("Error fetching airline dropdown:", error);
        }
    };
    handleGetCategory();
}, []);


useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };
  window.addEventListener("resize", handleResize);
  return () => {
    window.removeEventListener("resize", handleResize);
  }
}, [])
  return (
    isLoading ? (<Loader/>) :(
      <div className='my_custom_section bg-white'>
      <div className=" blog_main_section">
      <div className='mt-1'>
        <Link to = '/'>
        <img src={images.fmBlogLogo} alt="" width='200px' />
        </Link>
      </div>
            <div className="sec_content_blog overlay_blog">
              <h1 className="blog_heading">Your Journey Begins Here</h1>
              <p className="blog_main">Travel More</p>
            </div>
              <ul className="bottom_text">
              {airlineOptions.map(option => (
                <li
                  key={option.value}
                  className="blog_heading category_menu"
                  onClick={() => handleBlogByCategory(option.value, option.label)}
                >
                  {option.label}
                </li>
              ))}
              </ul>
      </div>
        {/* <div className='blog_bc_image'>
              <img src={images.blogBackGround} alt="" width = '100%' />
       </div> */}
      <div className="container">
      {blogData.length ? 
          (
           <Fragment>
           <div className={`${isMobile ? 'd-flex justify-content-between  flex-wrap':'d-flex justify-content-start  flex-wrap'}`}>
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
          <button id="load-more-posts" className="btn btn-primary btn-loadmore" 
          onClick={handleChange}
          disabled={!isNextPage}
          >
            Load More
            </button>
          </div>
           </Fragment>
          ):(
            " "
          )
        }
      </div>
    </div>
    )
  );
};

export default BlogCollection;