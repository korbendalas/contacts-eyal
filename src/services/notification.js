import { notification } from "antd";

const openNotification = (message, description) => {
  notification.open({
    message,
    description
  });
};
export default openNotification;
