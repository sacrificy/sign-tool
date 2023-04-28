import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Switch,
  Form,
  Input,
  InputNumber,
  Select,
  message,
} from "antd";
import { useContract } from "wagmi";
import ethers from "ethers";

const initialValues = {
  "x-api-key": "",
  upcoming_phase_id: "",
};

export default function Upload() {
  const [result, setResult] = useState<any>("");
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: any) => {
    const result = await axios.post("/api/upload", {
      param: values,
    });
    const data = result.data;
    const { code, msg } = data;
    console.log(data);
    if (code === "000000") {
      messageApi.open({ type: "success", content: "提交成功" });
    } else {
      messageApi.open({ type: "error", content: msg });
    }
    // setResult(result);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: "100%", maxWidth: 900 }}
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="x-api-key"
          name="x-api-key"
          // rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="upcoming_phase_id"
          name="upcoming_phase_id"
          // rules={[{ required: true, message: "Please input your password!" }]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
