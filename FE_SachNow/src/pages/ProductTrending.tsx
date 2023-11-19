import { Empty, Rate, Button } from "antd";
import { useEffect, useState } from "react";
import "../App.css";
import { useGetProductsQuery } from "../redux/api/productApi";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { IProduct } from "../interfaces/products";
import LottieLoading from "../effect/LottieLoading";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { convertSlug } from "../utils/convertSlug";
import { addItemsCart } from "../redux/slices/orderSlice";

const ProductTrending = () => {
  const { _filterValue, _filterField } = useAppSelector(
    (state) => state.Pagination
  );
  const [products, setProducts] = useState<IProduct[]>([]);
  const dispatch = useAppDispatch();
  const {
    data: listProducts,
    isLoading,
    error,
  }: any = useGetProductsQuery({
    _filterField,
    _filterValue,
    _limit: 6,
  });

  useEffect(() => {
    const products = listProducts?.products?.map((item: IProduct[]) => item);
    setProducts(products);
  }, [listProducts]);

  if (error) {
    return <Empty />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LottieLoading />
      </div>
    );
  }

  return (
    <div className="">
      <h2 className="font-bold font-poppins md:text-xl md:my-6">Bộ Sưu Tập</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {products?.map((items: IProduct, i) => (
          <motion.div
            className="flex items-center grid-cols-2 p-2 bg-white border md:grid gap-x-3 hover:shadow-md"
            initial={{ opacity: 0, x: 20, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1, delay: i * 0.3 }}
            key={items._id}
          >
            <Link
              to={`books/${convertSlug(items.name)}-${items._id}.html/detail`}
              className="w-2/5 md:w-auto"
            >
              <div className="">
                <img
                  src={items?.images[0].response.uploadedFiles[0].url}
                  alt=""
                  className=""
                />
              </div>
            </Link>
            <div className="flex flex-col gap-y-3">
              <label
                htmlFor=""
                className="text-xs line-clamp-1 font-inclusiveSans md:text-base"
              >
                {items.name}
              </label>
              <div className="flex md:space-x-3 gap-x-2">
                <span className="text-xs font-poppins md:text-base">
                  {items.price / 1000 + ".000"} đ
                </span>
                <span className="text-xs text-gray-400 line-through md:text-base">
                  1.000 đ
                </span>
              </div>
              <Rate allowHalf defaultValue={items.rate} className="text-xs" />
              <div className="">
                <Button
                  onClick={() =>
                    dispatch(addItemsCart([{ ...items, quantity: 1 }]))
                  }
                  className="p-1 text-xs rounded-sm shadow-md md:text-base hover:bg-custom-main hover:text-white"
                >
                  <Link to={"/order"}>Mua Ngay</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductTrending;
