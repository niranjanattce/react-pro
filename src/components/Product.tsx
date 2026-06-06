import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './product.css'






type Product = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
};

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const [search , setSearch]=useState("")
  


  


    useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products/search?q="+ search
        );

        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, [search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products"
        );

        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);


  return (
    <div className="container">
              
        
      <h1>All Products</h1>
      <input  className="search-bar" type="text" placeholder="search here" onChange={(e)=>setSearch(e.target.value)}/>

      <div className="product-container">
        {products.map((item) => (
          <div
            className="card"
            key={item.id}
            onClick={() =>
              navigate(`/product/${item.id}`)
            }
          >
            <img
              src={item.thumbnail}
              alt={item.title}
            />

            <h2>{item.title}</h2>

            <p>
              {item.description.slice(0, 50)}...
            </p>

            <h3>₹{item.price}</h3>

                    

          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;