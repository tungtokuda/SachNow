import { Badge, Button, Rate, Tag, message } from "antd";
import { useEffect, useState } from "react";
import { InboxOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../redux/api/productApi";
import SimilarProduct from "../components/SimilarProduct";
import { IProduct } from "../interfaces/products";
import { useAppDispatch, useAppSelector } from "../app/hook";
import LottieLoading from "../effect/LottieLoading";
import { addItemCart } from "../redux/slices/cartSlice";
import { addItemsCart } from "../redux/slices/orderSlice";
import FeedBackProducts from "../components/FeedBackProducts";
import { useGetUserQuery } from "../redux/api/auth";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const [count, setCount] = useState(1);
  const [currentImage, setCurrentImage] = useState<number | string>(0);
  const { slug } = useParams();
  const slugParams = slug?.split(".html") ?? [];
  const temp = slugParams[0]?.split("-") as string[];
  const id = temp[temp.length - 1];
  const dispatch = useAppDispatch();
  const { data: productDetail, isLoading }:any = useGetProductByIdQuery(id);
  const [userId, setUserId] = useState();
  const {user:userStorage}:any = useAppSelector((state)=> state.Authentication)
  const { data: user } = useGetUserQuery(userId);
  // console.log('user: ',user)
  // kiểm tra người dùng mua sản phẩm này chưa
  const idProductToOrder = user?.user?.products.flat();
  const checkProduct = idProductToOrder?.includes(id) as boolean;
  // console.log("checkProduct: ",checkProduct)
  useEffect(() => {
    (async () => {
      const idUser = userStorage?._id
      setUserId(idUser);
    })();
  }, [userStorage]);

  const listSilimar = productDetail?.listProductSimilar?.filter(
    (item: IProduct) => {
      return item._id !== id;
    }
  );

  const ListImage = productDetail?.data?.images?.map((items:any) => {
    return items?.response?.uploadedFiles[0].url;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LottieLoading />
      </div>
    );
  }
  const gotoImage = (index: number | string) => {
    setCurrentImage(index);
  };
  const increase = () => {
    setCount(count + 1);
  };

  const decline = () => {
    let newCount = count - 1;
    if (newCount < 1) {
      newCount = 1;
    }
    setCount(newCount);
  };
  return (
    <div className="p-2 md:max-w-6xl md:mx-auto ">
      <div className="gap-3 bg-white md:grid md:grid-cols-3">
        <div className="p-2 space-y-6">
          {/* slider image product detail */}
          <motion.div
            className="h-64 duration-500 ease-in-out bg-center bg-cover"
            style={{ backgroundImage: `url(${ListImage[currentImage]})` }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* <img src={ListImage[currentImage]} alt="" /> */}
          </motion.div>
          <div className="grid grid-cols-3 gap-8">
            {ListImage?.map((image:any, index:any) => {
              return (
                <motion.button
                  onClick={() => gotoImage(index)}
                  key={index}
                  initial={{ opacity: 0, x: -20, y: -20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <img src={image} alt="" />
                </motion.button>
              );
            })}
          </div>
        </div>
        <div className="p-2 space-y-3">
          <div className="">
            <span className="text-sm text-gray-400">
              Tác giả: {productDetail?.data?.author}
            </span>
            <span className="font-bold md:text-xl font-poppins line-clamp-2">
              {productDetail?.data?.name}
            </span>
          </div>
          <div className="flex space-y-3 sm:flex-col">
            <span>
              <Rate
                allowHalf
                defaultValue={productDetail?.data?.rate}
                className="text-base"
              />
            </span>
            <span className="text-gray-400">
              {productDetail?.data?.sold}k lượt bán
            </span>
          </div>
          <div className="py-2 space-x-3">
            <span className="text-gray-400">Thể loại:</span>
            <Tag color="red">{productDetail?.data?.categoryId?.name}</Tag>
          </div>
          <div className="">
            <span className="font-poppins">Mô tả sản phẩm:</span>
            <p className="text-gray-500 line-clamp-5">
              {productDetail?.data?.description}
            </p>
          </div>
        </div>
        <div className="p-2 space-y-6 sm:mt-4 md:mt-0">
          <div className="space-y-3">
            <span className="text-xl font-poppins">Số lượng</span>
            <div className="items-center space-x-3 md:flex">
              <Button icon={<PlusOutlined />} onClick={increase}></Button>
              <Badge count={count}>
                <InboxOutlined className="text-xl" />
              </Badge>
              <Button icon={<MinusOutlined />} onClick={decline}></Button>
            </div>
          </div>
          <div className="flex-col space-x-3 space-y-3 md:flex">
            <span className="md:text-2xl">Tạm tính</span>
            <span className="text-red-500 font-poppins">
              {(productDetail?.data?.price * count) / 1000 + ".000"} đ
            </span>
          </div>
          <div className="flex-col items-center gap-3 space-x-3 font-poppins md:flex">
            <Button
              onClick={() =>
                dispatch(
                  addItemsCart([{ ...productDetail?.data, quantity: count }])
                )
              }
            >
              <a href={"/order"}>MUA NGAY</a>
            </Button>
            <Button
              onClick={() => {
                dispatch(
                  addItemCart({ ...productDetail?.data, quantity: count })
                );
                message.success("Đã thêm vào giỏ hàng!");
              }}
            >
              THÊM VÀO GIỎ HÀNG
            </Button>
          </div>
        </div>
      </div>
      <FeedBackProducts checkProduct={checkProduct} />
      <SimilarProduct listSilimar={listSilimar} />
    </div>
  );
};

export default ProductDetail;
