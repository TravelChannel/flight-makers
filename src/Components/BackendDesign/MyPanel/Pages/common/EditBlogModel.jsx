import React, { useEffect, useState, useRef } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import * as images from "../../../../../Constant/images";
import { UpdateBlogAPI } from "../../../../../API/BackendAPI/BlogsAPI/UpdateBlog";
import { GetSingleBlogbyID } from "../../../../../API/BackendAPI/BlogsAPI/GetSingleBlog";
import Select from "react-select";
import { GetCategory } from "../../../../../API/BackendAPI/BlogsAPI/getCategory";
import { Input } from "antd";
import { Box } from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";
import Loader from "../../../../../Loader/Loader";

// ----------------------------
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill/dist/quill.core.css";
// -------------------------------

const EditBlogModel = (props) => {
  const { isOpen, setIsOpen, blogID, handleBlogLists } = props;
  const fileInputRef = useRef(null);
  const [isCatogory, setCategory] = useState(null);

  const [customValue, setCustomValue] = useState("");
  const [airlineOptions, setAirlineOptions] = useState([]);
  const [isFocused, setFocused] = useState(false);

  const [updatedTitle, setUpdateTitle] = useState("");
  const [updateAuthor, setUpdateAuthor] = useState("");
  const [updateSlug, setUpdateSlug] = useState("");
  const [updateShortDesc, setupdateShortDesc] = useState("");
  const [updateContent, setUpdateContent] = useState("");
  const [blogDetail, setBlogDetail] = useState([]);
  const [imgSrc, setImgSrc] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isClick, setisClick] = useState(false);
  const [getCurrentCat, setCurrentCat] = useState();
  const [isLoading, setLoading] = useState(false);

  const [quillContent, setQuilContent] = useState("");

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleBlogDetail = async () => {
    try {
      const responce = await GetSingleBlogbyID(blogID);
      console.log("getBlogDetailbyID-Success", responce);
      setBlogDetail(responce.data.payload);
      setUpdateTitle(responce.data.payload.mainTitle);
      setUpdateAuthor(responce.data.payload.author);
      setUpdateSlug(responce.data.payload.headerUrl);
      setupdateShortDesc(responce.data.payload.shortDescription);
      // setUpdateContent(responce.data.payload.description);
      setQuilContent(responce.data.payload.description);
      setImgSrc(responce.data.payload.img);
      setCurrentCat(responce.data.payload.blogTypeId);
    } catch (error) {
      console.error("error at getting Single Data", error);
    }
  };
  const handleGetCategory = async () => {
    try {
      const response = await GetCategory();
      const options = response.data.payload.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setAirlineOptions(options);
      // setCategory(options[0])
    } catch (error) {
      console.error("Error fetching airline dropdown:", error);
    }
  };
  useEffect(() => {
    if (getCurrentCat) {
      const category = airlineOptions.find(
        (option) => option.value === getCurrentCat
      );
      setCategory(category);
    }
  }, [getCurrentCat, airlineOptions]);

  useEffect(() => {
    handleBlogDetail();
    handleGetCategory();
  }, []);
  const handleCategoryChange = (selected) => {
    setCategory(selected);
  };
  const handleAddCustomValue = () => {
    if (customValue.trim() !== "") {
      const newOption = { value: customValue, label: customValue };
      setCategory(newOption);
    }
  };
  const handleInputChange = (inputValue) => {
    setCustomValue(inputValue);
  };

  //   useEffect(() => {
  //     const handleGetCategory = async () => {
  //         try {
  //             const response = await GetCategory();
  //             const options = response.data.payload.map(item => ({
  //                 value: item.id,
  //                 label: item.name
  //             }));
  //             setAirlineOptions(options);
  //         } catch (error) {
  //             console.error("Error fetching airline dropdown:", error);
  //         }
  //     };
  //     handleGetCategory();
  // }, []);

  const handleAuthor = (event) => {
    const value = event.target.value;
    setUpdateAuthor(value);
  };
  const handleFocus = () => {
    setFocused(true);
  };
  const handleMainTitle = (event) => {
    const value = event.target.value;
    setUpdateTitle(value);
  };
  const handleSlug = (event) => {
    const value = event.target.value;
    setUpdateSlug(value);
  };
  const handleShortDesc = (event) => {
    const value = event.target.value;
    setupdateShortDesc(value);
  };
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
  const handleButtonClick = () => {
    // Trigger the file input click event
    fileInputRef.current.click();
    setisClick(true);
  };
  const handleChange = (event, editor) => {
    const data = editor.getData();
    setUpdateContent(data);
  };
  const updatedData = {
    mainTitle: updatedTitle,
    headerUrl: updateSlug,
    shortDescription: updateShortDesc,
    img: imgSrc,
    description: quillContent,
    blogTypeId: isCatogory?.value,
    author: updateAuthor,
  };

  const handleUpdatedBlog = async () => {
    try {
      // setLoading(true);
      const formData = new FormData();
      const dataStringify = JSON.stringify(updatedData);

      formData.append("data", dataStringify);

      const fileInput = document.getElementById(
        "account-settings-upload-image"
      );
      if (fileInput && fileInput.files && fileInput.files[0]) {
        const imgFile = fileInput.files[0];
        formData.append("imgFile", imgFile);
      }
      const passingobj = {
        idz: blogID,
        formData: formData,
      };

      console.log("passingobj", passingobj);

      const responce = await UpdateBlogAPI(passingobj);
      if (responce.data.status === "SUCCESS") {
        console.log("responce from updatedBlog-APi", responce);
        handleBlogLists();

        toast.success("Blog Updated Successfully!", { autoClose: 2000 });
        setIsOpen(false);
        // setLoading(false);
      } else {
        console.error("error");
        // setLoading(false);
      }
    } catch (error) {
      console.error("error while updating blog", error);
      toast.success(`Error! ${error}`, { autoClose: 2000 });
      setLoading(false);
    }
  };

  // -----------------
  const handleQuillChange = (value) => {
    setQuilContent(value);
    //  console.log("content",content);
  };
  // -------------------
  // -------------------------------
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["color", "background"],
      ["align", "direction"],
      ["code-block"],
      ["video"],
      [{ table: "table" }][("undo", "redo")],
      ["clean"],
    ],
    // imageResize: {}
  };
  // -------------------------------

  return (
    <div>
      <Modal isOpen={isOpen} className="blog_edit_modal">
        <ModalHeader toggle={toggleModal}>
          <div id="logobox" className="hdrLogo">
            <img src={images.default} className="imgView w-91" alt="FM-LOGO" />
            <span id="logotext" className="colorBlue d-block"></span>
          </div>
        </ModalHeader>
        <ModalBody>
          <h3 className="edit_model_body text-center">Edit Blog Data:</h3>
          <div className="parent_edit">
            <div className="d-flex justify-content-center">
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
            <div>
              <p className="title_typograpy my-1">Author</p>
              <Input
                type="text"
                class="full_width_input"
                placeholder={isFocused ? "" : "Author Name"}
                onFocus={handleFocus}
                onBlur={() => setFocused(false)}
                onChange={handleAuthor}
                value={updateAuthor}
              />
            </div>
            <div>
              <p className="title_typograpy my-1">Title</p>
              <Input
                type="text"
                class="full_width_input"
                placeholder={
                  isFocused ? "" : "e.g Publish a blog as adventure Trips"
                }
                onFocus={handleFocus}
                onBlur={() => setFocused(false)}
                onChange={handleMainTitle}
                value={updatedTitle}
              />
            </div>
            <div>
              <p className="title_typograpy my-1">Slug</p>
              <Input
                type="text"
                class="full_width_input"
                placeholder={isFocused ? "" : "Write Blog Slug here"}
                onFocus={handleFocus}
                onBlur={() => setFocused(false)}
                onChange={handleSlug}
                value={updateSlug}
              />
            </div>
            <div>
              <p className="title_typograpy my-1">Short Discription</p>
              <textarea
                className="full_width_input blog_TextArea"
                placeholder={"Details..."}
                value={updateShortDesc}
                onChange={handleShortDesc}
              />
            </div>
            <div>
              <div className="Blog_title_main">
                <p className="title_typograpy">Upload Image</p>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <div>
                    <img
                      src={imgSrc}
                      alt="Profile Pic"
                      width="30%"
                      className="m-2"
                    />
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
                    <button
                      className="btn btn-primary addPromo_btn p-3 m-2"
                      onClick={handleButtonClick}
                    >
                      Select Image
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={handleInputImageReset}
                    >
                      Reset
                    </button>
                    <p className="upload_ins">
                      Allowed PNG or JPEG. Max size of 800K.
                    </p>
                  </div>
                </Box>
              </div>
              <div className="Blog_title_body">
                <p className="title_typograpy">Content</p>
                <div className="horizontal-line"></div>
                {/* <CKEditor
                            editor={ClassicEditor}
                            data={updateContent}
                            onChange={handleChange}
                        /> */}
                <ReactQuill
                  value={quillContent}
                  onChange={handleQuillChange}
                  modules={modules}
                  theme="snow"
                />
              </div>
              <div className="d-flex justify-content-center m-3">
                <button
                  className="btn btn-primary addBlog_btn "
                  onClick={handleUpdatedBlog}
                >
                  Update Blog
                </button>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditBlogModel;
