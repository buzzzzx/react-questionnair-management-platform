// TODO 可以使用 AntDesign 的 PageHeader 来做每个 questionnaire 的展示
import { ButtonNoPadding, Row, ScreenContainer } from "../../components/lib";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { Button } from "antd";

export const QuestionnaireListScreen = () => {
  return (
    <ScreenContainer>
      <Row between={true}>
        <Row gap={true}>
          <h1>问卷列表</h1>
          <Button onClick={() => {}}>创建问卷</Button>
        </Row>
        <SearchPanel />
      </Row>

      {/*<ErrorBox error={error} />*/}
      <List />
    </ScreenContainer>
  );
};

// const IconLink = ({ src, text }) => (
//   <a className="example-link">
//     <img className="example-link-icon" src={src} alt={text} />
//     {text}
//   </a>
// );

//<div>
//  <IconLink
//    src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"
//    text="Quick Start"
//  />
//  <IconLink
//    src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"
//    text=" Product Info"
//  />
//  <IconLink
//    src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
//    text="Product Doc"
//  />
//</div>
