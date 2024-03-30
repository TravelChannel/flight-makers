import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { AddBlogAPI } from "../../../../API/BackendAPI/BlogsAPI/AddBlogAPI";
import Select from 'react-select';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { GetCategory } from "../../../../API/BackendAPI/BlogsAPI/getCategory";
import { useParams } from "react-router";
const AddBlog = () => {
  const [AuthorName ,setAuthorName] = useState('');
  const [maintitle, setMainTitle] = useState("");
  const [isSlug , setSlug] = useState('');
  const [shortDesc , setShortDesc] = useState('');
  const [editorData, setEditorData] = useState('');
  const [isCatogory ,setCategory] = useState('');
  const [customValue, setCustomValue] = useState('');
  const [airlineOptions, setAirlineOptions] = useState([]);
  
  const [isFocused, setFocused] = useState(false);
  const [isTitleFocused, setTitleFocused] = useState(false);
  const [isSlugFocus ,setSlugFocus] = useState(false);


  const [isContentFocus, setContentFocus] = useState(false);
  const [isSubmitLoading , setSubmitLoading] = useState(false);

  const [imgSrc, setImgSrc] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isClick ,setisClick] = useState(false);
  const [isSuccess ,setIsSuccess] = useState(false);
//  ----------------------------------
  const handleChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);

  };
  const handleAuthor = (event) => {
    const value = event.target.value;
    setAuthorName(value);
  };
  const handleMainTitle = (event) => {
    const value = event.target.value;
    setMainTitle(value);
  };
  const handleSlug = (event) =>{
  const value  = event.target.value;
  setSlug(value);
  } 
  const handleShortDesc = (event) =>{
  const value = event.target.value;
  setShortDesc(value);
  }

  const handleCategoryChange = (selected) => {
    setCategory(selected);
  }
  const handleAddCustomValue = () => {
        if (customValue.trim() !== '') {
            const newOption = { value: customValue, label: customValue };
            setCategory(newOption);
        }
    };
  const handleInputChange = (inputValue) => {
    setCustomValue(inputValue);
  };

    useEffect(() => {
      const handleGetCategory = async () => {
          try {
              const response = await GetCategory();
              const options = response.data.payload.map(item => ({
                  value: item.id,
                  label: item.name
              }));
              setAirlineOptions(options);
          } catch (error) {
              console.error("Error fetching airline dropdown:", error);
          }
      };
      handleGetCategory();
  }, []);

  const handleContentFocus = () => {
    setTitleFocused(true);
    setContentFocus(false);
  };
  const handleSummaryFocus = () => {
    setTitleFocused(false);
    setContentFocus(true);
  };
  const handleFocus = () => {
    setFocused(true);
    setTitleFocused(false);
    setContentFocus(false);
  };
  const handleslugFocus = () => {
    setSlugFocus(true);
  };
  // -------------passing object ------------------
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // Trigger the file input click event
    fileInputRef.current.click();
    setisClick(true);
  };
  const BlogData = {
    mainTitle: maintitle,
    headerUrl: isSlug,
    shortDescription:shortDesc,
    img: "",
    description :editorData,
    blogTypeId:isCatogory?.value,
    author:AuthorName
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
          }else{
            console.error(apiResponse.data.status,'Danger');
          }
          
          setAuthorName('');
          setMainTitle("");
          setSlug('');
          setShortDesc('');
          setEditorData('');
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

  return (
    <div className="container bg-white ">
       <div className='d-flex justify-content-end mx-1'>
                <Select
                    value={isCatogory}
                    onChange={handleCategoryChange}
                      options={airlineOptions}
                      isClearable
                      isSearchable
                      placeholder="Select Category..."
                      className="CommissionInputFields"
                      onCreateOption={handleAddCustomValue}
                      onInputChange={handleInputChange}
                  />
                
      </div>
      <div className="Blog_title_main">
      <p className="title_typograpy my-1">Author</p>
        <Input
          type="text"
          class="full_width_input"
          placeholder={isTitleFocused ? "" : "Author Name"}
          onFocus={handleContentFocus}
          onBlur={() => setTitleFocused(false)}
          onChange={handleAuthor}
          value={AuthorName}
        />
        <p className="title_typograpy my-1">Title</p>
        <Input
          type="text"
          class="full_width_input"
          placeholder={isFocused ? "" : "e.g Publish a blog as adventure Trips"}
          onFocus={handleFocus}
          onBlur={() => setFocused(false)}
          onChange={handleMainTitle}
          value={maintitle}
        />
        <p className="title_typograpy my-1">Slug</p>
        <Input
          type="text"
          class="full_width_input"
          placeholder={isSlugFocus ? "" : "Write Blog Slug here"}
          onFocus={handleslugFocus}
          onBlur={() => setSlugFocus(false)}
          onChange={handleSlug}
          value={isSlug }
        />
       <p className="title_typograpy my-1">Short Discription</p>
       <textarea
          className="full_width_input blog_TextArea"
          placeholder={isContentFocus ? "" : "Details..."}
          onFocus={handleSummaryFocus}
          onBlur={() => setContentFocus(false)}
          value={shortDesc }
          onChange={handleShortDesc}
      />
      </div>
      <div className="Blog_title_main">
        <p className="title_typograpy">Upload Image</p>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                {/* <img src={imgSrc} alt='Profile Pic' /> */}
                <div>
               {isClick && 
                <img src={imgSrc} alt="Profile Pic" width="30%" className="m-2"/>
                }
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
              <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onChange={handleChange}
              />
      </div>
        <div className="d-flex justify-content-center m-3">
                <button
                  className="btn btn-primary addBlog_btn "
                  onClick={onSubmit}
                >
                  Add Blog
                </button>
        </div>
    </div>
  );
};

export default AddBlog;
