import { Empty, Button } from "antd";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

export const EmptyQuestionnaires = () => {
  return (
    <Container>
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 200,
        }}
        description={<span>还没有满足条件的问卷，去创建一个吧～</span>}
      >
        <Button type={"primary"}>
          <Link to={"create"}>创建问卷</Link>
        </Button>
      </Empty>
    </Container>
  );
};

const Container = styled.div`
  padding: 5rem;
  background-color: #fff;
`;
