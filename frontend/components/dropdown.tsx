import * as React from "react";
import { Menu, MenuItem, Button } from "@material-ui/core";

export const Dropdown = ({
  icon,
  options,
  selected,
  onSelect,
  testId,
}: {
  icon: React.ReactNode;
  options: Array<{ name: string; display: string }>;
  selected: { name: string; display: string };
  onSelect: (option: { name: string; display: string }) => void;
  testId?: string;
}) => {
  const [el, setEl] = React.useState<HTMLElement | null>(null);

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
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
        startIcon={icon}
        data-test={testId}
        disableRipple
        disableFocusRipple
      >
        {selected.display}
      </Button>
      <Menu id="menu" anchorEl={el} keepMounted open={Boolean(el)} onClose={closeMenu}>
        {options.map((t) => (
          <MenuItem
            key={t.name}
            onClick={handleSelect(t)}
            selected={t.name === selected.name}
            data-test={`${testId}-${t.name}`}
          >
            {t.display}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
