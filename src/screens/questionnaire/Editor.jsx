import styled from "@emotion/styled";
import { Image, Divider } from "antd";
import "antd/dist/antd.css";

import editorcontent from "../../assets/coachcat.svg";

export const Editor = () => {
  return (
    <div>
      <div>
        <div>
          <QuestionnaireImage src={editorcontent} />
        </div>
        <Divider />
        <QuesitonnairePageText>
          您还没有添加题目哦，请点击左侧空间开始出题吧
        </QuesitonnairePageText>
      </div>
    </div>
  );
};

const QuesitonnairePageText = styled.div`
  position: relative;
  font-size: 16px;
  color: #999;
  margin-top: 20px;
`;

const QuestionnaireImage = styled(Image)`
  width: 350px;
  display: block;
  height: auto;
  justify-content: center;
  user-select: none;
  margin-top: 50px;
`;
