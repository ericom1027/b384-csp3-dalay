import ProductCard from "../components/ProductCard";
import { useEffect, useState, useContext } from "react";
import UserView from "../components/UserView";
import AdminView from "../components/AdminView";
import UserContext from "../UserContext";

export default function Products() {
  const { user } = useContext(UserContext);

  const [products, setProducts] = useState([]);

  const fetchData = () => {
    let fetchUrl =
      user.isAdmin === true
        ? `${process.env.REACT_APP_API_BASE_URL}/products/all`
        : `${process.env.REACT_APP_API_BASE_URL}/products/`;

    fetch(fetchUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(typeof data);

        if (typeof data.message !== "string") {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {user.isAdmin === true ? (
        <AdminView productsData={products} fetchData={fetchData} />
      ) : (
        <UserView productsData={products} />
      )}
    </>
  );
}
