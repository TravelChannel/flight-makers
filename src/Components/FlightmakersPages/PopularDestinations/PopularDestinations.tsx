
import "./PopularDestinations.css";
import  destinations from '../PopularDestinations/common/popularDestinationsDetail';
interface DestinationCardProps {
  name: string;
  image: string;
  price: string;
}

const DestinationCard = ({ name, image, price }: DestinationCardProps) => {
  return (
    <div className="destination-card">
      <div className="destination-image-container">
        <div className="aspect-ratio">
          <img 
            src={image} 
            alt={name} 
            className="destination-image" 
          />
        </div>
        <div className="destination-info">
          <h3 className="destination-name">{name}</h3>
          <p className="destination-price">
            <span>Starting from</span>
            <span className="price-amount">{price}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const PopularDestinations = () => {


  return (
    <section className="popular-destinations bg-white" >
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Popular Destinations</h2>
          <p className="section-subtitle">
            Explore our most sought-after destinations with exclusive deals and unforgettable experiences
          </p>
        </div>
        
        <div className="destinations-grid ">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={index}
              name={destination.name}
              image={destination.image}
              price={destination.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;
