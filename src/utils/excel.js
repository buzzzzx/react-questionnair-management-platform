import { getToken } from "../auth-provider";
import { http } from "./http";
import { message } from "antd";

export const download = (id) => {
  const token = getToken();
  if (token) {
    http("questionnaires/68/download", {
      token,
    })
      .then(() => {
        message.success("下载成功");
      })
      .catch((e) => {
        message.error("下载失败");
      });
  }
};
