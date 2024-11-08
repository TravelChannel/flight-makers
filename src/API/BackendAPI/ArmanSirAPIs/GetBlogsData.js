export const GetBlogsData = async(path) =>{
    try{
        if(path.startsWith('/blogs')){
              path = path.replace('/blogs/','');
            }
       console.log("path-abc",path);
    const url =`https://fmcrm.azurewebsites.net/Handlers/FMConnectApis.ashx?type=100&header_url=${path}`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        });
  
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
  
        const result = await response.json();
        console.log('Success:', result);
        return result;
    }catch(error){
        console.error('Error:', error);
        throw error;
    }
}