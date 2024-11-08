import React from 'react'

const AirlineDataComponent = (props) => {
  const  {currentAirlineData} = props;

  console.log("currentAirlineData",currentAirlineData)
  return (
    <div>
  <div className="horizontal-line"></div>

  <div className="mainflights">
    <h3 className="airline_heading">
      {currentAirlineData?.mainHeading ?? 'Default Main Heading'}
    </h3>
    <div className="horizontal-line"></div>

    {currentAirlineData?.section1?.map((items, index) => (
      <div key={index}>
        <h3 className="text1">{items.heading ?? 'Default Section 1 Heading'}</h3>
        <p dangerouslySetInnerHTML={{ __html: items?.paragraph }}></p>
      </div>
    ))}

    <div className="horizontal-line"></div>

    {currentAirlineData?.section2?.map((items, index) => (
      <div key={index}>
        <h3 className="text1">{items.heading ?? 'Default Section 2 Heading'}</h3>
        <p>{items.paragraph ?? 'Default paragraph content for section 2'}</p>
        <div className='airlines_list_styling'>
          {items?.orderList?.map((itms, idx) => (
            <ul key={idx}>
              <li>
                <span className="airline_span_heading_v2">{itms.point_head ?? 'Default point head'}</span> 
                {itms.point_data ?? 'Default point data'}
              </li>
            </ul>
          ))}
        </div>
      </div>
    ))}

    <div className="horizontal-line"></div>

    {currentAirlineData?.section3?.map((items, index) => (
      <div key={index}>
        <h3 className="text1">{items.heading ?? 'Default Section 3 Heading'}</h3>
        <div className="horizontal-line"></div>
        <h4 className="airlines_subHeading">{items?.subheading1 ?? 'Default subheading 1'}</h4>
        <p>{items?.paragraph1 ?? 'Default paragraph 1'}</p>
        <h4 className="airlines_subHeading">{items?.subheading2 ?? 'Default subheading 2'}</h4>
        <p dangerouslySetInnerHTML={{ __html: items.paragraph2 }}></p>
        <div className="horizontal-line"></div>
      </div>
    ))}

    {currentAirlineData?.section4?.map((items, index) => (
      <div key={index}>
        <h3 className="text1">{items.heading ?? 'Default Section 4 Heading'}</h3>
        <div className="horizontal-line"></div>
        <p>{items.paragraph ?? 'Default paragraph content for section 4'}</p>
        {items?.orderList?.map((itm, idx) => (
          <ol className="order_list_styling" key={idx}>
            <li>
              <span className="airline_span_heading_v2">{itm.point_head ?? 'Default point head'}</span>
              <a href="http://www.Faremakers.com" target="_blank" className="href_link_typo">
                {itm.point_data ?? 'Default point data'}
              </a>
            </li>
          </ol>
        ))}
        <div className="horizontal-line"></div>
      </div>
    ))}

    {currentAirlineData?.section5?.map((items, index) => (
      <div key={index}>
        <h3 className="text1">{items.heading ?? 'Default Section 5 Heading'}</h3>
        <div className="horizontal-line"></div>
        <div className='airlines_list_styling'>
          {items?.orderList?.map((itms, idx) => (
            <ul key={idx}>
              <li>
                <span className="airline_span_heading_v2">{itms.point_head ?? 'Default point head'}</span> 
                {itms.point_data ?? 'Default point data'}
              </li>
            </ul>
          ))}
        </div>
        <div className="horizontal-line"></div>
      </div>
    ))}

    {currentAirlineData?.section6?.map((items, index) => (
      <div key={index}>
        <h3 className="text1">{items.heading ?? 'Default Section 6 Heading'}</h3>
        <div className="horizontal-line"></div>
        <p>{items.paragraph ?? 'Default paragraph content for section 6'}</p>
        <div className="horizontal-line"></div>
      </div>
    ))}

    {currentAirlineData?.section7?.map((items, index) => (
      <div key={index}>
        <h3 className="text1">{items.heading ?? 'Default Section 7 Heading'}</h3>
        <div className="horizontal-line"></div>
        <p>{items.paragraph ?? 'Default paragraph content for section 7'}</p>
        <p className="airlines_list_styling">
          {items.orderList?.map((itm, idx) => (
            <ul key={idx}>
              <li>
                <p className="airline_body_color">
                  <span className="airline_span_heading_v2">{itm.point_head ?? 'Default point head'}</span>
                  {itm.point_data ?? 'Default point data'}
                </p>
              </li>
            </ul>
          ))}
        </p>
        <div className="horizontal-line"></div>
      </div>
    ))}

    {currentAirlineData?.section8?.map((items, index) => (
      <div key={index}>
        <h3 className="airline_heading">{items.heading ?? 'Default Section 8 Heading'}</h3>
        <div className="horizontal-line"></div>
        {items.orderList?.map((itm, idx) => (
          <div className="faq-item" key={idx}>
            <p className="faq-question">{itm.question ?? 'Default question'}</p>
            <p className="faq-answer">{itm.answer ?? 'Default answer'}</p>
            <div className="horizontal-line"></div>
          </div>
        ))}
      </div>
    ))}
  </div>
</div>

  )
}

export default AirlineDataComponent;