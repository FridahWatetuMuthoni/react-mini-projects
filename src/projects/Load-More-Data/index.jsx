import { useState } from "react";
import "./style.css";
import { useEffect } from "react";
import axios from "axios";

function LoadMore() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [errMsg, setErrorMsg] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  const [totalItems, setTotalItems] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = `https://dummyjson.com/products?limit=20&skip=${
          count === 0 ? 0 : count * 20
        }`;
        setLoading(true);
        const response = await axios.get(url);
        console.log(response.data);
        console.log(count);
        if (response.data.products && response.data.products.length) {
          if (count === 0) {
            setProducts(response.data.products);
            setTotalItems(response.data.total);
          } else {
            setProducts((prev) => [...prev, ...response.data.products]);
          }
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setErrorMsg(error.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [count]);

  useEffect(() => {
    if (totalItems !== null && products.length === totalItems) {
      setDisableBtn(true);
    }
  }, [products, totalItems]);

  const handleLoadMore = () => {
    setCount(count + 1);
  };

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
        {!disableBtn ? (
          <button onClick={handleLoadMore} className="load-more">
            Load More Products
          </button>
        ) : null}
      </section>
    </section>
  );
}

export default LoadMore;
