import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ProductCard({ productProp }) {
  const { _id, name, description, price } = productProp;
  console.log(_id);

  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle>Description:</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Card.Subtitle>Price:</Card.Subtitle>
        <Card.Text>PhP {price}</Card.Text>
        <Link className="btn btn-primary" to={`/product/${_id}`}>
          Details
        </Link>
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  productProp: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};
