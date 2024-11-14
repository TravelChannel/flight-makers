import React, {useState ,useEffect} from 'react'
import { GetBlogs } from '../../../../API/BackendAPI/BlogsAPI/GetBlogs';
import Loader from '../../../../Loader/Loader';
import { DeleteBlog } from '../../../../API/BackendAPI/BlogsAPI/DeleteBlogs';
import { useNavigate } from 'react-router';
import EditBlogModel from '../../MyPanel/Pages/common/EditBlogModel';
import { PaginatedBlogList } from '../../../../API/BackendAPI/BlogsAPI/PaginatedBlogList';
// import { Stack, Pagination } from '@mui/material';
import {Stack, Pagination} from '@mui/material'
import SiteMapData from '../../../../API/BackendAPI/SiteMapAPI/SiteMapData';
const BlogLists = () => {

  const navigate = useNavigate();
  const [isLoading ,setLoading] = useState(false)
  const [blogData ,setBlogData] = useState([]);
  const [isOpen , setIsOpen] = useState(false);
  // -----------------------------------
const [blogID ,setBlogID] = useState('');
const [page, setPage] = useState(1); 
const [pageCount ,setPageCount] = useState();
  // -----------------------------------

  const quotient = Math.floor(pageCount / 10);
  const remainder = pageCount % 10;

  const totalPageCount = quotient + (remainder > 0 ? 1 : 0);


  const ArrangeDateFormat = (JourneyDate) => {
    const formattedDate = new Date(JourneyDate).toLocaleDateString('en-GB');
    return formattedDate;
  };

  const handleDeletBlog = async(id) =>{
    try {
      const blogResponce= await DeleteBlog(id);
      console.log("DeleteBlog-Response:", blogResponce);
      setBlogData(blogData.filter(item => item.id !== id));
  } catch (error) {
      console.error("PromotionError", error);
  }
  }

//   const handleBlogLists = async () => {
//     try {
//       setLoading(true);
//         const response = await GetBlogs();
//         setBlogData(response.data.payload.blogs); 
//         setLoading(false);
//         console.log("Response from Get Blog API:", response);
//     } catch (error) {
//         console.log("Error on GetBlog API:", error);
//     }
// }

//   useEffect(() => {
//     handleBlogLists();
// }, []);

const handleBlogLists = async () => {
  try {
    // setLoading(true);
    const pageSize = 10;
      const obj = {
        page:page,
        pageSize:pageSize
      }
      const response = await PaginatedBlogList(obj);
      setBlogData(response.data.payload.blogs); 
      setPageCount(response.data.payload.count.totalPages);
      // setLoading(false);
      console.log("Response from Get Blog API:", response);
  } catch (error) {
      console.log("Error on GetBlog API:", error);
  }
}

useEffect(() => {
  handleBlogLists();
}, [page]);
// -----------------
const handleEditModel = (id)=>{
  setIsOpen(!isOpen);
  setBlogID(id)
}

const handleChange = (event, value) => {
  setPage(value);
};

// -----------Sitemap API Access------------
// const handleSiteMapData = async() =>{
// try{
//   const responce = await SiteMapData();
//   console.log("sitemap-responce",responce);
// }catch(error){
// console.error("Error while Fetching SiteMap Data");
// }
// }
// -----------------
  return (
    isLoading ?(<Loader/>):
    (
      <div className='m-3'>
        <div className='dashboard-content-header'>
          <h2>Blogs List </h2>
          <div className='dashboard-content-search'>
            <input
              type='text'
              value={''}
              placeholder='Search..'
              className='dashboard-content-input'
            //   onChange={e => __handleSearch(e)}
            />
          </div>
        </div>
        
        {/* {blogData && blogData.length > 0 ?( */}
          <table className="table table-bordered mt-5">
                      <thead>
                          <tr> 
                              {/* <th className="promotion_design">Serial No</th> */}
                              <th className="promotion_design" >ID</th>
                              <th className="promotion_design" >CategoryID</th>
                              <th className="promotion_design">Title</th>
                              {/* <th className="promotion_design">Discription</th> */}
                              {/* <th className="promotion_design">Image</th> */}
                              <th className="promotion_design">CreatedAt</th>
                              <th className="promotion_design">Author</th>
                              <th className="promotion_design">isActive</th>
                              <th className="promotion_design">Action</th>



                          </tr>
                      </thead>
                          <tbody>
                              {
                                blogData.map((items,index)=>(
                                  <tr key={index}>
                                    {/* <td>{`${index+1}`}</td> */}
                                    <td>{items.id}</td>
                                    <td>{items.blogTypeId != null ? `${items.blogTypeId}` : 'Null'}</td>
                                    <td>{items.mainTitle != null ? `${items.mainTitle}` : 'Null'}</td>
                                    {/* <td>{items.shortDescription != null ? items.shortDescription : 'Null'}</td> */}
                                    <td>{ArrangeDateFormat(items.createdAt)}</td>
                                    <td>{items.author != null ? items.author : 'null'}</td>
                                    <td>{items.isActive != null ? (items.isActive ? 'True' : 'False') : 'null'}</td>
                                    <td className='promotions_table_btn'>
                                                  <div>
                                                      <button
                                                          className='btn btn-primary buttons_typo user_cancelation_button' onClick={()=>handleEditModel(items.id)}>
                                                          Edit
                                                      </button>
                                                  </div>
                                                  <div className='mt-2'>
                                                      <button
                                                          className='btn btn-primary buttons_typo_delt ' onClick={()=>handleDeletBlog(items.id)} >
                                                            Delete
                                                      </button>
                                                  </div>
                                    </td>
                                </tr>
                                ))
                              }
                      </tbody>
                  </table>
                  {/* ):(
                        <h3 className='text-center lists_empty_message'>Sorry, there are no blogs to display at this page .</h3>
                      )
                    } */}
                <div className='d-flex justify-content-center py-3'>
                      <Stack spacing={2}>
                        <Pagination
                        count={totalPageCount} 
                        page={page} 
                        onChange={handleChange}
                          color="primary"
                          size="medium" 
                          //  shape="rounded"
                          //  showFirstButton 
                          //  showLastButton
                          />
                      </Stack>
                </div>

                {
                    isOpen && (
                        <EditBlogModel
                        isOpen={isOpen} setIsOpen ={setIsOpen}
                        blogID = {blogID}
                        handleBlogLists ={handleBlogLists}

                        />
                    )
                }
      </div>
    )
  )
}

export default BlogLists;