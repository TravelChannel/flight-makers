import React ,{useState ,useEffect,Fragment} from 'react';
import { GetBlogsbyCategory } from '../../API/BackendAPI/BlogsAPI/getBlogbyCategory';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router';
const BlogbyCategory = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const { id, categoryName } = state;
    const modifiedCategoryName = categoryName.replace(/ /g, '-');
    const [blogData , setBlogData] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize ,setPageSize] = useState(5);
    const [isNextPage ,setNextPage] = useState();
    const blogByCategory = async() =>{
        try{
            const responce = await GetBlogsbyCategory(id);
            if(responce.data.status === 'SUCCESS'){
              console.log('getBlogDataBy-Category',responce);
              const newBlogData = responce.data.payload.blogs;
              setBlogData(newBlogData);
              setNextPage(responce.data.payload.hasNextPage);
              
              console.log("newBlogData",newBlogData);
            }else{
              console.error("error at category-api");
            }
          } catch(error){
            console.error("error at getBlogDataBy-Category",error);
          }
    }

    useEffect(()=>{
        blogByCategory();
    },[]);

    const handleBlogContent = (headerUrl) =>{
        // const formattedTitle = mainTitle.replace(/\s+/g, '-'); 
        navigate(`/${encodeURIComponent(modifiedCategoryName)}/${encodeURIComponent(headerUrl)}`);
      }
      const handleChange = () => {
        setPage(prevPage => prevPage +1);
        
      };
  
  return (
    <div className='container bg-white '>
        <div className=" blog_sub_section">
            <div className="sec_content_blog overlay_blog">
                <h1 className="blog_heading">{categoryName}</h1>
                <p className="blog_main">Travel More</p>
            </div>
      </div>
      <div>
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
                    <button id="load-more-posts" className="btn btn-primary btn-loadmore" onClick={handleChange} 
                    disabled={!isNextPage}
                     >
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
}

export default BlogbyCategory;