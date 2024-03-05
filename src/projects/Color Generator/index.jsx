import "./style.css";
import { useState } from "react";

function RandomColorGenerator() {
  const [typeOfColor, setTypeOfColor] = useState("hex");
  const [color, setColor] = useState("#000000");

  const randomColorUtility = (length) => {
    return Math.floor(Math.random() * length);
  };

  const handleCreateHEXColor = () => {
    let newColor = "#";
    const hex = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

    for (let i = 0; i < 6; i++) {
      newColor += hex[randomColorUtility(hex.length)];
    }
    setColor(newColor);
  };
  const handleCreateRGBColor = () => {
    const red = randomColorUtility(256);
    const green = randomColorUtility(256);
    const blue = randomColorUtility(256);
    let newColor = `rgb(${red},${green},${blue})`;
    setColor(newColor);
  };

  const styles = {
    backgroundColor: color,
  };
  const btnStyles = {
    color: color,
  };

  console.log(color);

  return (
    <div className="color-wrapper" style={styles}>
      <h1 style={btnStyles}>Color: {color}</h1>
      <section className="btns">
        <button style={btnStyles} onClick={() => setTypeOfColor("hex")}>
          Generate HEX Color
        </button>
        <button style={btnStyles} onClick={() => setTypeOfColor("rgb")}>
          Generate RGB Color
        </button>
        <button
          style={btnStyles}
          onClick={
            typeOfColor === "hex" ? handleCreateHEXColor : handleCreateRGBColor
          }
        >
          Generate Random Color
        </button>
      </section>
    </div>
  );
}

export default RandomColorGenerator;
