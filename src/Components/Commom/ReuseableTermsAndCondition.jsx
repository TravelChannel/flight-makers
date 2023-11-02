import React, { Fragment } from 'react'


const ReuseableTermsAndCondition = (props) => {
  return (
  <Fragment>
     {
       props.TermsConditionsData.map((items,index)=>(
           <div className="terms_body">
           <div className="terms_heading">
               <h5 className="terms_inner_heading" key={items.index} >{items.heading}</h5>
           </div>
               <div className="terms_inner_body">
                   <p key={items.index}>{items.data} </p>
               </div>
       </div>
       ))
   }
  </Fragment>
  )
}

export default ReuseableTermsAndCondition;