import { Empty, Button } from "antd";
import { Link } from "react-router-dom";

export const EmptyQuestionnaires = () => {
  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: 200,
      }}
      description={<span>还没有满足条件的问卷，赶紧创建一个</span>}
    >
      <Button type={"primary"}>
        <Link to={"create"}>创建问卷</Link>
      </Button>
    </Empty>
  );
};
