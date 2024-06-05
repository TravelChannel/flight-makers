import React ,{useState} from 'react';
import CryptoJS from 'crypto-js';

const CalculateCheckSum = () => {
    const [isUrl ,setUrl] = useState('');
    // const [randomNum ,setRandomNum] = useState(0);
    const secretKey = 'F88E2F8A6F291D97';

    // const calculateChecksum = (customerTransactionId, item, amount, secretKey) => {
    //     const data = `Swich:${customerTransactionId}:${item}:${amount}`;
    //     const hash = CryptoJS.HmacSHA256(data, secretKey);
    //     return hash.toString(CryptoJS.enc.Hex);
    //   };
    
    const calculateChecksum = (key, plainText) => {
        const hash = CryptoJS.HmacSHA256(CryptoJS.enc.Latin1.parse(plainText), CryptoJS.enc.Latin1.parse(key));
        return hash.toString(CryptoJS.enc.Hex).toLowerCase();
    };

    
      const randomNuminRange = () => {
        return Math.floor(1000000000 + Math.random() * 9000000000);
      }

    const generateUrl = ()=>{

        const clientId = 'b49ede6b339049c6a03988af62cc2017';
        const customerTransactionId =randomNuminRange().toString();
        console.log("customerTransactionId",customerTransactionId);
        const item = 'testitem';
        const amount = 1000;
        const channel = 0;
        const billReferenceNo = '';
        const description = 'Testing transaction';
        const payeename = 'John Doe';
        const email = 'johndoe@example.com';
        const msisdn = '923408922375';

        const data = `Swich:${customerTransactionId}:${item}:${amount}`;
        const checksum = calculateChecksum(secretKey, data);

        // const checksum = calculateChecksum(customerTransactionId, item, amount, secretKey);

        console.log("checksum",checksum);

        const generatedUrl =`https://sandbox-payin-pwa.swichnow.com/?clientid=${clientId}&customerTransactionid=${customerTransactionId}&MERCHANT_TRANSACTION_ID=&item=${item}&amount=${amount}&channel=${channel}&billReferenceNo=${billReferenceNo}&description=${encodeURIComponent(description)}&checksum=${checksum}&payeename=${encodeURIComponent(payeename)}&email=${encodeURIComponent(email)}&msisdn=${msisdn}`;

        setUrl(generatedUrl);

    }

    const HandleGeneratedUrl = () =>{
        setUrl('');
    }
  return (
    <div className='mt-3'>
        <div className='text-center '>CalculateCheckSum</div>
            <div className='d-flex justify-content-center '>
            <button onClick={generateUrl} className='btn btn-primary'>Generate URL</button>
            <div className='mt-3'>
            <button onClick={HandleGeneratedUrl} className='btn btn-secondary ml-1'>Clear</button>
            </div>
            </div>
            {isUrl && <p>Generated URL: <a href={isUrl}>{isUrl}</a></p>}
           
    </div>
  )
}

export default CalculateCheckSum;