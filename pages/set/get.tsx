import React, { useState } from "react";
import axios from "axios";
import { Button, Switch, Form, Input } from "antd";

const initialValues = {
  "x-api-key": "",
  contract_address: "",
  abi_string: "",
  method: "",
  drop_parameters: "",
  request_url: "",
  request_headers: "",
  upcoming_phase_id: "",
  contract_mint_able: false,
  use_proxy: true,
  use_tls: false,
};

export default function SetGet() {
  const [result, setResult] = useState<any>("");

  const onFinish = async (values: any) => {
    // console.log("Success:", values);
    const result = await axios.post("/api/set", {
      type: "get",
      param: values,
    });
    console.log(result);
    setResult(result);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
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
          label="contract_address"
          name="contract_address"
          // rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="abi_string"
          name="abi_string"
          // rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="method"
          name="method"
          // rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="drop_parameters"
          name="drop_parameters"
          // rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="request_url"
          name="request_url"
          // rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="request_headers"
          name="request_headers"
          // rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="upcoming_phase_id"
          name="upcoming_phase_id"
          // rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="contract_mint_able"
          name="contract_mint_able"
          valuePropName="checked"
          // rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="use_proxy"
          name="use_proxy"
          valuePropName="checked"
          // rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="use_tls"
          name="use_tls"
          valuePropName="checked"
          // rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Switch />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
      <div>{result.toString()}</div>
    </>
  );
}
