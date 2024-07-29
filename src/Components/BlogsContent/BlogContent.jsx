import React ,{useState , useEffect}from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import { GetSingleBlog } from '../../API/BackendAPI/BlogsAPI/GetSingleBlog';
import { useParams } from 'react-router';
import LandscapeRoundedIcon from '@mui/icons-material/LandscapeRounded';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { useNavigate } from 'react-router';
import BlogsSearchEngine from './BlogsSearchEngine';

const BlogContent = () => {
   const navigate = useNavigate();
    const[BlogData ,setBlogData] = useState([]);
    const {headerUrl} = useParams();

    const formattedMainTitle = headerUrl.replace(/-/g,' ');
    useEffect(()=>{
        const GetBlogData = async()=>{
          try{
            const resp = await GetSingleBlog(headerUrl);
            setBlogData(resp.data.payload);
            console.log("GetSingleBlogFromAPI",resp.data.payload);
          }catch(error){
            console.error("userSide Error",error);
          }
        }
        GetBlogData();
      },[]);
      const backNavigation = () =>{
        navigate(-1);
        window.scrollTo(0,0);
      }
  return (
    <div className="container bg-white">
      <div className="contact_us_heading d-flex justify-content-start blog_discp w-100">
        <div className="blog_sub_icon">
          <ReplyAllIcon onClick={backNavigation} className="navigation_arrow" />
        </div>
        <div className="d-flex justify-content-center blog_sub_heading">
          <LandscapeRoundedIcon className="contact_detail_icon align-self-center" />
          <h3>{formattedMainTitle}</h3>
        </div>
      </div>
      <div className="row">

        <div className="col-md-8">
          <div className="px-4 py-3 blogs_content_allignment">
            <div dangerouslySetInnerHTML={{ __html: BlogData.description }} />
          </div>
        </div>

        <div className="my-3 col-md-4 engine_posion_handling">
              <BlogsSearchEngine/>
        </div>
      </div>
    </div>
  );
}

export default BlogContent;