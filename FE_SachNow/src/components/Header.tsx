import React, { useState } from "react";
import {
  HeartOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  QqOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  UserSwitchOutlined
} from "@ant-design/icons";
import { Badge, Button, Drawer, Dropdown, Modal } from "antd";
import { Link } from "react-router-dom";
import CartShop from "./CartShop";
import { useAppDispatch, useAppSelector } from "../app/hook";
import SearchComponent from "./SearchComponent";
import DropdownCate from "./DropdownCate";
import NavbarMenu from "./NavbarMenu";
import { logout } from "../redux/slices/authSlice";
import { motion } from "framer-motion";
import { setIsOpenToggleDrawer } from "../redux/slices/toggleDrawerSlice";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fixNavbar, setFixNavbar] = useState(false);
  const { items: itemsCart } = useAppSelector((state) => state.Cart);
  const { user }:any = useAppSelector((state) => state.Authentication);
  const { open: openToggle } = useAppSelector((state) => state.ToggleDrawer);
  const dispatch = useAppDispatch();

  const setFixedNavbar = () => {
    if (window.scrollY >= 38) {
      setFixNavbar(true);
    } else {
      setFixNavbar(false);
    }
  };
  window.addEventListener("scroll", setFixedNavbar);

  const items = [
    {
      key: 1,
      label: user ? (
        <Link to={`/update-user`}>
          <Button icon={<QqOutlined />} type="text">
            Tài Khoản
          </Button>
        </Link>
      ) : (
        <Link to={"/account"}>
          <Button type="text" icon={<UserOutlined />}>
            Tài Khoản
          </Button>
        </Link>
      ),
    },
    {
      key: 2,
      label: (
        <Link to={"/admin"}>
          <Button type="text" icon={<UserSwitchOutlined />}>
            Quản trị
          </Button>
        </Link>
      ),
    },
    {
      key: 3,
      label: (
        <Link to={"/"}>
          <Button type="text" icon={<HeartOutlined />}>
            Yêu Thích
          </Button>
        </Link>
      ),
    },
  ];

  if (user) {
    items.push({
      key: items.length + 1,
      label: (
        <Button
          type="text"
          icon={<LogoutOutlined />}
          onClick={() => dispatch(logout())}
        >
          Đăng Xuất
        </Button>
      ),
    });
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showDrawer = () => {
    dispatch(setIsOpenToggleDrawer(true));
  };

  const onClose = () => {
    dispatch(setIsOpenToggleDrawer(false));
  };

  return (
    <div className={`bg-${fixNavbar ? 'black' : 'orange'} transition-colors duration-500 fixed top-0 left-0 right-0 z-50 shadow-sm`}>
      <div className="mx-auto space-y-6 md:max-w-6xl ">
        <div
          className={`${
            fixNavbar ? 'md:relative md:w-full transition-all duration-500 ease-in-out' : 'md:relative md:w-full transition-all duration-500 ease-in-out hidden'
          }`}
        >
          <motion.div
            className={`text-3xl font-bold text-center transition-colors duration-500 ease-in-out font-dancingScript md:text-4xl hover:text-custom-main ${
              fixNavbar ? 'md:block hidden' : 'hidden'
            }`}
            initial={{ opacity: 0, x: 20, y: -20 }}
            animate={{
              opacity: fixNavbar ? 1 : 0,
              x: fixNavbar ? 0 : 20,
              y: fixNavbar ? 0 : -20,
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <a href="/" className="">
              BOOKSTORE
            </a>
          </motion.div>
          <div className={`absolute right-0 top-0 ${fixNavbar ? 'block' : 'hidden'}`}>
            <SearchComponent />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <motion.div
            className={`font-dancingScript font-bold md:text-4xl hover:text-custom-main duration-500 transition-colors ease-in-out ${
              fixNavbar ? 'hidden' : 'md:block hidden'
            }`}
            initial={{ opacity: 0, x: 20, y: -20 }}
            animate={{
              opacity: fixNavbar ? 1 : 0,
              x: fixNavbar ? 0 : 20,
              y: fixNavbar ? 0 : -20,
            }}
            transition={{ duration: 0.1 }}
          >
            <a href="/" className="">
              BOOKSTORE
            </a>
          </motion.div>
          <div className="">
            <div className={`hidden md:flex items-center space-x-6 font-poppins`}>
              <DropdownCate />
              <Link
                to={"/my-order"}
                className="transition-colors duration-500 hover:text-custom-main"
              >
                Đơn Hàng
              </Link>
            </div>
            <div className="md:hidden">
              <Button
                icon={<MenuFoldOutlined />}
                type="text"
                onClick={showDrawer}
              />
              <Drawer
                placement="left"
                onClose={onClose}
                open={openToggle}
                width={240}
              >
                <NavbarMenu />
              </Drawer>
            </div>
          </div>
          <motion.div
            className={`${
              fixNavbar ? 'transition-all duration-500 ease-in-out' : 'hidden'
            }`}
            initial={{ opacity: 0, x: 20, y: -20 }}
            animate={{
              opacity: fixNavbar ? 1 : 0,
              x: fixNavbar ? 0 : 20,
              y: fixNavbar ? 0 : -20,
            }}
            transition={{ duration: 0.1 }}
          >
            <SearchComponent />
          </motion.div>
          <div className="">
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Button icon={<UserOutlined />} type="text">
                {user ? user?.name : ""}
              </Button>
            </Dropdown>
            <Badge count={itemsCart.length} size="small">
              <Button
                icon={<ShoppingCartOutlined />}
                type="text"
                onClick={showModal}
              />
            </Badge>
          </div>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        okType="default"
        onCancel={handleCancel}
        width={1000}
      >
        <CartShop />
      </Modal>
    </div>
  );
};

export default Header;
