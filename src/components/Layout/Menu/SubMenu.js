import React from "react";
import { Menu } from "antd";

const SubMenu = ({ label, key, icon, children }) => (
  <Menu.SubMenu key={key} icon={icon} title={label}>
    {children}
  </Menu.SubMenu>
);

export default SubMenu;
