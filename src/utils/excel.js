import { getToken } from "../auth-provider";
import { message } from "antd";
import axios from "axios";

export const download = (id) => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  };
  if (token) {
    axios
      .get("http://121.36.47.113:3000/questionnaires/68/download", config)
      .then(async (res) => {
        console.log(res);
        // const name = "test1";
        // const data = await res.data;
        // const buf = Buffer.from(data, "binary");
        // let blob = new Blob([buf], {
        //   type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
        // });
        // const url = window.URL.createObjectURL(blob);
        // const a = document.createElement("a");
        // a.href = url;
        // const fileName = `${name}.xlsx`;
        // a.download = decodeURIComponent(fileName);
        // a.click();
        window.open("http://121.36.47.113:3000/download/68.xlsx");
        message.success("下载成功");
      })
      .catch((e) => {
        console.log(e);
        message.error("下载失败");
      });
  }
};
