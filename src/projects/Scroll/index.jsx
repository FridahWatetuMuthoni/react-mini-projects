import { useRef } from "react";
import data from "./data";
import "./style.css";

function Scroll() {
  const bottomRef = useRef(null);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleScrollToBottom = () => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="wrapper">
      <section className="items">
        <button onClick={handleScrollToBottom}>Go To Bottom</button>
        {data && data.length > 0
          ? data.map((item, index) => {
              return <p key={index}>{item.question}</p>;
            })
          : null}
        <button onClick={handleScrollToTop}>Scroll to the Top</button>
        <div ref={bottomRef}></div>
        <h3>This is the bottom of the page</h3>
      </section>
    </section>
  );
}

export default Scroll;
