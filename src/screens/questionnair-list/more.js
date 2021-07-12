import { Dropdown, Menu, Button } from "antd";
import { ButtonNoPadding } from "../../components/lib";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

export const More = ({ name, operations }) => {
  return (
    <Dropdown
      overlay={
        <Menu>
          {operations.map((operation, index) =>
            operation.name ? (
              <Menu.Item key={index}>
                <ButtonNoPadding
                  icon={
                    operation.name === "编辑" ? (
                      <EditOutlined />
                    ) : (
                      <DeleteOutlined />
                    )
                  }
                  type={"link"}
                  onClick={operation.handler}
                >
                  <span> </span>
                  {operation.name}
                </ButtonNoPadding>
              </Menu.Item>
            ) : (
              <Menu.Item key={index}>{operation}</Menu.Item>
            )
          )}
        </Menu>
      }
    >
      <Button type={"link"}>{name}</Button>
    </Dropdown>
  );
};
