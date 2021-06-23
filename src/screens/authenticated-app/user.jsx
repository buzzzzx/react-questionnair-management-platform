import { Dropdown, Menu, Button } from "antd";

export const User = () => {
  // TODO 获取 user

  // TODO logout
  const logout = () => {};

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
        Hi, remie!
      </Button>
    </Dropdown>
  );
};
