import apiClient from "../api_main";
const SiteMapData = async()=>{
    try{
        const responce = await apiClient.get(`/generalTask`);
        if(responce.data.status === 'SUCCESS'){
            console.log(responce.data.message, 'Get SiteMap Data SUCCESS');
            return responce;
        } else{
            console.log(responce.data.message, 'danger  SiteMap ');
        }

    }catch(error){
        console.error(error.message, 'Danger SiteMap');
    }
}

export default SiteMapData;