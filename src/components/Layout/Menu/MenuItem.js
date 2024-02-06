import React from "react";
import { Menu } from "antd";

function MenuItem({ label, key, icon, children }) {
  return (
    <Menu.Item key={key} icon={icon}>
      {label}
      {children}
    </Menu.Item>
  );
}

export default MenuItem;
