import apiClient from "../api_main";
export const UpdateBlogAPI = async (id) => {
    try {
        const response = await apiClient.patch(`/blogs/${id}`);
        if (response.data.status === 'SUCCESS') {
            console.log(response.data.message, `Update Blog successfully`);
            return response;
        } else {
            console.log(response.data.message, 'Update Blog danger');
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error(error.message, 'Danger Danger');
        throw error;
    }
}