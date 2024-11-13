import apiClient from "./api_main";

const userDetailsBackend = async () => {
  try {
    const response = await apiClient.get("/pnrBooking?page=2&pageSize=10");
    console.log(JSON.stringify(response));
    return response;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
};

export default userDetailsBackend;
