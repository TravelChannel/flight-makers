import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import DomesticFlightsJason from './DomesticFlightsJason';


const StaticFlightSearchData = () => {
  const { from } = useParams();
  const CurrentAirlineData = DomesticFlightsJason.find((flightData) => flightData.flightName === from);

  // Function to generate FAQ schema JSON-LD
  const generateFAQSchema = (faqs) => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };
  };

  // Adding JSON-LD script to the document head
  useEffect(() => {
    if (CurrentAirlineData && CurrentAirlineData.section4) {
      const faqSchema = generateFAQSchema(CurrentAirlineData.section4[0]?.faqs || []);
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(faqSchema);
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [CurrentAirlineData]);

  return (
    <div className='main_routes_section bg-white'>
      <h2 className='routes_main_heading py-2'>{CurrentAirlineData?.mainHeading}</h2>
      <div className='route_sec_para py-2' dangerouslySetInnerHTML={{ __html: CurrentAirlineData?.Paragraph1 }} />
      {CurrentAirlineData?.section1?.map((items, index) => (
        <div className='route_section py-1' key={index}>
          <h4 className='section_heading'>{items.heading}</h4>
          <div dangerouslySetInnerHTML={{ __html: items.Paragraph }} />
        </div>
      ))}
      {CurrentAirlineData?.section2?.map((items, index) => (
        <div className='route_section py-1' key={index}>
          <h4 className='section_heading'>{items.heading}</h4>
          <div className='route_sec_para py-2' dangerouslySetInnerHTML={{ __html: items?.Paragraph1 }} />
          <div className='route_sec_para py-2' dangerouslySetInnerHTML={{ __html: items?.Paragraph2 }} />
        </div>
      ))}
      {CurrentAirlineData?.section3?.map((items, index) => (
        <div className='route_section py-2' key={index}>
          <h4 className='section_heading'>{items.heading}</h4>
          <div className='route_sec_para py-2' dangerouslySetInnerHTML={{ __html: items?.Paragraph1 }} />
          <div className='route_sec_para py-2' dangerouslySetInnerHTML={{ __html: items?.Paragraph2 }} />
        </div>
      ))}
      {CurrentAirlineData?.section4?.map((items, index) => (
        <div className='route_section py-1' key={index}>
          <h2 className='routes_main_heading py-1'>{items.heading}</h2>
          {items?.faqs?.map((itm, idx) => (
            <div key={idx}>
              <h5 className='rotue_faq_ques py-2'>{`${idx + 1}: ${itm?.question}`}</h5>
              <div className='route_sec_para py-2' dangerouslySetInnerHTML={{ __html: itm?.answer }} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default StaticFlightSearchData;
