import DashboardIcon from '../../../src/assets/BackendAssests/icons/dashboard.svg';
import ShippingIcon from '../../../src/assets/BackendAssests/icons/shipping.svg';
import ProductIcon from '../../../src/assets/BackendAssests/icons/product.svg';
import UserIcon from '../../../src/assets/BackendAssests/icons/user.svg';
// ------------------------------------



const sidebar_menu = [
    {
        id: 1,
        icon: DashboardIcon,
        path: '/userPanel/dashboard',
        title: 'Dashboard',
    },
    {
        id: 2,
        icon:UserIcon ,
        path: '/userPanel/orders',
        title: 'User Profile',
    },
    {
        id: 3,
        icon: ShippingIcon,
        path: '/userPanel/bookings',
        title: 'User Bookings',
    },
    {
        id: 4,
        icon: ProductIcon,
        path: '/userPanel/refund',
        title: 'Refund and Cancellation Policies',
    },
    {
        id: 5,
        icon: UserIcon,
        path: '/userPanel/userSupport',
        title: 'Support',
    },
    
]

export default sidebar_menu;