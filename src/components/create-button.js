import { Button } from "antd";
import { ReactComponent as Paw } from "../assets/paw.svg";
import { Link } from "react-router-dom";

export const CreateButton = () => {
  return (
    <Button
      icon={
        <Paw
          style={{ marginRight: "7px" }}
          width={"1.8rem"}
          height={"1.4rem"}
        />
      }
      type={"primary"}
    >
      <span> </span>
      <Link style={{ color: "#fff" }} to={"create"}>
        创建问卷
      </Link>
    </Button>
  );
};
