import * as React from 'react';
import { Menu, MenuItem, Button } from '@material-ui/core';

const Dropdown = ({
  icon,
  options,
  selected,
  onSelect,
}) => {
  const [el, setEl] = React.useState(null);

  const openMenu = (event: any) => {
    setEl(event.currentTarget);
  };

  const closeMenu = () => {
    setEl(null);
  };

  const handleSelect = (option) => () => {
    onSelect(option);
    setEl(null);
  };
  return (
    <>
      <Button
        onClick={openMenu}
        style={{ marginRight: 10 }}
        startIcon={icon}
      >
        {selected.display}
      </Button>
      <Menu
        id="menu"
        anchorEl={el}
        keepMounted
        open={Boolean(el)}
        onClose={closeMenu}
      >
        {options.map((t) => (
          <MenuItem
            onClick={handleSelect(t)}
            selected={t.name === selected.name}
          >
            {t.display}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Dropdown;
