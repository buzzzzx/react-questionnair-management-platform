import { Dropdown, Menu, Button } from "antd";
import { ButtonNoPadding } from "../../components/lib";

export const More = ({ questionnaire, name, operations }) => {
  return (
    <Dropdown
      overlay={
        <Menu>
          {operations.map((operation, index) => (
            <Menu.Item key={index}>
              <ButtonNoPadding type={"link"} onClick={operation.handler}>
                {operation.name}
              </ButtonNoPadding>
            </Menu.Item>
          ))}
        </Menu>
      }
    >
      <Button type={"link"}>{name}</Button>
    </Dropdown>
  );
};
