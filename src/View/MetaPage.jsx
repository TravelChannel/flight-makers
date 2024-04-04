import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const MetaPage = ({ children, metaPageData }) => {
  const location = useLocation();

  useEffect(() => {
    const pageInfo = metaPageData.find(page => page.url === location.pathname);
    if (pageInfo) {
      document.title = pageInfo.title;
      document.querySelector('meta[name="description"]').setAttribute('content', pageInfo.description);
      document.querySelector('meta[name="keywords"]').setAttribute('content', pageInfo.keywords);
    }

  }, [location.pathname, metaPageData]);

  return (
    <>
      {children}
    </>
  );
};

export default MetaPage;