import React from "react";
import FAQs from "../Components/Commom/FAQs";
import WriteToUs from "../Components/Commom/WriteToUs";

const menuItems = [
    { title: 'Write to Us', component: <WriteToUs />, path: '/write-to-us' },
    { title: 'FAQ', component: <FAQs />, path: '/faq' },
    // Add more menu items as needed
];


export default menuItems;