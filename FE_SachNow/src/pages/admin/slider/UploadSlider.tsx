import { UploadOutlined } from "@ant-design/icons";
import { AnyAction } from "@reduxjs/toolkit";
import { Button, Form, Upload, message, notification } from "antd";
import { useCreateSliderMutation } from "../../../redux/api/sliderApi";

const UploadSlider = () => {
  const [createSlider] = useCreateSliderMutation();
  const onfinish = (values:any ) => {
    createSlider(values)
      .unwrap()
      .then(() => {
        notification.success({ message: "Tải ảnh thành công!" });
      });
  };
  const beforeUpload = (file: AnyAction) => {
    // Kiểm tra loại file và kích thước tại đây nếu cần
    console.log("Before Upload:", file);
    return true;
  };

  const onChange = (info:any ) => {
    if (info.file.status === "done") {
      return message.success("Tải ảnh thành công");
    } else if (info.file.status === "error") {
      return message.error("Tải ảnh thất bại");
    }
  };
  return (
    <div className="flex items-center justify-center space-x-3">
      <Form onFinish={onfinish}>
        <Form.Item label="Slider" name={"images"}>
          <Upload
            listType="picture"
            beforeUpload={beforeUpload}
            onChange={onChange}
            multiple={true}
            action={"http://127.0.0.1:5000/api/upload"}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Banner" name={"banner"}>
          <Upload
            listType="picture"
            multiple={true}
            action={"http://127.0.0.1:5000/api/upload"}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" icon={<UploadOutlined />}/>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UploadSlider;
