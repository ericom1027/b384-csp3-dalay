import { Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";
import Swal from "sweetalert2";

export default function EditProduct({ product, fetchData }) {
  const [productId, setProductId] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [showEdit, setShowEdit] = useState(false);

  const openEdit = (productId) => {
    fetch(`https://products-backend-h4em.onrender.com/products/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProductId(data.product._id);
        setName(data.product.name);
        setDescription(data.product.description);
        setPrice(data.product.price);
      });

    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);
    setName("");
    setDescription("");
    setPrice(0);
  };

  const editProduct = (e, productId) => {
    e.preventDefault();

    fetch(
      `https://products-backend-h4em.onrender.com/products/${productId}/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: name,
          description: description,
          price: price,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.message === "Product updated successfully") {
          Swal.fire({
            title: "Success!",
            icon: "success",
            text: "Product Successfully Updated",
          });

          closeEdit();
          // Add this
          fetchData();
        } else {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "Please try again",
          });

          closeEdit();
          // Add this
          fetchData();
        }
      });
  };

  return (
    <>
      <Button variant="primary" size="sm" onClick={() => openEdit(product)}>
        {" "}
        Edit{" "}
      </Button>

      <Modal show={showEdit} onHide={closeEdit}>
        <Form onSubmit={(e) => editProduct(e, productId)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="productName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="productDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="productPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEdit}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
