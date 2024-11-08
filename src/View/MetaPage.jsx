// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { GetBlogsData } from '../API/BackendAPI/ArmanSirAPIs/GetBlogsData';
// import { Helmet } from 'react-helmet';

// const MetaPage = ({ children, metaPageData }) => {

//   let defaultDescription = 'Faremakers is one of the best traveling Platform. Where you can buy online airline tickets and make your traveling plan at home. We provide services 24/7.'
//   const [blogData, setBlogData] = useState('');
//   const location = useLocation();

//   const getBlogs = async () => {
//     try {
//       let path = location.pathname;
//       const response = await GetBlogsData(path);
//       console.log('blogs-Response', response);
//       if (response && response.length > 0) {
//         setBlogData(response[0]);
//       }
//     } catch (error) {
//       console.error("Error fetching blog data:", error);
//     }
//   };

//   useEffect(() => {
//     if (location.pathname.startsWith('/blogs/')) {
//       getBlogs();
//     }
//   }, [location.pathname]);

//   useEffect(() => {
//     const pageInfo = metaPageData.find(page => page.url === location.pathname);
//     if (pageInfo) {
//       setBlogData({
//         mainTitle: pageInfo.title,
//         shortDescription: pageInfo.description,
//         keywords: pageInfo.keywords
//       });
//     }
//   }, [location.pathname, metaPageData]);

//   return (
//     <>
//       <Helmet>
//         <title>{blogData?.mainTitle}</title>
//         <meta name="description" content={blogData?.shortDescription || defaultDescription}/>
//       </Helmet>
//       {children}
//     </>
//   );
// };

// export default MetaPage;


import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { GetBlogsData } from '../API/BackendAPI/ArmanSirAPIs/GetBlogsData';
import { Helmet } from 'react-helmet';

const MetaPage = ({ children, metaPageData }) => {
  const defaultDescription = 'Faremakers is one of the best traveling platforms. Where you can buy online airline tickets and make your traveling plan at home. We provide services 24/7.';
  const [blogData, setBlogData] = useState({});
  const location = useLocation();

  const getBlogs = async () => {
    try {
      let path = location.pathname;
      const response = await GetBlogsData(path);
      console.log('blogs-Response', response);
      if (response && response.length > 0) {
        setBlogData(response[0]);
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  useEffect(() => {
    if (location.pathname.startsWith('/blogs/')) {
      getBlogs();
    }
  }, [location.pathname]);

  useEffect(() => {
    const pageInfo = metaPageData.find(page => page.url === location.pathname);
    if (pageInfo) {
      setBlogData({
        mainTitle: pageInfo.title,
        shortDescription: pageInfo.description,
        keywords: pageInfo.keywords
      });
    }
  }, [location.pathname, metaPageData]);

  const blogSchema = {
    "@context": "http://schema.org",
    "@type": "BlogPosting",
    "headline": blogData?.mainTitle || "Default Title",
    "description": blogData?.shortDescription || defaultDescription,
    "author": {
      "@type": "Person",
      "name": "Kashif Hussain"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Faremakers",
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.faremakers.com${location.pathname}`
    }
  };

  return (
        <>
        <Helmet>
          <title>{blogData?.mainTitle }</title>
          <meta name="description" content={blogData?.shortDescription } />
          {location.pathname.startsWith('/blogs/') && (
            <script type="application/ld+json">
              {JSON.stringify(blogSchema)}
            </script>
          )}
        </Helmet>
        {children}
      </>
  );
};

export default MetaPage;

