import { Tabs, TabsProps } from "antd";
import Login from "./Login";
import Register from "./Register";
import Lottie from "lottie-react";
import LottieAuth from "../../assets/auth-animation.json";
const Account = () => {
  const onChange = (key: string) => {
    console.log(key);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Login",
      children: <Login />,
    },
    {
      key: "2",
      label: "Register",
      children: <Register />,
    },
  ];
  return (
    <div className="md:w-[768px] md:flex justify-center bg-white rounded-md shadow-md mx-auto">
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
        className="sm:p-2 md:w-96"
      />
      <Lottie animationData={LottieAuth} className="md:w-96 md:block hidden"/>
    </div>
  );
};

export default Account;
