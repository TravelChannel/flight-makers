import React, { useEffect ,useState} from 'react';
import { useFormData } from '../Context/FormDataContext';
import * as images from '../Constant/images';
import { GetBlogs } from '../API/BackendAPI/BlogsAPI/GetBlogs';
import { useNavigate } from 'react-router';
const BlogCollection = () => {
  const navigate = useNavigate();
  const { setShowHeader, setTopNavBar } = useFormData();
  const [blogData , setBlogData] = useState([]);
  const [isData ,setData] = useState(true);

  useEffect(()=>{
    const GetBlogData = async()=>{
      try{
        const resp = await GetBlogs();
        setBlogData(resp.data.payload);
        console.log("GetBlogDataFromAPI",resp);
      }catch(error){
        console.error("userSide Error",error);
      }
    }
    GetBlogData();
  },[]);

  useEffect(() => {
    setShowHeader(false);
    setTopNavBar(false);

    return () => {
      setShowHeader(true);
      setTopNavBar(true);
    };
  }, [setShowHeader, setTopNavBar]);

  const handleBlogContent = (mainTitle) =>{
    const formattedTitle = mainTitle.replace(/\s+/g, '-'); // Replace spaces with hyphens
   navigate(`/blogContent/${encodeURIComponent(formattedTitle)}`);
  }

  return (
    <div className='my_custom_section bg-white'>
      <div className=" blog_main_section">
          <div className="sec_content_blog overlay_blog">
            <h1 className="blog_heading">Your Journey Begins Here</h1>
            <p className="blog_main">Travel More</p>
          </div>
      </div>
      <div className="container">
      {blogData.length ? 
          (<div className="d-flex justify-content-start flex-wrap ">
          {blogData.map((items,index)=>(
                <div className="blog1" key={index} onClick={()=>handleBlogContent(items.mainTitle)}>
                  <div className="blogimg">
                    <img className="img_detail" src={items.img} alt="" width = '100%' />
                  </div>
                  <h5 className='Blogtitle'>{items.mainTitle}</h5>
                </div>
              ))
            }
          </div>):(
            <h2 className='NoBlogFound'>No Blogs Found</h2>
          )
        }
      </div>
    </div>
  );
};

export default BlogCollection;