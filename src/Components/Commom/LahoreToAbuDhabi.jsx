import React, {useState} from 'react';

const LahoreToAbuDhabi = () => {
    const [flightOptions, setFlightOptions] = useState([
      {
        type: 'Direct Flights',
        description: 'Enjoy a hassle-free journey with direct flights available from Lahore to Abu Dhabi.',
      },
      {
        type: 'Connecting Flights',
        description: 'If you want to save more on your travel, consider our affordable connecting flights with reputable airlines.',
      },
    ]);
  
    const [faqs] = useState([
      {
        question: 'What is the flight duration from Lahore to Abu Dhabi?',
        answer: 'The flight duration for a direct flight from Lahore to Abu Dhabi is approximately 3-4 hours.',
      },
      {
        question: 'What airlines operate flights from Lahore to Abu Dhabi?',
        answer: 'Several airlines operate on this route, including Emirates, Etihad Airways, and Pakistan International Airlines (PIA).',
      },
      {
        question: 'Can I book my flight online?',
        answer: 'Yes, you can easily book your flight online through Faremakers.com, with secure payment options available.',
      },
      {
        question: 'What is the best time to book flights from Lahore to Abu Dhabi?',
        answer: 'The best time to book flights is typically 2-3 months in advance, especially during peak travel seasons.',
      },
      {
        question: 'Are there any baggage restrictions?',
        answer: 'Baggage policies vary by airline. Check the specific airline’s website for details on baggage allowances.',
      },
    ]);
  
    const handleBooking = () => {
      window.location.href = 'https://www.faremakers.com'; // Redirect to booking page
    };
  
    return (
      <div className='container bg-white'>
            <div className="flights-page p-4">
                    <h1 className='contact_us_heading d-flex justify-content-center m-3'>Cheap Flights from Lahore to Abu Dhabi</h1>
            
                    <section className='m-3'>
                    <h2>Why Choose Faremakers for Your Flight to Abu Dhabi?</h2>
                    <p>
                        Booking your flight from Lahore to Abu Dhabi with Faremakers ensures you get the best prices and exceptional service. 
                        Our platform offers a user-friendly interface, allowing you to compare flight options easily, whether you're traveling for business or leisure.
                    </p>
                    </section>
            
                    <section className='m-3'>
                    <h2>Flight Options Available</h2>
                    <ul>
                        {flightOptions.map((option, index) => (
                        <li key={index}>
                            <strong>{option.type}:</strong> {option.description}
                        </li>
                        ))}
                    </ul>
                    </section>
            
                    <section className='m-3'>
                    <h2>Tips for Booking Your Flight</h2>
                    <ul>
                        <li>Book in Advance: To get the best rates, book your tickets at least a few weeks in advance.</li>
                        <li>Flexible Dates: If your travel dates are flexible, use our date search tool to find cheaper flights.</li>
                        <li>Sign Up for Alerts: Subscribe to our newsletter to receive notifications about special offers and discounts.</li>
                    </ul>
                    </section>
            
                    <section className='m-3'>
                    <h2>Frequently Asked Questions (FAQs)</h2>
                    <ul className='my-2'>
                        {faqs.map((faq, index) => (
                        <li key={index} className='my-2'>
                            <strong>{faq.question}</strong>
                            <p>{faq.answer}</p>
                        </li>
                        ))}
                    </ul>
                    </section>
            
                    <section className='m-3'>
                    <h2>Conclusion</h2>
                    <p>
                        Don't miss out on the opportunity to explore Abu Dhabi's rich culture and stunning architecture. 
                        Book your cheap flights from Lahore to Abu Dhabi with Faremakers today, and embark on a memorable journey!
                    </p>
                    </section>
                </div>
      </div>
    );
  };
  
  export default LahoreToAbuDhabi;