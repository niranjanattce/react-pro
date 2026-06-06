import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import './productdetails.css'


interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

function ProductDetails() {
  const { no } = useParams();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${no}`
        );

        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [no]);

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="details-container">
      <Link to="/Product">Back</Link>

      <div className="details-card">
        <img
          src={product.thumbnail}
          alt={product.title}
        />

        <h1>{product.title}</h1>

        <h2>Price: ₹{product.price}</h2>

        <p>{product.description}</p>

        <h3>Category: {product.category}</h3>

        <h3>Brand: {product.brand}</h3>

        <h3>Rating: {product.rating}</h3>

        <h3>Stock: {product.stock}</h3>
      </div>
    </div>
  );
}

export default ProductDetails;