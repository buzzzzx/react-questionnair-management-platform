import { Dropdown, Menu, Button } from "antd";
import { ButtonNoPadding } from "../../components/lib";

export const More = ({ name, operations }) => {
  return (
    <Dropdown
      overlay={
        <Menu>
          {operations.map((operation, index) =>
            operation.name ? (
              <Menu.Item key={index}>
                <ButtonNoPadding type={"link"} onClick={operation.handler}>
                  {operation.name}
                </ButtonNoPadding>
              </Menu.Item>
            ) : (
              <Menu.Item key={index}>
                <ButtonNoPadding type={"link"}>{operation}</ButtonNoPadding>
              </Menu.Item>
            )
          )}
        </Menu>
      }
    >
      <Button type={"link"}>{name}</Button>
    </Dropdown>
  );
};
