import React,{useState} from 'react'
import BackspaceIcon from '@mui/icons-material/Backspace';
import * as images from '../../Constant/images';
import ArrangeCallModel from '../Commom/ArrangeCallModel';
const ArrangeCall = () => {
    const [isOpened,setOpened] = useState(true);
    const [isOpen , setIsOpen] = useState(false);

    const handleCloseModel = () =>{
        setOpened(false);
    }
   const  handleArrangeCall =() =>{
    setIsOpen(true)
   }
  return (
    <div className='arrange-call-container'>
        {
            isOpened && (
                <div className='call_btn_bg pump_up_animation '>
                    <div className='d-flex justify-content-end' onClick ={handleCloseModel}>
                        <BackspaceIcon className='call_close_btn'/>
                    </div>
                    <div className="image_container" onClick={handleArrangeCall}></div>
                    {/* <button className='btn btn-primary btn_inner_typo pump_up_animation'> Arrange a Call</button> */}
               </div> 
               
            )
        }  
         {
            isOpen && (
            <ArrangeCallModel
               isOpen={isOpen} setIsOpen ={setIsOpen}
               setOpened = {setOpened}
            />
             )
    }                                                                                                                                
    </div> 
    
   

  )
}

export default ArrangeCall;