import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";
import image1 from "../assets/carousel-image1.jpg";
import image2 from "../assets/carousel-image2.jpg";
import image3 from "../assets/carousel-image3.jpg";

export default function ProductCarousel() {
  return (
    <div className="container-fluid text-dark min-vw-100 p-3 p-md-5 py-5 py-lg-5">
      <div className="row">
        <div className="col-md-6 my-lg-auto mt-md-5">
          <Carousel data-bs-theme="dark">
            <Carousel.Item>
              <img
                className="d-block w-100 img-fluid rounded"
                src={image1}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 img-fluid rounded"
                src={image2}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 img-fluid rounded"
                src={image3}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="col-md-6 pl-md-5 py-lg-5 my-auto">
          <p className="mb-0">Best Quality Products</p>
          <h1 className="mt-2 text-md-left">Join The Eco Movement!</h1>
          <p>
            To alleviate the environmental impact and contribute to carbon
            offset, we've streamlined our manufacturing processes and introduced
            a pioneering feature called EcoCart for our golf cars. EcoCart
            analyzes the carbon footprint associated with each golf cart
            production, providing recommendations for offsetting measures. This
            allows us to not only enhance your golfing experience but also
            prioritize sustainability by making conscious choices in the
            manufacturing and usage of our golf carts. Join us in driving
            towards a greener and more eco-friendly fairway with Eco Cart.
          </p>
          <Link to="/products" className="btn btn-primary">
            Buy Now!
          </Link>
        </div>
      </div>
    </div>
  );
}
