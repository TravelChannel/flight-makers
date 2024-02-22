import React, {useState ,useEffect} from 'react'
import { GetBlogs } from '../../../../API/BackendAPI/BlogsAPI/GetBlogs';
import Loader from '../../../../Loader/Loader';
import { DeleteBlog } from '../../../../API/BackendAPI/BlogsAPI/DeleteBlogs';
import { UpdateBlogAPI } from '../../../../API/BackendAPI/BlogsAPI/UpdateBlog';
import { useNavigate } from 'react-router';
const BlogLists = () => {

  const navigate = useNavigate();
  const [isLoading ,setLoading] = useState(false)
  const [blogData ,setBlogData] = useState([]);

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

  const handleUpdateBlog = async(id) =>{
  //   try {
  //     const updateblogResp= await UpdateBlogAPI(id);
  //     console.log("DeleteBlog-Response:", updateblogResp);
  // } catch (error) {
  //     console.error("PromotionError", error);
  // }
  window.open(`/addBlog/${encodeURIComponent(id)}`, '_blank');
  }

  useEffect(() => {
    const handleBlogLists = async () => {
        try {
          setLoading(true);
            const response = await GetBlogs();
            setBlogData(response.data.payload); 
            setLoading(false);
            console.log("Response from Get Blog API:", response);
        } catch (error) {
            console.log("Error on GetBlog API:", error);
        }
    }
    handleBlogLists();
}, []);
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
        <table className="table table-bordered mt-5">
                    <thead>
                        <tr> 
                            {/* <th className="promotion_design">Serial No</th> */}
                            <th className="promotion_design" >ID</th>
                            <th className="promotion_design">Title</th>
                            <th className="promotion_design">Discription</th>
                            {/* <th className="promotion_design">Image</th> */}
                            <th className="promotion_design">CreatedAt</th>
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
                          <td>{items.mainTitle != null ? `${items.mainTitle}` : 'Null'}</td>
                          <td>{items.description != null ? items.description : 'Null'}</td>
                          <td>{ArrangeDateFormat(items.createdAt)}</td>
                          {/* <td>{items.img}</td> */}
                          <td>{items.isActive != null ? (items.isActive ? 'True' : 'False') : 'null'}</td>
                          <td className='promotions_table_btn'>
                                        <div>
                                            <button
                                                className='btn btn-primary buttons_typo user_cancelation_button' onClick={()=>handleUpdateBlog(items.id)} target ='_blank'>
                                                Update
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
      </div>
    )
  )
}

export default BlogLists;