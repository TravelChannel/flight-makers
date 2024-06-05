import React ,{useState, useEffect} from 'react'
import { GetRatings } from '../../../API/BackendAPI/RateUsAPI/GetRatingAPI';
import Loader from '../../../Loader/Loader';
import { DeleteRating } from '../../../API/BackendAPI/RateUsAPI/DeleteRating';
import { dataNotfound } from '../../../Constant/images';
import { ToggleRating } from '../../../API/BackendAPI/RateUsAPI/ToggleRating';

const RatingList = () => {
    const [isLoading ,setLoading] = useState(false);
    const [RatingList ,setRatingList] =useState([]);


    const ArrangeDateFormat = (JourneyDate) => {
        const formattedDate = new Date(JourneyDate).toLocaleDateString('en-GB');
        return formattedDate;
      };
      const handleBlogLists = async () => {
        try {
          setLoading(true);
            const response = await GetRatings();
            setRatingList(response.data.payload); 
            setLoading(false);
            console.log("Response from RatingList API:", response);
        } catch (error) {
            console.log("Error on RatingList API:", error);
        }
    }

    useEffect(() => {
        handleBlogLists();
    }, []);

    const handleDeletRating = async(id) =>{
        try {
          const blogResponce= await DeleteRating(id);
          console.log("DeleteRating-Response:", blogResponce);
          setRatingList(RatingList.filter(item => item.id !== id));
      } catch (error) {
          console.error("PromotionError", error);
      }
      }

  const handleApprovedReqs =async (id) =>{
     try{
        const responce = await ToggleRating(id);
        console.log("Rating Toggle-Result",responce);
        handleBlogLists();
     }catch(error){
        console.error("Error at toggleRating",error);
     }
  }

//   useEffect(() => {
//     setTimeout(() => {
//         setLoading(false);
//     }, 30000);
//   }, []);
  
      return (
        isLoading ? (<Loader />) : (
            RatingList.length === 0 ? (
              <div className='text-center py-5 bg-white'>
              <img className='dataNotfound' src={dataNotfound} alt='dataNotfound' />
              <h2>No Ratings  found</h2>
              <p>Explore Destinations, Book Your Flight </p>
            </div>
            ) : (
                <div className='m-3'>
                    <div className='dashboard-content-header'>
                        <h2>Customer Ratings List </h2>
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
                    <div className='table-responsive '>
                    <table className="table table-bordered mt-5">
                        <thead>
                            <tr>
                                <th className="promotion_design" >ID</th>
                                <th className="promotion_design">Title</th>
                                <th className="promotion_design">Review</th>
                                <th className="promotion_design">Stars</th>
                                <th className="promotion_design">CreatedAt</th>
                                <th className="promotion_design">Status</th>
                                <th className="promotion_design">Operation</th>
                                <th className="promotion_design">Action</th>
                              

                            </tr>
                        </thead>
                        <tbody>
                            {RatingList.map((items, index) => (
                                <tr key={index}>
                                    <td>{items.id}</td>
                                    <td>{items.title != null ? `${items.title}` : 'Null'}</td>
                                    <td>{items.review != null ? items.review : 'Null'}</td>
                                    <td>{items.stars != null ? items.stars : 'Null'}</td>
                                    <td>{ArrangeDateFormat(items.createdAt)}</td>
                                    <td>{items.isActive === false ? 'Pending' :'Approved'}</td>
                                    <td>
                                                {
                                                    <button className='btn btn-secondary buttons_typo' onClick={()=>handleApprovedReqs(items.id)}>
                                                   {items.isActive === false ? 'Approved' :'DisApproved' } 
                                                    </button>
                                                }
                                    </td>
                                    <td className='promotions_table_btn'>
                                        <div >
                                            <button
                                                className='btn btn-primary buttons_typo_delt '
                                                onClick={() => handleDeletRating(items.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                   
                                </tr>
                            ))}

                        </tbody>
                    </table>
                    </div>     
                </div>
            )
        )
    )
}

export default RatingList;