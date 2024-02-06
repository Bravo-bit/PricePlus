import React, { useState } from "react";
import { Layout, Breadcrumb, Menu } from "antd";

// icons
import { HomeOutlined, SearchOutlined, HeartOutlined } from "@ant-design/icons";

import MenuItem from "./MenuItem";
import "./MainMenu.css";

// content
import Home from "../../../pages/Home";
import Search from "../../../pages/Search";
import Favorites from "../../../pages/Favorites";

const { Header, Content, Footer, Sider } = Layout;

function MainMenu() {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedKeys, setSelectedKeys] = useState(["1"]);

  const menuItems = [
    { label: "Home", key: "1", icon: <HomeOutlined />, path: ["Home"] },
    { label: "Search", key: "2", icon: <SearchOutlined />, path: ["Search"] },
    {
      label: "Favorites",
      key: "3",
      icon: <HeartOutlined />,
      path: ["Favorites"],
    },
  ];

  const contentMapping = {
    1: <Home />,
    2: <Search />,
    3: <Favorites />,
  };

  const handleMenuClick = ({ key }) => {
    setSelectedKeys([key]);
  };

  return (
    <Layout className="menu-container">
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          defaultSelectedKeys={["1"]}
          selectedKeys={selectedKeys}
          mode="inline"
          className="menu"
          onClick={handleMenuClick}
          items={menuItems.map((item) => ({
            icon: item.icon,
            label: item.label,
            key: item.key,
            content: (
              <MenuItem key={item.key} label={item.label} icon={item.icon} />
            ),
          }))}
        />
      </Sider>
      <Layout>
        <Header className="header" />
        <Content className="content">
          <Breadcrumb
            className="breadcrumb"
            items={selectedKeys
              .map((key) => {
                const selectedItem = menuItems.find((item) => item.key === key);
                return selectedItem && selectedItem.path
                  ? {
                      key: key,
                      content: selectedItem.path[0],
                    }
                  : null;
              })
              .filter(Boolean)}
          />
          <div className="content-wrapper">
            {contentMapping[selectedKeys[0]]}
          </div>
        </Content>
        <Footer className="footer" />
      </Layout>
    </Layout>
  );
}

export default MainMenu;
