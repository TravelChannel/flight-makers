import React, { useState } from 'react';

const YourComponent = () => {
    const [maintitle ,setMainTitle] = useState('');
    const [sections, setSections] = useState([{ heading: '', summary: '' }]);
    const [isFocused ,setFocused] = useState(false);
    const [isTitleFocused, setTitleFocused] = useState(false);
    const [isContentFocus ,setContentFocus] = useState(false);

const handleMainTitle = (event)=>{
    const value = event.target.value;
    setMainTitle(value);
}
    const handleContentFocus = () => {
        setTitleFocused(true);
        setContentFocus(false);
    };

    const handleSummaryFocus = () => {
        setTitleFocused(false);
        setContentFocus(true);
    };

    const addSection = () => {
        setSections([...sections, { heading: '', summary: '' }]);
    };

    const removeSection = (index) => {
        const newSections = [...sections];
        newSections.splice(index, 1);
        setSections(newSections);
    };

    const handleHeadingChange = (index, event) => {
        const newSections = [...sections];
        newSections[index].heading = event.target.value;
        setSections(newSections);
    };

    const handleSummaryChange = (index, event) => {
        const newSections = [...sections];
        newSections[index].summary = event.target.value;
        setSections(newSections);
    };
    const handleFocus = () =>{
        setFocused(true);
        setTitleFocused(false);
        setContentFocus(false);
    }
    // -------------passing object ------------------

    const BlogData = 
       {
        mainTitle: maintitle,
        img:'',
        content :sections
       }

 console.log('passingObject',BlogData);

    return (
            <div>
            <div className='dashboard-content-header'>
                <h2>Create a Blog</h2>
                <div className='dashboard-content-search'>
                <input
                    type='text'
                    value={''}
                    placeholder='Search..'
                    className='dashboard-content-input'
                    // onChange={e => __handleSearch(e)}
                />
                </div>
            </div>
            <div className='Blog_title_main'>
                <p className='title_typograpy'>Title</p>
                <input type="text"
                class="full_width_input"
                placeholder={isFocused ?(''):('e.g Publish a blog as adventure Trips')}
                onFocus={handleFocus}
                onBlur={() => setFocused(false)}
                onChange={handleMainTitle}
                />
            </div>
            <div className='Blog_title_body'>
                <p className='title_typograpy'>Content</p>
                <div className="horizontal-line"></div> 
                {sections.map((section, index) => (
                    <div key={index} className='  mb-1'>
                        <p className='subtitle_typograpy'>Heading</p>
                        <input
                            type="text"
                            className="full_width_input"
                            placeholder={isTitleFocused ? '' : 'e.g. Brief Introduction about the article'}
                            onFocus={handleContentFocus}
                            onBlur={() => setTitleFocused(false)}
                            value={section.heading}
                            onChange={(event) => handleHeadingChange(index, event)}
                        />
                        <p className='subtitle_typograpy'>Summary</p>
                        <textarea
                            className="full_width_input blog_TextArea"
                            placeholder={isContentFocus ? '' : 'Details...'}
                            onFocus={handleSummaryFocus}
                            onBlur={() => setContentFocus(false)}
                            value={section.summary}
                            onChange={(event) => handleSummaryChange(index, event)}
                        />
                    <div className='d-flex justify-content-end'>
                            {  index > 0 && <div className='d-flex justify-content-end mt-1 mx-1 '>
                                    <button className='btn btn-primary removePromo_btn p-3' onClick={() => removeSection(index)}>
                                        <img src={''} alt="" width='32px' /> Remove Content
                                    </button>
                                </div> }
                                <div className='d-flex justify-content-end mt-1'>
                                    <button className='btn btn-primary addPromo_btn p-3' onClick={addSection}>
                                        <img src={''} alt="" width='32px' /> + Add More Content
                                    </button>
                            </div>
                    </div>
                    </div>
                ))}
            </div>
          
           
        </div>
    );
};

export default YourComponent;
