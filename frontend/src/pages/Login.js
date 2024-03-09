import { useState, useEffect, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import UserContext from "../UserContext";
import { Navigate, Link } from "react-router-dom";
import { MdMailOutline, MdLockOutline } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import logo from "../assets/eco_logo.png";

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

  const [showPassword, setShowPassword] = useState(false);

  return user.id !== null ? (
    <Navigate to="/products" />
  ) : (
    <div className="row mt-3 justify-content-center">
      <div className="col-12 col-md-8 col-xl-4 mx-auto" id="container-login">
        <Link to={`/`} className="position-absolute top-0 end-0 mt-2 me-2">
          <i className="bi bi-x bi-smaller"></i>
        </Link>
        <Form onSubmit={(e) => authenticate(e)}>
          <img
            src={logo}
            alt="Logo"
            className="my-2 mx-auto d-block"
            id="img-logo"
          />
          <Form.Group controlId="userEmail">
            <Form.Label>Email</Form.Label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <MdMailOutline />
                </span>
              </div>
              <Form.Control
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <MdLockOutline />
                </span>
              </div>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="input-group-append">
                <Button
                  variant="outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
            </div>
          </Form.Group>

          {isActive ? (
            <Button variant="success" type="submit" id="submitBtn">
              Submit
            </Button>
          ) : (
            <Button variant="success" type="submit" id="submitBtn" disabled>
              Sign in
            </Button>
          )}
          <Link to={"/register"}>
            <label className="registerlabel">
              Don't have an account? Register here
            </label>
          </Link>
        </Form>
      </div>
    </div>
  );
}
