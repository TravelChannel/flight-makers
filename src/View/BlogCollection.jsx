import React, { useEffect } from 'react';
import { useFormData } from '../Context/FormDataContext';
import * as images from '../Constant/images';

const BlogCollection = () => {
  const { setShowHeader, setTopNavBar } = useFormData();

  useEffect(() => {
    setShowHeader(false);
    setTopNavBar(false);

    return () => {
      setShowHeader(true);
      setTopNavBar(true);
    };
  }, [setShowHeader, setTopNavBar]);

  return (
    <div className='my_custom_section bg-white'>
      <div className=" blog_main_section">
          <div className="sec_content_blog overlay_blog">
            <h1 className="blog_heading">Your Journey Begins Here</h1>
            <p className="blog_main">Travel More</p>
          </div>
      </div>
      <div className="container d-flex justify-content-between">
          <div className="blog1">
            <div className="blogimg">
              <img className="img_detail" src={images.blogimg2} alt="" />
            </div>
            <h5>What Should Be on the Bucket List of Every Teen?</h5>
          </div>
          <div className="blog1">
            <div className="blogimg">
              <img className="img_detail" src={images.blogimg3} alt="" />
            </div>
            <h5>What Should Be on the Bucket List of Every Teen?</h5>
          </div>
          <div className="blog1">
            <div className="blogimg">
              <img className="img_detail" src={images.blogimg4} alt="" />
            </div>
            <h5>What Should Be on the Bucket List of Every Teen?</h5>
          </div>
      </div>
    </div>
  );
};

export default BlogCollection;