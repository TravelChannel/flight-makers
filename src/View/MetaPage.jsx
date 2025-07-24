// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { GetBlogsData } from '../API/BackendAPI/ArmanSirAPIs/GetBlogsData';
// import { Helmet } from 'react-helmet';

// const MetaPage = ({ children, metaPageData }) => {

//   let defaultDescription = 'flightmakers is one of the best traveling Platform. Where you can buy online airline tickets and make your traveling plan at home. We provide services 24/7.'
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

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GetBlogsData } from "../API/BackendAPI/ArmanSirAPIs/GetBlogsData";
import { Helmet } from "react-helmet";

const MetaPage = ({ children, metaPageData }) => {
  const defaultDescription =
    "flightmakers is one of the best traveling platforms. Where you can buy online airline tickets and make your traveling plan at home. We provide services 24/7.";
  const [metaData, setMetaData] = useState({});
  const location = useLocation();

  const getBlogs = async () => {
    try {
      let path = location.pathname;

      console.log("path", path);
      const response = await GetBlogsData(path);
      console.log("blogs-Response", response);
      if (response && response.length > 0) {
        setMetaData(response[0]);
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  useEffect(() => {
    if (location.pathname.startsWith("/blogs/")) {
      getBlogs();
    }
  }, [location.pathname]);

  useEffect(() => {
    // FETCH DATA FROM MATAPAGE
    const pageInfo = metaPageData.find(
      (page) => page.url === location.pathname
    );
    if (pageInfo) {
      setMetaData({
        mainTitle: pageInfo.title,
        shortDescription: pageInfo.description,
        keywords: pageInfo.keywords,
      });
    }
  }, [location.pathname, metaPageData]);

  const blogSchema = {
    "@context": "http://schema.org",
    "@type": "BlogPosting",
    headline: metaData?.mainTitle || "Default Title",
    description: metaData?.shortDescription || defaultDescription,
    author: {
      "@type": "Person",
      name: "Kashif Hussain",
    },
    publisher: {
      "@type": "Organization",
      name: "Flightmakers",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.flightmakers.com${location.pathname}`,
    },
  };

  const aggregateRatingSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Cheap Flights From Lahore To London",
    description:
      "Book flights from Lahore to London with Faremakers. Get the best deals and excellent service.",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 4.2,
      bestRating: 5,
      worstRating: 1,
      reviewCount: 62,
    },
  };

  // Determine the canonical URL from metaPageData
  const canonicalUrl = metaPageData.find(
    (page) => page.url === location.pathname
  )?.url
    ? `https://www.flightmakers.com${
        metaPageData.find((page) => page.url === location.pathname).url
      }`
    : `https://www.flightmakers.com${location.pathname}`;

  // console.log("canonicalUrl",canonicalUrl);

  return (
    <>
      <Helmet>
        <title>{metaData?.mainTitle}</title>
        <meta name="description" content={metaData?.shortDescription} />
        <link rel="canonical" href={canonicalUrl} />
        {location.pathname.startsWith("/blogs/") && (
          <script type="application/ld+json">
            {JSON.stringify(blogSchema)}
          </script>
        )}
        {location.pathname === "/flights/lahore-to-london" && (
          <script type="application/ld+json">
            {JSON.stringify(aggregateRatingSchema)}
          </script>
        )}
      </Helmet>
      {children}
    </>
  );
};

export default MetaPage;
