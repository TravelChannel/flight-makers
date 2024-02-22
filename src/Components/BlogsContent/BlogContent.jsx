import React ,{useState , useEffect}from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import { GetSingleBlog } from '../../API/BackendAPI/BlogsAPI/GetSingleBlog';
import { useParams } from 'react-router';
import LandscapeRoundedIcon from '@mui/icons-material/LandscapeRounded';
const BlogContent = () => {
    const[BlogData ,setBlogData] = useState([]);
    const {mainTitle} = useParams();

    const formattedMainTitle = mainTitle.replace(/-/g, ' ');
    useEffect(()=>{
        const GetBlogData = async()=>{
          try{
            const resp = await GetSingleBlog(formattedMainTitle);
            setBlogData(resp.data.payload.blogsDetails);
            console.log("GetSingleBlogFromAPI",resp);
          }catch(error){
            console.error("userSide Error",error);
          }
        }
        GetBlogData();
      },[]);
  return (
    <div className='container bg-white'>
            <div>
                      <div className='contact_us_heading d-flex justify-content-center'>
                          <LandscapeRoundedIcon className='contact_detail_icon align-self-center'/><h3>{formattedMainTitle}</h3>
                      </div> 
                      {
                        BlogData.map((items,index)=>(
                          <div className="px-3" key = {index}>
                            <h3 class="mainhead_blog">{` ${index+1}: ${items.heading}`}</h3>
                            <p class="blog_text">{items.summary} </p>
                        </div>
                        ))
                      }     
                </div>
    </div>
  )
}

export default BlogContent;