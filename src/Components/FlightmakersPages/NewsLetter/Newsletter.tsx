
import { useState } from "react";
import "./Newsletter.css";
import { CustomerDetailLead } from "../../../API/BackendAPI/LeadCreationAPI/CustomerDetailLead";
import { BeatLoader } from "react-spinners";
import { toast } from 'react-toastify';
const Newsletter = () => {
  const [phone, setPhone] = useState("");
  const [isLoading  ,setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    // Here you would normally send this to your API
    console.log("Subscribing phone:", phone);
    
   
    
    setPhone("");
  };

  const PassLeadCreation =  {
    "leadData": {
        "depart": "LHE",
        "arrival": "DXB",
        "departDate": "2025-06-12",
        "returnDate": "01-01-1900",
        "airline": "PK",
        "classType": "Economy",
        "adult": 1,
        "child": 0,
        "infants": 0,
        "phoneNumber": phone,
        "useDetail": {
            "phoneNumber": phone,
            "userEmail": "kashifaurangzaib777@gmail.com",
            "dateOfBirth": "12-12-1999",
            "passportExpiryDate": "12-12-2030",
            "firstName": "Kashif",
            "lastName": "Hussain",
            "title": "Mr",
            "gender": "Male",
            "passportNo": "yh6891412"
        },
        "tripType": 1
    },
    "userData": [
        {
            "phoneNumber": phone,
            "userEmail": "kashifaurangzaib777@gmail.com",
            "dateOfBirth": "12-12-1999",
            "passportExpiryDate": "12-12-2030",
            "firstName": "Kashif",
            "lastName": "Hussain",
            "title": "Mr",
            "gender": "Male",
            "passportNo": "yh6891412"
        }
    ]
}

const handleSubscribe = async () => {
  try {
    setLoading(true);

    const leadCreationResp = await CustomerDetailLead(PassLeadCreation);
    console.log("LeadCreationResp:", leadCreationResp);

    if (leadCreationResp?.data?.status === "SUCCESS") {
      setPhone('');
       toast.success('Successfully subscribed! You ll now receive our best travel deals and tips.', {
                      autoClose: 3000,
                      position: "top-center"
                    });
    } else {
        toast.error('Successfully subscribed! You ll now receive our best travel deals and tips.', {
                      autoClose: 3000,
                      position: "top-center"
                    });
    }
  } catch (error) {
    console.error("Error while handling LeadCreation API:", error);
    alert("An unexpected error occurred");
  } finally {
    setLoading(false);
  }
};


  return (
    <section className="newsletter mb-3">
      <div className="container">
        <div className="newsletter-content">
          <h2 className="newsletter-title">Join Our Travel Community</h2>
          <p className="newsletter-description">
            Subscribe to receive exclusive deals, travel tips, and inspiration
            for your next adventure
          </p>

          <form onSubmit={handleSubmit} className="newsletter-form">
            <input
              type="tel"
              placeholder="Enter your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="newsletter-input"
            />
            {isLoading ? (
              <div className="d-flex justify-content-center">
                <BeatLoader color="#F26223" margin={20} size={14} />
              </div>
            ) : (
             <button type="submit" className="newsletter-button" onClick={handleSubscribe}>
              Subscribe Now
            </button>
            )}
          </form>

          <p className="privacy-notice">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
