import apiClient from "./api_main";

const userDetailsBackend = async (obj) => {
  try {
    console.log("check_pagination_obj",obj);
    const response = await apiClient.get(`/pnrBooking?page=${obj.page}&pageSize=${obj.pageSize}`);
    console.log(JSON.stringify(response));
    return response;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export default userDetailsBackend;
