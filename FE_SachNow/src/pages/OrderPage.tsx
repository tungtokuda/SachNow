import {
  Button,
  Form,
  Radio,
  Select,
  Space,
  notification,
} from "antd";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { Link, useNavigate } from "react-router-dom";
import { useCreateShoppingMutation } from "../redux/api/shoppingApi";
import { afterAddItemCart } from "../redux/slices/cartSlice";
import { LoadingOutlined } from "@ant-design/icons";

const OrderPage = () => {
  const { orderItems }: any = useAppSelector((state) => state.Order);
  const { user }: any = useAppSelector((state) => state.Authentication);
  const [value, setValue] = useState("");
  const [addOrder, { isLoading }] = useCreateShoppingMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const productOrder = orderItems.map(
    ({ _id, name, images, price, quantity }: any) => {
      return {
        _id,
        name,
        images,
        price,
        quantity,
      };
    }
  );

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  const totalPriceItem = orderItems.reduce((accumulator: any, currentValue: any) => {
    return accumulator + currentValue.price * currentValue.quantity;
  }, 0);

  const onFinishOrder = (values: any) => {
    addOrder({ values, productOrder, user: user?._id, shippingPrice: 15000 })
      .unwrap()
      .then(() => {
        notification.success({
          message: "Đặt hàng thành công",
        });
        dispatch(afterAddItemCart([]));
        navigate('/my-order');
      });
  };

  return (
    <div className="max-w-2xl p-4 mx-auto bg-white rounded-md shadow-md">
      <Form layout="vertical" onFinish={onFinishOrder}>
        <h3 className="mb-4 text-xl font-bold">Đơn Hàng</h3>
        
        {orderItems.map((item: any) => (
          <div key={item._id} className="flex items-center my-3 space-x-6">
            <img
              src={item.images[0].response.uploadedFiles[0].url}
              alt={item.name}
              className="w-24"
            />
            <div>
              <span>{item?.name}</span>
              <div className="flex justify-between gap-x-3">
                <span>SL: x{item?.quantity}</span>
                <span>{(item?.price * item?.quantity) / 1000 + ".000"} đ</span>
              </div>
            </div>
          </div>
        ))}
        
        <Form.Item
          label="Phương thức giao hàng"
          name="deliveryMethod"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn phương thức giao hàng",
            },
          ]}
        >
          <Select
            placeholder="Chọn phương thức giao hàng"
            options={[
              {
                key: 1,
                label: "Giao hàng nhanh",
                value: "Giao hàng nhanh",
              },
              {
                key: 2,
                label: "Giao tiết kiệm",
                value: "Giao tiết kiệm",
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Phương thức thanh toán"
          name="paymentMethod"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn phương thức thanh toán",
            },
          ]}
        >
          <Radio.Group onChange={onChange} value={value}>
            <Space direction="vertical">
              <Radio value={"tiền mặt"}>
                Thanh toán tiền mặt khi nhận hàng
              </Radio>
              <Radio value={"momo"}>Thanh toán bằng ví MoMo</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <div>
          {user ? (
            <div>
              <div className="flex justify-between">
                <span>Giao tới</span>
                <Link to={"/update-user"}>Thay đổi</Link>
              </div>
              <div className="flex flex-col text-gray-500 gap-y-1">
                <span>{user?.address}</span>
                <span>+84 {user?.phone}</span>
                <span>{user?.name}</span>
              </div>
            </div>
          ) : (
            <span className="text-red-500">Vui lòng đăng nhập</span>
          )}
        </div>

        <div className="space-y-1">
          <div className="flex flex-col gap-y-1">
            <span>Tạm tính: {totalPriceItem / 1000 + ".000"} đ</span>
            <span>Phí vận chuyển: 15.000 đ</span>
          </div>
          <div className="flex flex-col gap-y-3">
            <span>
              Tổng tiền: {(totalPriceItem + 15000) / 1000 + ".000"} đ
            </span>
            <div>
              <Button danger disabled={!user} htmlType="submit">
                {isLoading ? <LoadingOutlined /> : "Đặt Hàng"}
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default OrderPage;
