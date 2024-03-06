import MenuItem from "./MenuItem";
import PropTypes from "prop-types";

function MenuList({ list }) {
  return (
    <nav className="menu">
      <ul>
        {list && list.length
          ? list.map((item, index) => {
              return <MenuItem key={index} menu={item} />;
            })
          : null}
      </ul>
    </nav>
  );
}

MenuList.propTypes = {
  list: PropTypes.list,
};

export default MenuList;
