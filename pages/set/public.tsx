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
  contract_address: "",
  abi_string: "",
  method: "",
  drop_parameters: "",
  upcoming_phase_id: "",
  contract_mint_able: false
};

export default function SetPublic() {
  const [result, setResult] = useState<any>("");
  const [methodList, setmethodList] = useState<any>([]);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const abi = Form.useWatch("abi_string", form);
  const contract = useContract({
    address: form.getFieldValue("contract_address"),
    abi: abi,
  });
  useEffect(() => {
    if (contract) {
      const iface = contract.interface;
      const functions = iface.functions;
      const functionList = Object.getOwnPropertyNames(functions);
      setmethodList(
        functionList.map((item: any) => {
          return { label: item, value: item };
        })
      );
    }
  }, [contract]);

  const onFinish = async (values: any) => {
    const result = await axios.post("/api/set", {
      type: "public",
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

  const onClickGetABI = async () => {
    const address = form.getFieldValue("contract_address");
    const response = await axios.post("/api/getabi", { address: address });
    const { status, result } = response.data;
    if (status === "1") {
      messageApi.open({ type: "success", content: "获取ABI成功" });
      form.setFieldValue("abi_string", result);
    } else {
      messageApi.open({ type: "error", content: "获取ABI失败" });
    }
  };

  const handleSelectMethod = (value: any) => {
    if (contract) {
      const iface = contract.interface;
      const functions = iface.functions;
      const paramList = functions[value].inputs.map((item: any) => {
        return item.name;
      });
      form.setFieldValue("drop_parameters", JSON.stringify(paramList));
    }
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
          <Select options={methodList} onChange={handleSelectMethod} />
        </Form.Item>

        <Form.Item
          label="drop_parameters"
          name="drop_parameters"
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

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
