import apiClient from "../api_main";
export const UpdateBlogAPI = async (passingobj) => { 
    console.log("values",passingobj)
    try {
        const response = await apiClient.patch(`/blogs/${passingobj.idz}`,passingobj.formData);
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