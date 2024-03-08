import { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import UserContext from "../UserContext";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(true);

  function authenticate(e) {
    e.preventDefault();
    fetch(`https://products-backend-h4em.onrender.com/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.access !== "undefined") {
          localStorage.setItem("token", data.access);
          retrieveUserDetails(data.access);

          Swal.fire({
            title: "Login Successful",
            icon: "success",
            text: "Welcome to Eco Cart!",
          });
        } else if (data.error === "No Email Found") {
          Swal.fire({
            title: "Email not found.",
            icon: "error",
            text: "Check the email  you provided.",
          });
        } else {
          Swal.fire({
            title: "Authentication failed",
            icon: "error",
            text: "Check your login details and try again.",
          });
        }
      });

    setEmail("");
    setPassword("");
  }

  const retrieveUserDetails = (token) => {
    fetch(`https://products-backend-h4em.onrender.com/users/details`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser({
          id: data.user._id,
          isAdmin: data.user.isAdmin,
        });
      });
  };

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [email, password]);

  return user.id !== null ? (
    <Navigate to="/products" />
  ) : (
    <div className="row mt-3 justify-content-center">
      <div className="col-12 col-md-8 col-xl-4">
        <Form onSubmit={(e) => authenticate(e)}>
          <h1 className="my-5 text-center">Login</h1>
          <Form.Group controlId="userEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          {isActive ? (
            <Button variant="primary" type="submit" id="submitBtn">
              Submit
            </Button>
          ) : (
            <Button variant="primary" type="submit" id="submitBtn" disabled>
              Submit
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
}
