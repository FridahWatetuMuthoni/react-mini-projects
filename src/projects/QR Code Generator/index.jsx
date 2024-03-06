import { useState } from "react";
import "./style.css";
import QRCode from "react-qr-code";

function QRCodeGenerator() {
  const [qrCode, setQRCode] = useState("");
  const [input, setInput] = useState("");

  const handelGenerateQRCode = () => {
    setQRCode(input);
    setInput("");
  };

  return (
    <section className="wrapper">
      <section className="content">
        <section className="inputs">
          <input
            type="text"
            name="text"
            id="text"
            placeholder="Enter your value here ..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            disabled={input && input.trim() !== "" ? false : true}
            onClick={handelGenerateQRCode}
          >
            Generate
          </button>
        </section>
        <section className="qr-bar">
          <QRCode id="qr-code-value" value={qrCode} />
        </section>
      </section>
    </section>
  );
}

export default QRCodeGenerator;
