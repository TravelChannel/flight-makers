import React ,{useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import ReviewsIcon from '@mui/icons-material/Reviews';
import Rating from '@mui/material/Rating';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postRating } from '../../../../API/BackendAPI/RateUsAPI/postRating';

const RateUs = () => {
    const  [isTitle ,setTitle] = useState('');
    const [value, setValue] = useState(2);
    const [isReview ,setReview] = useState('');
    const [isContentFocus, setContentFocus] = useState(false);
    const handleTitle = (e) =>{
        setTitle(e.target.value) ;
    }
    
  const handleSummaryFocus = () => {
    setContentFocus(true);
  };
  const handleReview = (event) =>{
    setReview(event.target.value);
  }

  const RatingObj = {
    title : isTitle,
    stars :value,
    review:isReview

  }

  const onSubmit = async () =>{
    try{
      const responce = await postRating(RatingObj);
      console.log("Rating Responce",responce);
      setTitle('');
      setReview('');
      toast.success('Rating Recieved  Successfully!',
      {autoClose: 2000 });

    }catch(error){
      console.error("Rating Error at UserSide")
    }
  }

  console.log("RatingObj",RatingObj);
  return (
    <div className='Blog_title_main m-3'>
         <div className='dashboard-content-header'>
          <h2>Rate and Review</h2>
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

        <div className='mt-4'>
        <p className='rateus_title text-center'> <span><StarBorderPurple500Icon/></span> Rate Our Services:</p>

            <div className='d-flex justify-content-center'>
                <Box
                    sx={{
                            '& > legend': { mt: 4 },
                        }}
                >
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        className="custom-rating"
                    />
                </Box>
            </div>
        <p className='rateus_title text-center mt-4'> <span><DriveFileRenameOutlineIcon/></span> Write your Name:</p>
                 <div className='promotion_title_main d-flex justify-content-center '>
                        <Box
                        sx={{
                            width: 500,
                            maxWidth: '90%',
                            background:'white',
                            border: 'none'
                        }}
                        > 
                        <TextField fullWidth id="fullWidth" value = {isTitle} onChange={handleTitle} />
                        </Box>
                    </div>

        <p className='rateus_title text-center'> <span><ReviewsIcon/></span> Write your Review:</p>
          <div className='d-flex justify-content-center'>
          <textarea
              className="review_input_field blog_TextArea "
              placeholder={isContentFocus ? "" : "Write here..."}
              onFocus={handleSummaryFocus}
              onBlur={() => setContentFocus(false)}
              value={isReview}
              onChange={(event) => handleReview(event)}
            />
          </div>

          <div className="d-flex justify-content-center m-3">
                <button
                  className="btn btn-primary addBlog_btn "
                  onClick={onSubmit}
                >
                  Submit 
                </button>
        </div>
       
        
        </div>
    </div>
  )
}

export default RateUs;