import { useState } from "react";
import "./style.css";
import { useEffect } from "react";
import axios from "axios";

function LoadMore() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [errMsg, setErrorMsg] = useState("");
  const url = `https://dummyjson.com/products?limit=20&skip=${
    count === 0 ? 0 : count * 20
  }`;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        console.log(response.data);
        if (response.data.products && response.data.products.length) {
          setProducts(response.data.products);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setErrorMsg(error.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [url]);

  if (loading) {
    return (
      <section className="wrapper">
        <p>Data Loading, Please Wait ...</p>
      </section>
    );
  }

  if (errMsg) {
    return (
      <section className="wrapper">
        <p>{errMsg}</p>
      </section>
    );
  }

  console.log(products);
  return (
    <section className="wrapper">
      <section className="products">
        {products && products.length
          ? products.map((product) => {
              return (
                <section key={product.id} className="product-card">
                  <img src={product.thumbnail} alt={product.title} />
                  <section className="content">
                    <h4>{product.title}</h4>
                    <p>{product.description}</p>
                  </section>
                </section>
              );
            })
          : null}
      </section>
      <section>
        <button className="load-more">Load More Products</button>
      </section>
    </section>
  );
}

export default LoadMore;
