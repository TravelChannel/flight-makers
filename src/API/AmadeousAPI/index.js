import { MasterPriceTravelBoard } from "./MasterPriceTravelBoard";
import MasterPriceCalander from "./MasterPriceCalander";
import { FareBestpricing_WithOutPNR } from "./FareInformative_BestPricing_WithoutPNR";

// (1)----------------MasterPrice Calander Call-------------------
export const MasterPriceCalanderRes = async (searchDataArr) => {
  try {
    const responce = await MasterPriceCalander(searchDataArr);
    return responce;
  } catch (error) {
    console.error("Error_at_MasterPriceCalanderRes", error);
    return null;
  }
};

// (2)-------MasterPriceTravelBoard Call----------------

export const MasterPriceTravelResults = async (searchDataArr) => {
  try {
    const responce = await MasterPriceTravelBoard(searchDataArr);
    return responce;
  } catch (error) {
    console.error("Error_at_MasterPriceTravelResults", error);
    return null;
  }
};

// (3)--------FareInformative Best Pricing without PNR-----------
export const FarePricing_withOutPNR = async (flightData) => {
  try {
    const responce = await FareBestpricing_WithOutPNR(flightData);
    return responce;
  } catch (error) {
    console.error("Error_FarePricing_withOutPNR", error);
    return null;
  }
};
