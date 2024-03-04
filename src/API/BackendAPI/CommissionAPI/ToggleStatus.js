import apiClient from "../api_main";

export const toggleCommission = async (id) => {
    try {
        const response = await apiClient.patch(`/commissionPercentage/toggleStatus/${id}`);
        if (response.data.status === 'SUCCESS') {
            console.log(response.data.message, `Commission-Status Toggle success`);
            return response;
        } else {
            console.log(response.data.message, 'Commission-Status Toggle danger');
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error(error.message, 'Danger Danger');
        throw error;
    }
}