import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Switch, Form, Input, InputNumber, Space } from "antd";
import { useContract } from "wagmi";
import ethers from "ethers";
// const FormatTypes = ethers.utils.FormatTypes;

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
  const [form] = Form.useForm();
  const abi = Form.useWatch("abi_string", form);
  const contract = useContract({
    address: form.getFieldValue("contract_address"),
    abi: abi,
  });
  useEffect(() => {
    if (contract) {
      const iface = contract.interface
      // iface.format("sighash")
      // console.log(iface.format("sighash"));
    }
  }, [contract]);

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

  const onClickGetABI = async () => {
    const address = form.getFieldValue("contract_address");
    const result = await axios.post("/api/getabi", { address: address });
    form.setFieldValue("abi_string", result.data.result);
    console.log(result);
  };

  return (
    <>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: "100%", maxWidth: 900 }}
        initialValues={initialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onFieldsChange={(a: any, b: any) => {
          console.log(a, b);
        }}
        autoComplete="off"
      >
        <Form.Item
          label="x-api-key"
          name="x-api-key"
          // rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="contract_address">
          <div style={{ display: "flex" }}>
            <Form.Item name="contract_address" noStyle>
              <Input />
            </Form.Item>
            <Button
              type="primary"
              style={{ marginLeft: 8 }}
              onClick={onClickGetABI}
            >
              获取ABI
            </Button>
          </div>
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
          <InputNumber />
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
    </>
  );
}
