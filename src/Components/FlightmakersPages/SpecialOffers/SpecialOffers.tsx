
import "./SpecialOffers.css";

const SpecialOffers = () => {
  return (
    <section className="special-offers">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Special Offers</h2>
          <p className="section-subtitle">
            Take advantage of our limited-time deals and save big on your next journey
          </p>
        </div>
        
        <div className="offers-grid">
          {/* First Offer */}
          <div className="offer-card">
            <div className="offer-overlay blue-gradient"></div>
            <img 
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3" 
              alt="Early Bird Special" 
              className="offer-image"
            />
            <div className="offer-content">
              <span className="offer-badge orange">Limited Time</span>
              <h3 className="offer-title">Early Bird Special</h3>
              <p className="offer-description">Book your summer vacation now and get up to 40% off on selected destinations worldwide.</p>
              <button className="offer-button white">Learn More</button>
            </div>
          </div>
          
          {/* Second Offer */}
          <div className="offer-card">
            <div className="offer-overlay orange-gradient"></div>
            <img 
              src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3" 
              alt="Weekend Getaway" 
              className="offer-image"
            />
            <div className="offer-content">
              <span className="offer-badge blue">Popular</span>
              <h3 className="offer-title">Weekend Getaway Package</h3>
              <p className="offer-description">Perfect for quick escapes. Includes flights, 3-night hotel stays, and exclusive experiences.</p>
              <button className="offer-button white">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
