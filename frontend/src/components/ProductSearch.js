import React, { useState } from "react";
import ProductCard from "./ProductCard";

const ProductSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://products-backend-h4em.onrender.com/products/searchByName`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: searchQuery }),
        }
      );
      const data = await response.json();
      console.log(data);
      setSearchResults(data);
    } catch (error) {
      console.error("Error searching for product:", error);
    }
  };

  return (
    <div>
      <h2>Product Search</h2>
      <div className="form-group">
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          className="form-control"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>
      <h3>Search Results:</h3>
      <ul>
        {searchResults.map((product) => (
          <ProductCard productProp={product} key={product._id} />
        ))}
      </ul>
    </div>
  );
};

export default ProductSearch;
