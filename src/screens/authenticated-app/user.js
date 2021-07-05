import { Dropdown, Menu, Button } from "antd";
import { useAuth } from "../../context/auth-context";

export const User = () => {
  const { user, logout } = useAuth();

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Button type={"link"} onClick={logout}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(event) => event.preventDefault()}>
        Hi, {user.username}!
      </Button>
    </Dropdown>
  );
};
