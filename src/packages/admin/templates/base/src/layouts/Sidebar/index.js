import { Menu } from 'antd';
import menus from 'configs/menus';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import style from './style.module.scss';

const { SubMenu } = Menu;

function Sidebar() {
  // 展开的菜单
  const [openKeys, setOpenKeys] = useState([]);
  // 选中的项
  const [selectedKeys, setSelectedKeys] = useState([]);
  const history = useHistory();
  const { pathname } = useLocation();

  // 展开菜单、设置选中项
  function expandMenu() {
    out: for (let i = 0; i < menus.length; i += 1) {
      const { name: nameParent, children } = menus[i];
      for (let j = 0; j < children.length; j += 1) {
        const { path, hidden } = children[j];
        if (path === pathname) {
          setOpenKeys([nameParent]);
          if (!hidden) {
            // 隐藏的页面不设置选中
            setSelectedKeys([path]);
          }
          break out;
        }
      }
    }
  }

  // 跳转
  const onClick = ({ key }) => {
    history.push({
      pathname: key,
    });
  };

  // 展开
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.filter((key) => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey);
  };

  useEffect(() => {
    expandMenu();
  }, [pathname]);

  return (
    <Menu
      className={style.menu}
      theme="light"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onOpenChange={onOpenChange}
      mode="inline"
      onClick={onClick}
    >
      {menus.map((subItem) => (
        <SubMenu key={subItem.name} title={subItem.name}>
          {subItem.children.map(({ name, path, hidden }) => {
            return hidden ? null : <Menu.Item key={path}>{name}</Menu.Item>;
          })}
        </SubMenu>
      ))}
    </Menu>
  );
}

export default Sidebar;
