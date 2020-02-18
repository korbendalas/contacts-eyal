import React, { useState, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { getToken } from "../services/auth";
import { Menu, Button } from "antd";
import { useAuth } from "../auth-context";

const NavBar = props => {
  const { logout } = useAuth();

  const [state, setState] = useState(props.location.pathname);

  const handleClick = e => {
    setState(e.key);
  };

  useEffect(() => {
    if (state !== props.location.pathname) setState(props.location.pathname);
  }, [props.location.pathname]);

  return getToken() ? (
    <Menu
      onClick={handleClick}
      selectedKeys={[state]}
      mode="horizontal"
      align="middle"
    >
      <Menu.Item key="/contacts">
        <NavLink className="p-2" to="/contacts">
          Contacts
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/contacts/add">
        <NavLink className="p-2" to="/contacts/add">
          Add Contact
        </NavLink>
      </Menu.Item>
      <Menu.Item>
        <Button type="danger" size="large" onClick={logout}>
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  ) : null;
};
export default withRouter(NavBar);
