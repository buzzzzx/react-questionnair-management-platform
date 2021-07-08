import { Skeleton, Space } from "antd";
import { Row } from "../../components/lib";
import styled from "@emotion/styled";

export const PageHeaderSkeletons = ({ len }) => {
  const skeletons = [];
  for (let i = 0; i < len; i += 1) {
    skeletons.push(<SingleSkeleton key={i} />);
  }
  return (
    <div>
      {/*<SingleSkeleton />*/}
      {skeletons}
    </div>
  );
};

const SingleSkeleton = () => {
  return (
    <Container>
      <Row style={{ marginBottom: "2rem" }} between={true}>
        <Space>
          <Skeleton.Input
            style={{ width: 100, marginRight: "1.5rem" }}
            active={true}
            size={"default"}
          />
          <Skeleton.Input
            style={{ width: 120, marginRight: "1rem" }}
            active={true}
            size={"small"}
          />
          <Skeleton.Button
            style={{ width: 50 }}
            active={true}
            size={"small"}
            shape={"default"}
          />
        </Space>
        <Space>
          <Skeleton.Button
            style={{ width: 70, marginRight: "3rem" }}
            active={true}
            size={"default"}
            shape={"default"}
          />
          <Skeleton.Button
            style={{ width: 70, marginRight: "2rem" }}
            active={true}
            size={"default"}
            shape={"default"}
          />
          <Skeleton.Button
            style={{ width: 90 }}
            active={true}
            size={"default"}
            shape={"round"}
          />
        </Space>
      </Row>
      <Space>
        <Skeleton.Avatar
          style={{ width: 70, marginRight: "3rem" }}
          active={true}
          size={"large"}
          shape={"Square"}
        />
        {/*<Skeleton.Avatar*/}
        {/*  style={{ width: 70, marginRight: "3rem" }}*/}
        {/*  active={true}*/}
        {/*  size={"large"}*/}
        {/*  shape={"Square"}*/}
        {/*/>*/}
        <Skeleton.Input
          style={{ width: 270, marginRight: "6rem" }}
          active={true}
          size={"small"}
        />
        <Skeleton.Input
          style={{ width: 180, marginRight: "18rem" }}
          active={true}
          size={"small"}
        />
        <Skeleton.Input
          style={{ width: 180, marginRight: "0rem" }}
          active={true}
          size={"small"}
        />
      </Space>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  margin: 2rem 2rem 2rem 2rem;
  background-color: #fff;
`;
