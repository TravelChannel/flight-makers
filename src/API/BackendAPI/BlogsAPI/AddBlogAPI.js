import apiClient from "../api_main";

export const AddBlogAPI = async (formData) => {
    try {
        const response = await apiClient.post(`/blogs`, formData);
        if (response.data.status === 'SUCCESS') {
            console.log(response.data.message, 'SUCCESS');
            return response;
        } else {
            console.log(response.data.message, 'danger');
        }
    } catch (error) {
        console.error(error.message, 'Danger');
    }
}