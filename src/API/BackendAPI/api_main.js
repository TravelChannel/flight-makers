import axios from "axios";
import Cookies from "js-cookie";
// import ClearCookies from './clearCookies';
// import Icon from '../components/icon/Icon';
// import showNotification from '../components/extras/showNotification';
// import { _titleCustom } from './messages';

// import { demoPages } from '../menu';

const apiClient = axios.create({
  //   baseURL: 'https://fmnodebackend.azurewebsites.net/api/',

  baseURL: "http://localhost:5000/api/",

  //  baseURL: "https://api.faremakers.com/api/",

      // baseURL: "https://api.flightmakers.com/api/",

      // baseURL: "http://api.flightmakers.com/api/",


  //  baseURL: 'https://faremakersnode-fmnode-back.azurewebsites.net/api/',
  //  baseURL: 'https://faremakersnode-fmnode-back.azurewebsites.net/api/',
  withCredentials: true,
  // baseURL: 'http://192.168.18.65/KBD_Backend/api', /// Danish
  // baseURL: 'http://192.168.18.94/KBD_Backend/api', // Husnain
  // baseURL: 'http://192.168.18.128/KBD_Backend/api', // Hashi
  // baseURL: 'http://localhost/KBD_Backend/api',
  timeout: 60000,
  // headers: {
  //      Authorization: `Bearer ${Cookies.get("Access_token")}`,
  // },
});
apiClient.interceptors.request.use(
  function (config) {
    const accessToken = Cookies.get("Access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// const _titleError = (
// 	<span className='d-flex align-items-center'>
// 		<Icon icon='Info' size='lg' className='me-1' />
// 		<span>Error Saving Record </span>
// 	</span>
// );
// apiClient.interceptors.request.use(
// 	(config) => {
// 		const token = Cookies.get('userToken'); // Replace with your token retrieval logic
// 		if ('') {
// 			config.headers.Authorization = `Bearer ${''}`;
// 		}
// 		return config;
// 	},
// 	(error) => {
// 		Promise.reject(error);
// 	},
// );
// apiClient.interceptors.response.use(
// 	(response) => {
// 		const customRes = {
// 			...response,
// 			color: response.data.status === 'ok' ? 'success' : 'danger',
// 			icon: response.data.status === 'ok' ? 'Done' : 'warning',
// 			title: response.data.status === 'ok' ? 'Success' : 'Error',
// 		};
// 		if (response.config.method === 'post' || response.config.method === 'delete') {
// 			console.log(
// 				_titleCustom({ title: customRes.title, icon: customRes.icon }),
// 				customRes.data.message,
// 				customRes.color,
// 			);
// 		}

// 		return customRes;
// 	},

// 	(error) => {
// 		try {
// 			const errorMessage = error.response.data.message;
// 			if (
// 				/token has expired/i.test(errorMessage) ||
// 				/The token could not be parsed from the request/i.test(errorMessage) ||
// 				/the token has been blacklisted/i.test(errorMessage)
// 			) {
// 				ClearCookies();
// 				console.log(_titleError, error.response.data.message, 'danger');

// 				Redirect user to login page
// 				window.location.href = '/RehbarSociety/auth-pages/login';
// 			} else if (/Too Many Attempts./i.test(errorMessage)) {
// 				console.log(
// 					_titleError,
// 					`${error.response.data.message} Please Wait`,
// 					'danger',
// 				);
// 			}
// 		} catch (err) {
// 			console.log('err interceptor Catch', err);
// 			handle errors that occur during error handling
// 			console.log(_titleError, err.message, 'danger');
// 		}
// 		return Promise.reject(error);
// 	},
// );

export default apiClient;
