import  { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu, Button, theme, Space, Badge, Avatar } from "antd";
import { AiFillDashboard } from "@react-icons/all-files/ai/AiFillDashboard";
import { BiUser } from "@react-icons/all-files/bi/BiUser";
import { AiOutlineInbox } from "@react-icons/all-files/ai/AiOutlineInbox";
import { FaProductHunt } from "@react-icons/all-files/fa/FaProductHunt";

import {
  BellOutlined,
  LogoutOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PictureOutlined,
  ShoppingOutlined,
  UserOutlined,
  ArrowLeftOutlined
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { logout } from "../redux/slices/authSlice";
import BreadcrumbAdmin from "../components/BreadcrumbAdmin";
import Search, { SearchProps } from "antd/es/input/Search";
// import '../App.css'
const LayoutAdmin = () => {
  const { Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const { useToken } = theme;
  const { token } = useToken();
  const { bgColormain }:any = token;
  const dispatch = useAppDispatch();
  const { user }:any = useAppSelector((state) => state.Authentication);
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
  };


  return (
    <Layout>
      <Sider trigger={null} collapsible theme="dark" className="text-white bg-black" collapsed={collapsed}>
        <div className="flex items-center justify-center py-5 text-2xl">
          <Link to={"/"}><p><ArrowLeftOutlined />Home</p></Link>
        </div>
        <Menu
          style={{}}
          mode="inline"
          // defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <AiFillDashboard />,
              label: <Link to={"dashboard"}>Bảng điều khiển</Link>,
            },
            {
              key: "2",
              icon: <FaProductHunt />,
              label: <Link to={"products"}>Book</Link>,
            },
            {
              key: "3",
              icon: <AiOutlineInbox />,
              label: <Link to={"categories"}>Loại</Link>,
            },
            {
              key: "4",
              icon: <ShoppingOutlined />,
              label: <Link to={"order"}>Đơn hàng</Link>,
            },
            {
              key: "5",
              icon: < BiUser/>,
              label: <Link to={"profile"}>Người dùng</Link>,
            },
            {
              key: "6",
              icon: <PictureOutlined />,
              label: <Link to={"slider"}>Slider</Link>,
            },
            {
              key: "7",
              label: (
                <Button
                  icon={<LogoutOutlined />}
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </Button>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <header
          style={{
            backgroundColor: bgColormain,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 10,
          }}
        >
          <div className="">
            <Button
              type="text"
              icon={collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
          <div className="">
            <Search
              placeholder="search..."
              onSearch={onSearch}
              enterButton
              style={{ width: 400 }}
            />
          </div>
          <div className="flex items-center gap-x-6">
            <Badge count={5} size="small">
              <MailOutlined className="text-xl text-white" />
            </Badge>
            <Badge count={5} size="small">
              <BellOutlined className="text-xl text-white" />
            </Badge>
            <Space>
              <Avatar size="small" icon={<UserOutlined />} />
              <span className="text-white">{user ? user.name : "HO TEN"}</span>
            </Space>
          </div>
        </header>
        <BreadcrumbAdmin />
        <Content
          style={{
            padding: 10,
            height: "100%",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
    
  );
};

export default LayoutAdmin;
