import React,{useState,useEffect,Fragment} from 'react'
import Loader from '../../../../Loader/Loader';
import { cityNameFunct } from '../../../../helpers/formatdata';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import { useNavigate } from 'react-router';
import { ReIssue } from '../../../../API/BackendAPI/UserBookingDetails';
import { Cancelation } from '../../../../API/BackendAPI/UserBookingDetails';
import { ReFund } from '../../../../API/BackendAPI/UserBookingDetails';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { dataNotfound } from '../../../../Constant/images';
import { AdminSideCustomerSupp } from '../../../../API/BackendAPI/UserBookingDetails';

const UserCustomerSupport = (props) => {
    const {userData,isLoading,checkAdmin} = props;
    const [openDetails, setOpenDetails] = useState(false);
    const [open, setOpen] = useState(false);

    const [dialogContent, setDialogContent] = useState({ title: "", description: "",userID:null});
    const [disabledButtons, setDisabledButtons] = useState({});

    // console.log("dialogContentdialogContent",dialogContent);

    // console.log("userDatauserData",userData);
    const userPayLoad = userData?.data.payload;
    // console.log('userPayLoad',userPayLoad);

    const FlightShortInfo = userPayLoad?.map((items)=>items.flightDetails);
    // console.log("FlightShortInfo",FlightShortInfo);
    const navigate = useNavigate();

    const __handleSearch = ()=>{
        ''
    }
    const  ArrangeDateFormat = (JourneyDate) =>{
        const formattedDate = new Date(JourneyDate).toLocaleDateString('en-GB');
        return formattedDate;
    }
    // --------------------------
   
      const ReFundCalled = (id)=>{
        ReFund(id);
        console.log(`Refund API called  for  booking ${id}`);
      }
    
      const CancelationCalled = (id)=>{
        Cancelation(id);
        console.log(`Cancel API called for booking ${id}`);
    
      }
    
      const reIssueCalled = (id)=>{
        ReIssue(id);
        console.log(`ReIssue API called for booking ${id}`);
    
      }
      const handleClose = (id) => {
        setOpen(false);
        setDisabledButtons((prevDisabledButtons) => ({
          ...prevDisabledButtons,
          [id]: false,
        }));
      };
    
      const openDialogBox = (id)=>{
        setOpen(true);
        setDisabledButtons((prevDisabledButtons) => ({
            ...prevDisabledButtons,
            [id]: true,
          }));
          updateDialogContent("refund", id);
        console.log("called for id",id);
      }

      const updateDialogContent = (action, id) => {
        switch (action) {
          case "refund":
            setDialogContent({
              title: "Refund Confirmation",
              description: "Are you sure you want to proceed with the refund?",
              type: "refund",
              userID: parseInt(id, 10),
            });
            break;
          case "cancel":
            setDialogContent({
              title: "Cancel Confirmation",
              description: "Are you sure you want to cancel your flight?",
              type: "cancel",
              userID: parseInt(id, 10),
            });
            break;
          case "reissue":
            setDialogContent({
              title: "Reissue Confirmation",
              description: "Are you sure you want to reissue your flight?",
              type: "reissue",
              userID: parseInt(id, 10),
            });
            break;
          default:
            setDialogContent({ title: "", description: "" });
        }
      };
      const handleAgreeClick = (userID) => {
        switch (dialogContent.type) {
          case "refund":
            ReFundCalled(userID);
            setOpen(false);
            break;
          case "cancel":
            CancelationCalled(userID);
            setOpen(false);
            break;
          case "reissue":
            reIssueCalled(userID);
            setOpen(false);
            break;
          default:
            console.error("Invalid dialogContent.type");
        }}

  return (
    isLoading ?(<Loader/>):(
      <div className='m-3'>
      <div className='dashboard-content-header'>
        <h2>Customer Support</h2>
        <div className='dashboard-content-search'>
          <input
            type='text'
            value={''}
            placeholder='Search..'
            className='dashboard-content-input'
            onChange={e => __handleSearch(e)}
          />
        </div>
      </div>
      {
        userPayLoad?.length ? (
          <div className='user_table_details'>
              <table className='table table-bordered table_custom'>
                <thead className='thead_typo'>
                  <tr>
                    <th>PNR ID</th>
                    <th>User ID</th>
                    <th>Flight Segment</th>
                    <th>CreatedAt</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userPayLoad?.map((items, index) => (
                    <tr key={index}>
                      <td className=''>{items.id}</td>
                      <td className=''>{items.userId}</td>
                      <td>
                        {items?.flightDetails?.groupDescription?.map((itms, itmsIndex) => (
                          <Fragment key={itmsIndex}>
                            <div className='d-flex justify-content-center'>
                              <p className='table_flight_font'>{cityNameFunct[itms.departureLocation]}</p>
                              <span className='airport_spacing'>
                                {itmsIndex === 0 ? <RedoOutlinedIcon /> : <UndoIcon />}
                              </span>
                              <p className='table_flight_font'>{cityNameFunct[itms.arrivalLocation]}</p>
                            </div>
                          </Fragment>
                        ))}
                      </td>
                      <td className='align-self-center'>{ArrangeDateFormat(items.createdAt)}</td>
                      <td>Paid</td>
                      <td>
                        <div>
                          <button
                            className='btn btn-primary buttons_typo user_cancelation_button'
                            onClick={() => {
                              openDialogBox(items.id);
                              updateDialogContent('cancel', items.id);
                            }}
                            disabled={disabledButtons[items.id]}
                          >
                            Cancel
                          </button>
                        </div>
                        {/* <div>
                          <button
                            className='btn btn-primary buttons_typo user_cancelation_button'
                            onClick={() => {
                              openDialogBox(items.id);
                              updateDialogContent('refund', items.id);
                            }}
                            disabled={disabledButtons[items.id]}
                          >
                            Refund
                          </button>
                        </div>
                        <div>
                          <button
                            className='btn btn-primary buttons_typo user_cancelation_button'
                            onClick={() => {
                              openDialogBox(items.id);
                              updateDialogContent('reissue', items.id);
                            }}
                            disabled={disabledButtons[items.id]}
                          >
                            ReIssue
                          </button>
                        </div> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
              >
                <DialogTitle id='alert-dialog-title'>{dialogContent.title}</DialogTitle>
                <DialogContent>
                  <DialogContentText id='alert-dialog-description'>{dialogContent.description}</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => handleClose(dialogContent.userID)}>Disagree</Button>
                  <Button onClick={() => handleAgreeClick(dialogContent.userID)} autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          ):(
          <div className='text-center py-5 bg-white'>
            <img className='dataNotfound' src={dataNotfound} alt='dataNotfound' />
            <h2>No flight bookings found</h2>
            <p>Explore Destinations, Book Your Flight </p>
          </div>
        )
      }
    </div>
    )
  )
}

export default UserCustomerSupport;