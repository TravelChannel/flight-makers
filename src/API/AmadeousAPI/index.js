import { MasterPriceTravelBoard } from "./MasterPriceTravelBoard";

// -------MasterPriceTravelBoard Call----------------

export const MasterPriceTravelResults = async() => {
   try{
    const responce = await MasterPriceTravelBoard();
    return responce;
   }catch(error){
    console.error("Error_at_MasterPriceTravelResults",error);
    return null; 
   }

}