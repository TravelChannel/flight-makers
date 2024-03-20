import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { AddBlogAPI } from "../../../../API/BackendAPI/BlogsAPI/AddBlogAPI";
import { UpdateBlogAPI } from "../../../../API/BackendAPI/BlogsAPI/UpdateBlog";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from "react-router";
import { GetSingleBlogbyID } from "../../../../API/BackendAPI/BlogsAPI/GetSingleBlog";
import { Input } from "antd";

const AddBlog = () => {

  const {id} = useParams();
  const [singleBlogDetail ,setSingleBlogDetal] = useState([]);
  const [maintitle, setMainTitle] = useState("");
  const [updatedTitle, setUpdateTitle] = useState("");

  const [sections, setSections] = useState([{ heading: "", summary: "" }]);
  const [updateSections, setUpdateSections] = useState([{ heading: "", summary: "" }]);
  
  const [isFocused, setFocused] = useState(false);
  const [isTitleFocused, setTitleFocused] = useState(false);
  const [isContentFocus, setContentFocus] = useState(false);
  const [isSubmitLoading , setSubmitLoading] = useState(false);

  const [imgSrc, setImgSrc] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isClick ,setisClick] = useState(false);
  const [isSuccess ,setIsSuccess] = useState(false);
  const [blogDetail ,setBlogDetail] = useState([]);



  const handleMainTitle = (event) => {
    const value = event.target.value;
    setMainTitle(value);
    setUpdateTitle(value);
  };
  const handleContentFocus = () => {
    setTitleFocused(true);
    setContentFocus(false);
  };

  const handleSummaryFocus = () => {
    setTitleFocused(false);
    setContentFocus(true);
  };

  const addSection = () => {
    setSections([...sections, { heading: "", summary: "" }]);
  };

  const removeSection = (index) => {
    const newSections = [...sections];
    newSections.splice(index, 1);
    setSections(newSections);
  };

  // const handleHeadingChange = (index, event) => {
  //   const newSections = [...sections];
  //   newSections[index].heading = event.target.value;
  //   setSections(newSections);
  //   setSingleBlogDetal(newSections);
  // };

  // const handleSummaryChange = (index, event) => {
  //   const newSections = [...sections];
  //   newSections[index].summary = event.target.value;
  //   setSections(newSections);
  //   setSingleBlogDetal(newSections);
  // };
  const handleHeadingChange = (index, event) => {
    if (sections[index]) {
      const newSections = [...sections];
      newSections[index].heading = event.target.value;
      setSections(newSections);
    }
  };
  
  const handleSummaryChange = (index, event) => {
    if (sections[index]) {
      const newSections = [...sections];
      newSections[index].summary = event.target.value;
      setSections(newSections);
    }
  };
  const handleFocus = () => {
    setFocused(true);
    setTitleFocused(false);
    setContentFocus(false);
  };
  // -------------passing object ------------------
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // Trigger the file input click event
    fileInputRef.current.click();
    setisClick(true);
  };
  const BlogData = {
    mainTitle: id ? updatedTitle : maintitle,
    img: "",
    content: sections,
  };

  console.log("passingObject", BlogData);
  //  -------------------------------------------

  const handleInputImageChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgSrc(reader.result);
        setInputValue(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type. Please select an image (PNG or JPEG).");
    }
  };

  const handleInputImageReset = () => {
    setImgSrc("");
    setInputValue("");
    setisClick(false);
  };

//   -----
const onSubmit = async () => {
    try {
        const formData = new FormData();
        const dataStringify = JSON.stringify(BlogData);
      
        formData.append('data', dataStringify);
      
        const fileInput = document.getElementById('account-settings-upload-image');
        if (fileInput && fileInput.files && fileInput.files[0]) {
          const imgFile = fileInput.files[0]; 
          formData.append('imgFile', imgFile);
        }
           
        const apiResponse = await AddBlogAPI(formData);
        console.log("Response from API", apiResponse);
          if (apiResponse.data.status === 'SUCCESS' ){
            setIsSuccess(true);
            toast.success('Blog Added Successfully!',
            {autoClose: 2000 });
            // toast.success('Blog Added Successfully');
          }else{
            console.error(apiResponse.data.status,'Danger');
          }

          setMainTitle("");
          setSections([{ heading: "", summary: "" }]);
          setFocused(false);
          setTitleFocused(false);
          setContentFocus(false);
          setImgSrc("");
          setInputValue("");
          setisClick(false);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

// -------------Update Blog---------------

const handleUpdatedBlog = async(id) =>{
try{
  const responce = await UpdateBlogAPI(id);
  console.log("responce from updatedBlog-APi",responce);
  toast.success('Blog Updated Successfully!',
  {autoClose: 2000 });
  
}catch(error){
  console.error("error while updating blog",error);
  toast.success(`Error! ${error}`,
  {autoClose: 2000 });

}
}

// ---------------GetBlogDetailsbyId-----------------------

const handleBlogDetail = async() =>{
  try{
    const responce = await GetSingleBlogbyID(id);
    console.log("getBlogDetailbyID-Success",responce );
    setBlogDetail(responce.data.payload);
    // setSingleBlogDetal(responce.data.payload.blogsDetails);
    setSections(responce.data.payload.blogsDetails)
    setUpdateTitle(responce.data.payload.mainTitle);
  }catch(error){
    console.error("error at getting Single Data",error);
  }
}

useEffect(()=>{
  handleBlogDetail();
},[]);


  return (
    <div className="container bg-white ">
    { id &&  
        <h3 className="update_blog_typo">
          Update Blog Details
        </h3>
    }
      <div className="Blog_title_main">
        <p className="title_typograpy">Title</p>
        <Input
          type="text"
          class="full_width_input"
          placeholder={isFocused ? "" : "e.g Publish a blog as adventure Trips"}
          onFocus={handleFocus}
          onBlur={() => setFocused(false)}
          onChange={handleMainTitle}
          value={id ? updatedTitle :maintitle}
        />
      </div>
      <div className="Blog_title_main">
        <p className="title_typograpy">Upload Image</p>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                {/* <ImgStyled src={imgSrc} alt='Profile Pic' /> */}
                <div>
               {isClick &&  <img src={imgSrc} alt="Profile Pic" width="30%" className="m-2"/>}
                <div>
                    <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleInputImageChange}
                    id="account-settings-upload-image"
                    style={{ display: "none" }} 
                    ref={fileInputRef}
                    />
                   
                </div>
                <button  className="btn btn-primary addPromo_btn p-3 m-2" onClick={handleButtonClick}>Select Image</button>
                <button className="btn btn-primary" onClick={handleInputImageReset}>Reset</button>
                <p className="upload_ins">Allowed PNG or JPEG. Max size of 800K.</p>
                </div>
            </Box> 
      </div>
      <div className="Blog_title_body">
        <p className="title_typograpy">Content</p>
        <div className="horizontal-line"></div>
        { id ? (
          singleBlogDetail.length > 0 ? (
            singleBlogDetail.map((section, index) => (
                        <div className="mb-1" key={index}>
                            <p className="subtitle_typograpy">Heading</p>
                            <input
                                type="text"
                                className="full_width_input"
                                placeholder={isTitleFocused ? "" : "e.g. Brief Introduction about the article"}
                                onFocus={handleContentFocus}
                                onBlur={() => setTitleFocused(false)}
                                value={sections.heading}
                                onChange={(event) => handleHeadingChange(index, event)}
                            />
                            <p className="subtitle_typograpy">Summary</p>
                            <textarea
                            className="full_width_input blog_TextArea"
                            placeholder={isContentFocus ? "" : "Details..."}
                            onFocus={handleSummaryFocus}
                            onBlur={() => setContentFocus(false)}
                            value={sections.summary}
                            onChange={(event) => handleSummaryChange(index, event)}
                            />
                        <div className="d-flex justify-content-end">
                            {index > 0 && (
                                <div className="d-flex justify-content-end mt-1 mx-1">
                                    <button
                                        className="btn btn-primary removePromo_btn p-3"
                                        onClick={() => removeSection(index)}
                                    >
                                        <img src={""} alt="" width="32px" /> Remove Content
                                    </button>
                                </div>
                            )}
                            <div className="d-flex justify-content-end mt-1">
                                <button
                                    className="btn btn-primary addPromo_btn p-3"
                                    onClick={addSection}
                                >
                                    + Add More Content
                                </button>
                            </div>
                        </div>
                        </div>
                        
                    ))
                ) : (
                  sections.map((section, index) => (
                    <div key={index} className="mb-1">
                        <p className="subtitle_typograpy">Heading</p>
                        <input
                            type="text"
                            className="full_width_input"
                            placeholder={isTitleFocused ? "" : "e.g. Brief Introduction about the article"}
                            onFocus={handleContentFocus}
                            onBlur={() => setTitleFocused(false)}
                            value={section.heading}
                            onChange={(event) => handleHeadingChange(index, event)}
                        />
                        <p className="subtitle_typograpy">Summary</p>
                        <textarea
                            className="full_width_input blog_TextArea"
                            placeholder={isContentFocus ? "" : "Details..."}
                            onFocus={handleSummaryFocus}
                            onBlur={() => setContentFocus(false)}
                            value={section.summary}
                            onChange={(event) => handleSummaryChange(index, event)}
                        />
                        <div className="d-flex justify-content-end">
                            {index > 0 && (
                                <div className="d-flex justify-content-end mt-1 mx-1">
                                    <button
                                        className="btn btn-primary removePromo_btn p-3"
                                        onClick={() => removeSection(index)}
                                    >
                                        <img src={""} alt="" width="32px" /> Remove Content
                                    </button>
                                </div>
                            )}
                            <div className="d-flex justify-content-end mt-1">
                                <button
                                    className="btn btn-primary addPromo_btn p-3"
                                    onClick={addSection}
                                >
                                    + Add More Content
                                </button>
                            </div>
                        </div>
                    </div>
                ))
                )
            ) : (
                sections.map((section, index) => (
                    <div key={index} className="mb-1">
                        <p className="subtitle_typograpy">Heading</p>
                        <input
                            type="text"
                            className="full_width_input"
                            placeholder={isTitleFocused ? "" : "e.g. Brief Introduction about the article"}
                            onFocus={handleContentFocus}
                            onBlur={() => setTitleFocused(false)}
                            value={section.heading}
                            onChange={(event) => handleHeadingChange(index, event)}
                        />
                        <p className="subtitle_typograpy">Summary</p>
                        <textarea
                            className="full_width_input blog_TextArea"
                            placeholder={isContentFocus ? "" : "Details..."}
                            onFocus={handleSummaryFocus}
                            onBlur={() => setContentFocus(false)}
                            value={section.summary}
                            onChange={(event) => handleSummaryChange(index, event)}
                        />
                        <div className="d-flex justify-content-end">
                            {index > 0 && (
                                <div className="d-flex justify-content-end mt-1 mx-1">
                                    <button
                                        className="btn btn-primary removePromo_btn p-3"
                                        onClick={() => removeSection(index)}
                                    >
                                        <img src={""} alt="" width="32px" /> Remove Content
                                    </button>
                                </div>
                            )}
                            <div className="d-flex justify-content-end mt-1">
                                <button
                                    className="btn btn-primary addPromo_btn p-3"
                                    onClick={addSection}
                                >
                                    + Add More Content
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
      </div>
      {
        id ? (
          <div className="d-flex justify-content-center m-3">
                <button
                  className="btn btn-primary addBlog_btn "
                  onClick={handleUpdatedBlog}
                >
                  Update Blog
                </button>
      </div>
        ):(  
        <div className="d-flex justify-content-center m-3">
                <button
                  className="btn btn-primary addBlog_btn "
                  onClick={onSubmit}
                >
                  Add Blog
                </button>
        </div>
        )
      }

    </div>
  );
};

export default AddBlog;
