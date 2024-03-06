import React, { useState, useEffect, useContext } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import UserContext from "../UserContext";
import Swal from "sweetalert2";

export default function ProductView() {
  const { productId } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const addToCart = () => {
    const subTotal = price * quantity;

    fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/add-to-cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        productId,
        quantity,
        subTotal,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        if (data.error === "Admin is forbidden") {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "Admin is forbidden",
          });
        } else if (data.message === "Product added to cart successfully") {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "You have successfully added this item to your cart!",
          });

          navigate("/products");
        } else {
          Swal.fire({
            title: "Something went wrong",
            icon: "error",
            text: "Please try again",
          });
        }
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Internal server error. Please try again later.",
        });
      });
  };

  useEffect(() => {
    fetch(`http://localhost:4000/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setName(data.product.name);
        setDescription(data.product.description);
        setPrice(data.product.price);
      });
  }, [productId]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 0 && newQuantity <= 20) {
      setQuantity(newQuantity);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Body className="text-center">
              <Card.Title>{name}</Card.Title>
              <Card.Subtitle>Description:</Card.Subtitle>
              <Card.Text>{description}</Card.Text>
              <Card.Subtitle>Price:</Card.Subtitle>
              <Card.Text>PhP {price}</Card.Text>
              {user.id !== null ? (
                <>
                  <Row className="mb-3">
                    <Col xs={2}>
                      <Button
                        variant="secondary"
                        size="sm" // Set the size to small
                        onClick={() => setQuantity(Math.max(0, quantity - 1))}
                      >
                        -
                      </Button>
                    </Col>
                    <Col xs={8}>
                      <input
                        type="number"
                        value={quantity}
                        min="0"
                        max="20"
                        readOnly
                        className="form-control"
                      />
                    </Col>
                    <Col xs={2}>
                      <Button
                        variant="secondary"
                        size="sm" // Set the size to small
                        onClick={() => setQuantity(Math.min(20, quantity + 1))}
                      >
                        +
                      </Button>
                    </Col>
                  </Row>

                  <Button
                    variant="primary"
                    onClick={() => addToCart(productId, quantity)}
                    block={true}
                  >
                    Buy Now!
                  </Button>
                </>
              ) : (
                <Link className="btn btn-danger btn-block" to="/login">
                  Please Login!
                </Link>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
