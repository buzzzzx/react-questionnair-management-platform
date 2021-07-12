import { Empty } from "antd";
import styled from "@emotion/styled";
import { CreateButton } from "../../components/create-button";

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
        <CreateButton />
      </Empty>
    </Container>
  );
};

const Container = styled.div`
  padding: 5rem;
`;
