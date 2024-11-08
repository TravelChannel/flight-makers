
import DashboardIcon from '@mui/icons-material/Dashboard';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ReceiptIcon from '@mui/icons-material/Receipt';
import WalletIcon from '@mui/icons-material/Wallet';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import LogoutIcon from '@mui/icons-material/Logout';

export const UserPanelData = [ 
    { title: 'Booking Details', icon: <DashboardIcon /> ,path :'Booking-details'},
    { title: 'Admin-Profile' ,title2: 'User-Profile', icon: <AirplaneTicketIcon />,path :'Admin-Profile',path2:'User-Profile'},
    { title: 'Users List', icon: <PeopleOutlineIcon />, path:'users-list' },
    { title: 'Purchase Bookings', icon: <ReceiptIcon />, path:'purchased-bookings' },
    { title: 'Customer Support', icon: <WalletIcon />, subMenu: ['ReIssue', 'Refund', 'Cancellation'],path: ['ReIssue', 'Refund', 'Cancellation'] } , 
    { title: 'Promotions', icon: <RecordVoiceOverIcon /> , path:'promotions'},
    { title: 'Blogs', icon: <BookOutlinedIcon />, subMenu: ['Add Blog', 'Blog Lists'] ,path:['Add Blog', 'Blog Lists'] },
    { title: 'Service Charges', icon: <ReceiptIcon />, path:'Service-Charges'},
    { title: 'Rate Us', icon: <StarHalfIcon /> ,path:'Rate-Us' },
    { title: 'Logout', icon: <LogoutIcon /> ,path:'logout' }
]