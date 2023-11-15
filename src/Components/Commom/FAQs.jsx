import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const FAQs = () => {
  return (
    <div className='container bg-white'>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography >What is an e-ticket?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        Electronic ticket (e-ticket) is a paperless electronic document with a unique confirmation number that replaces the hassles of a paper ticket. When you purchase an e-ticket, we email it to you within 30 minutes of your booking. Simply print it out and bring it with you along with a valid travel documents to the airline counter when checking in for your flight.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>Can I book tickets for infants on Faremakers?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        Yes, you can book travel for infants less than two years of age on Faremakers. Make sure they have valid proof-of-age documents when they're checking in, and remember that infants must be accompanied by an adult at least 18 years old. You can book no more than one infant per adult. To avail of infant fares, the infant must be under 24 months of age throughout the entire itinerary that you're booking. This includes both outbound and return journeys. If the infant is 24 months or above on the return journey, you need to make a separate booking using a child fare.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>What is the maximum number of seats I can book?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        A maximum of 5 seats can be booked at one time. If you need to book for more than 5 travelers you will have to re-complete the booking process for the additional travelers.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>Can I book a multi-city trip?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        Yes, you can book multi city trip on faremakers.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>Can I book a multi-city trip?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        Yes, you can book multi city trip on faremakers.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>Does Faremakers offer any Discounts?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        Yes, faremakers offering discounts in the shape of special offers, Stay sharp and you might grab a great deal and subscribe to for news alerts so we keep sending you promotions via emails.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>I've been getting zero flight results on the search page. What gives?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        Clear your browser cache and try the search again. If you still don't get any flight results, it may either be because we can't find flights for that route or because there's no availability of flights for your dates.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>Where do I enter my frequent flyer number while booking domestic flights?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        We do not have an option of entering the frequent flier number at the time of booking domestic flights. However, we can certainly pass on your frequent flier number to the airline. Just call us as soon as you book your ticket and tell us your trip id and your frequent flier number.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>How do I know my reservation was booked?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        We'll send you an SMS and an email to confirm your flight booking.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>Do I need to confirm my flight reservation before I fly?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        No, you don't. If you really want to, though, you can by writing to our Customer Support Team at support@faremakers.com or by contacting the airline directly.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>How do I confirm my seat assignments?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        Faremakers doesn't do pre-seating. Some airlines will confirm your seat assignments - their rules for doing so vary - so call your airline directly to check whether you get to choose your seat. please call our customer care any time between 9 am and 7 pm Pakistani time at 03 111 147 111.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>How do I get my e-ticket details?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        We'll send your e-ticket details to the email address you gave us when you made your reservation or in case you are registered customer so we will send your e-ticket on same email address from which you are registered.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>How do I get a boarding pass for an e-ticket?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        You need to show your e-ticket confirmation email and your e-ticket number at the check-in counter. The airline representative will issue your boarding pass at that time.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>Do I have to show my e-ticket confirmation email at the airline check-in counter?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        Yes, you do. Some airports don't allow you inside without a printout of your e-ticket, so be sure to carry one with you. If you've forgotten your e-ticket printout but can get to a computer, use our handy Faremaker Ticket service (www.faremakers.com/ticket)to print yourself a copy.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>What if my paper tickets are lost or stolen?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        If this happens, email us immediately on support@faremakers.com and we'll help you process a lost ticket application.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>Do I have to show ID proof at the time of checks-in?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        Yes. The airline and airport authorities may or may not check your ID proof but we strongly recommend that you carry a government-issued photo-id proof with you whenever you fly.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>How do I find out my baggage limit?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        Just visit http://www.faremakers.com/terms/airline_terms.shtml and select the airline you're flying. You can find the baggage limit under the 'Baggage Allowance' section.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>I've booked my tickets but need to add my child's tickets to my booking. How do I do it?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        Unfortunately, a child cannot be added to an existing reservation. You will need to book a separate ticket for your child or please call our customer care representative any time between 9 am and 7 pm Pakistani time at 03 111 147 111.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>I misspelled my name while booking a ticket. How do I get it changed?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        You can call us to check if the airline you've booked with entertains change-of-name requests. We suggest please enter your name as per the passport. However, if the airline doesn't allow it, you'll have to cancel and re-book the ticket.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>How do I print my ticket?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        Go to www.faremakers.com/ticket. Enter your Trip ID and the last name of any of the passengers and you'll be able to see your e-ticket. Print it or email it.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>I have forgotten my trip id. What do I do?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        Just login to your Faremakers account (www.faremakers.com/account) using the email id you provided us while booking and your password. On your Trips page you'll be able to access all your completed and upcoming trips. If you've forgotten the password, you can use the 'Forgot password' feature.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>I selected the wrong prefix (Mr/Mrs) to a passenger's name while booking. How can I get this changed?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        Just call us and tell us your trip ID. We'll find out if your airline supports title change and if it does, we'll pass on your details to them. If the airline doesn't allow title change you'll have to cancel and then re-book the ticket with the correct title.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>Is it possible to book tickets for another person through my account?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        Yes, just enter the details of the passengers you want to book for when you're asked to enter traveler-details at the time of booking.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>How do I cancel a flight reservation?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        Four easy steps, after you enter in customer support page. 1. Select refund and cancellations 2. Click on the "Cancellations" link 3. Enter your necessary information in required fields 4. Hit the "Make cancellations" button We'll send you a confirmation email telling you what to do next. In case you not received any email so please call to our customer representative on our toll free number. All cancellations incur a cancellation fee which will be deducted at the time of the refund. Please keep in mind, however, that most international fares do not refund utilized tickets it's depend the refund policies. If you have more questions about the cancellation process, please call our customer care any time between 9 am and 7 pm Pakistani time at 03 111 147 111.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>The flight I booked was cancelled by the airline. How do I get my money back?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        If the flight you booked got cancelled, you are entitled to a full refund after deduction of online card payment charges and reversal charges. 1. We request you to cancel your booking online first. 2. Once you have done this, please send an email to support@faremakers.com along with your Trip ID and if you mention that your flight was cancelled, we will make sure you get a full refund, after verifying the same with the airline.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>What are the cancellation charges?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        The cancellation charges depend on the airline, sector, class of booking, and time of cancellation. To know what's applicable in your case, check the fare rules mentioned on the booking page when you're making your reservation (in case you missed it then, you can always go back to your Faremakers Account and check out your trips pages).
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>How will I get my money back after a cancellation?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        We will credit the money back to the same account you used while making the booking. For example, if you used your credit card, we will make an appropriate charge reversal. If you used your debit card, we will credit the money back to the debit card after settle online payment charges.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>How long does it take to process a refund?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        We usually process the refund within 4 working days of cancellation. However, it may take time as per the Air Line policies mostly refunds come after 40 to 45 working Days.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>I still haven't received my refund. Help!</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        We're extremely sorry for the goof up. Hop on to our Complaints Forum and holler for help. Someone will get back to you pretty soon.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className="accordation_main">
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                        style={{ backgroundColor: '#f5f5f5' }}
                        >
                        <Typography>I booked my flights on Faremakers but then cancelled them by directly contacting the airline. How do I claim my refund?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography className='typography_size'>
                        We strongly recommend that you let us know immediately after cancelling directly with the airline. Depending on your bank, the refund generally takes 40 to 45 working days (from the day we find out about the cancellation) to get processed.
                        </Typography>
                        </AccordionDetails>
                    </Accordion>

                    
                    </div>
  )
}

export default FAQs;