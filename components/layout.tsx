import React from "react";
import { useRouter } from "next/router";
import {
  SettingOutlined,
  UploadOutlined,
  BugOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("设置破签服务", "/", <SettingOutlined />, [
    getItem("设置GET破签", "/set/get"),
    getItem("设置POST破签", "/set/post"),
    getItem("设置LIST破签", "/set/list"),
  ]),
  getItem("测试破签服务", "/test", <BugOutlined />),
  getItem("发布破签服务", "/upload", <UploadOutlined />),
];

export default function GlobalLayout({
  children,
}: React.PropsWithChildren<{}>) {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter();

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["set"]}
          items={items}
          onClick={({ key }) => {
            // console.log(item);
            router.push(key);
          }}
        />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Content style={{ margin: "24px 16px" }}>
          <div
            style={{
              padding: 24,
              minHeight: 800,
              background: colorBgContainer,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
