import "./style.css";
import menu_items from "./data";
import MenuList from "./MenuList";

function DynamicMenu() {
  return (
    <section className="navigation">
      <MenuList list={menu_items} />;
    </section>
  );
}

export default DynamicMenu;
