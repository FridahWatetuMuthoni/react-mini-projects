import { FaSun, FaMoon } from "react-icons/fa";
import "./style.scss";
import useLocalStorage from "./useLocalStorage";

function LightDarkTheme() {
  const [theme, setTheme] = useLocalStorage("theme", "dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <section className="wrapper" data-theme={theme}>
      <section className="content">
        <h1>Hello World</h1>
        <section onClick={toggleTheme}>
          {theme === "dark" ? (
            <FaSun size={25} className="sun" />
          ) : (
            <FaMoon size={25} className="moon" />
          )}
        </section>
      </section>
    </section>
  );
}

export default LightDarkTheme;
