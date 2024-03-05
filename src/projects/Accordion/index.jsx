import { useState } from "react";
import data from "./data";
import "./style.css";
/*
TYPES OF ACCORDIONS
1.single selection
2.multiple selection
*/

function Accordion() {
  const [selected, setSelected] = useState(null);
  const [multipleSelection, setMultipleSelection] = useState(false);
  const [multipleIDS, setMultipleIDS] = useState([]);

  const handleSingleSelection = (id) => {
    if (selected === id) {
      setSelected(null);
    } else {
      setSelected(id);
    }
  };

  const handleMultipleSelection = (id) => {
    let copyMultiple = [...multipleIDS];
    const findIndexOfCurrentId = copyMultiple.indexOf(id);

    if (findIndexOfCurrentId === -1) {
      copyMultiple.push(id);
    } else {
      copyMultiple.splice(findIndexOfCurrentId, 1);
    }

    setMultipleIDS(copyMultiple);
  };
  console.log(multipleIDS);

  return (
    <section className="wrapper">
      <button onClick={() => setMultipleSelection(!multipleSelection)}>
        Enble Multiple Selection
      </button>
      <section className="accordion">
        {data && data.length > 0 ? (
          data.map((item) => {
            return (
              <section className="item" key={item.id}>
                <section
                  className="title"
                  onClick={
                    multipleSelection
                      ? () => handleMultipleSelection(item.id)
                      : () => handleSingleSelection(item.id)
                  }
                >
                  <h3>{item.question}</h3>
                  <span>+</span>
                </section>
                {selected === item.id || multipleIDS.indexOf(item.id) !== -1 ? (
                  <section className="content">{item.answer}</section>
                ) : null}
              </section>
            );
          })
        ) : (
          <p>No data was found</p>
        )}
      </section>
    </section>
  );
}

export default Accordion;
