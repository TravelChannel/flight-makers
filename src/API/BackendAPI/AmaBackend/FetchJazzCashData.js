import apiClient from "../api_main";

export const fetchJazzCashFormData = async (
  orderId,
  userID,
  totalTicketPrice,
  userVerName,
  pnrNum // not currently used
) => {
  const requestBody = {
    pp_TxnType: "", // Consider setting this or removing it if not needed
    pp_BillReference: orderId,
    pp_CustomerID: userID,
    pp_Amount: totalTicketPrice,
    pp_CustomerMobile: userVerName,
  };

  try {
    const response = await apiClient.post(
      "/payment/PaymentAtJazzCash",
      requestBody
    );

    const params = response.data?.serviceResponse;

    if (!params) {
      throw new Error("Invalid response format from server.");
    }

    console.log("params-check", params);
    return params;
  } catch (error) {
    console.error("Error Fetching Payment Form:", error);
    return null; // Optional: make it consistent for the caller
  }
};
