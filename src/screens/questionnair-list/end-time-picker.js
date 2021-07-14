import { DatePicker, message, Modal } from "antd";
import { useEditQuestionnaire } from "../../utils/questionnaire";
import { useQuestionnairesQueryKey } from "./util";
import moment from "moment";

export const EndTimePicker = ({
  questionnaireStatus,
  endTime,
  questionnaireId,
}) => {
  const dataFormat = "YYYY-MM-DD HH:mm:ss";
  const { mutateAsync: editEndTime } = useEditQuestionnaire(
    useQuestionnairesQueryKey()
  );

  function disabledDate(current) {
    // 不能选择今天之前的数据
    return current && current <= moment().subtract(1, "days").endOf("day");
  }

  function onChange(value) {
    if (value == null) {
      Modal.confirm({
        title: "确认清除截止日期吗？",
        content: "点击确定清除",
        okText: "确定",
        cancelText: "取消",
        onOk() {
          editEndTime({ id: questionnaireId, endTime: null })
            .then(() => {
              message.success("截止时间清除成功");
            })
            .catch((e) => {
              message.error("截止时间清除失败");
            });
        },
      });
    }
  }

  function onOk(value) {
    // 判断 value 是否大于当前时间
    if (value.valueOf() <= moment().valueOf()) {
      message.error("截止时间应大于当前时间");
      return;
    }

    editEndTime({ id: questionnaireId, endTime: moment(value).valueOf() })
      .then(() => {
        message.success("截止时间更改成功");
      })
      .catch((e) => {
        message.error("截止时间更改失败");
      });
  }

  return (
    <div>
      <DatePicker
        showNow={false}
        disabled={questionnaireStatus === 3}
        size={"small"}
        placeholder={"请选择截止日期"}
        showTime
        disabledDate={disabledDate}
        defaultValue={endTime ? moment(endTime, dataFormat) : null}
        value={endTime ? moment(endTime) : null}
        onOk={onOk}
        onChange={onChange}
      />
    </div>
  );
};
