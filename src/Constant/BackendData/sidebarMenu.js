import DashboardIcon from '../../../src/assets/BackendAssests/icons/dashboard.svg';
import ShippingIcon from '../../../src/assets/BackendAssests/icons/shipping.svg';
import ProductIcon from '../../../src/assets/BackendAssests/icons/product.svg';
import UserIcon from '../../../src/assets/BackendAssests/icons/user.svg';
// ------------------------------------



const sidebar_menu = [
    {
        id: 1,
        icon: DashboardIcon,
        path: '/dashboard',
        title: 'Dashboard',
    },
    {
        id: 2,
        icon: ShippingIcon,
        path: '/orders',
        title: 'User Profile',
    },
    {
        id: 3,
        icon: UserIcon,
        path: '/bookings',
        title: 'User Bookings',
    },
    {
        id: 4,
        icon: ProductIcon,
        path: '/refund',
        title: 'Refund and Cancellation Policies',
    },
    {
        id: 5,
        icon: UserIcon,
        path: '/support',
        title: 'Support',
    },
]

export default sidebar_menu;