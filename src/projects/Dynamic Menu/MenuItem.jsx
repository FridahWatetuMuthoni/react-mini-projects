import PropTypes from "prop-types";
import MenuList from "./MenuList";
import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

function MenuItem({ menu }) {
  const [displayChildren, setDisplayChildren] = useState({});

  const handleToggleChildren = (label) => {
    setDisplayChildren({
      ...displayChildren,
      [label]: !displayChildren[label],
    });
  };

  console.log(displayChildren);

  return (
    <li className="menu">
      <section className="menu-item">
        <p>{menu.label}</p>
        {menu && menu.children && menu.children.length ? (
          <span onClick={() => handleToggleChildren(menu.label)}>
            {displayChildren[menu.label] ? (
              <FaMinus color="white" size={25} />
            ) : (
              <FaPlus color="white" size={25} />
            )}
          </span>
        ) : null}
      </section>
      {menu &&
      menu.children &&
      menu.children.length > 0 &&
      displayChildren[menu.label] ? (
        <MenuList list={menu.children} />
      ) : null}
    </li>
  );
}

MenuItem.propTypes = {
  menu: PropTypes.object,
};

export default MenuItem;
