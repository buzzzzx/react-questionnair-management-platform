import { FieldTimeOutlined } from "@ant-design/icons";
import { DatePicker, message, Modal } from "antd";
import dayjs from "dayjs";
import { useEditQuestionnaire } from "../../utils/questionnaire";
import { useQuestionnairesQueryKey } from "./util";
import { useState } from "react";

export const EndTimePicker = ({
  questionnaireStatus,
  endTime,
  questionnaireId,
}) => {
  const [value, setValue] = useState(endTime);
  const { mutateAsync: editEndTime } = useEditQuestionnaire(
    useQuestionnairesQueryKey()
  );

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current <= dayjs().subtract(1, "days").endOf("day");
  }

  function onChange(value, dateString) {
    setValue(value);
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  }

  function onOk(value) {
    console.log("onOk: ", value);

    // 判断 value 是否大于当前时间
    if (value.valueOf() <= dayjs().valueOf()) {
      message.error("截止时间应大于当前时间");
      setValue(endTime);
      return;
    }

    Modal.confirm({
      icon: <FieldTimeOutlined />,
      title: "是否更改该问卷的截止日期？",
      content: "点击确定更改",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        // console.log("删除", deletes.length);
        editEndTime({ id: questionnaireId, endTime: dayjs(endTime).valueOf() })
          .then(() => {
            message.success("截止时间更改成功");
          })
          .catch((e) => {
            message.error("截止时间更改失败");
          });
      },
      onCancel() {
        setValue(endTime);
      },
    });
  }

  return (
    <div>
      <DatePicker
        disabled={questionnaireStatus === 3}
        size={"small"}
        placeholder={"请选择截止日期"}
        showTime
        disabledDate={disabledDate}
        // defaultValue={endTime ? dayjs(endTime, "YYYY-MM-DD") : null}
        value={value}
        onChange={onChange}
        onOk={onOk}
      />
    </div>
  );
};
