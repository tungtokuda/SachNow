import { Empty, Pagination, Rate, message } from "antd";
import { AiOutlineEye } from "@react-icons/all-files/ai/AiOutlineEye";
import { AiOutlineHeart } from "@react-icons/all-files/ai/AiOutlineHeart";
import { FaShoppingBasket } from "@react-icons/all-files/fa/FaShoppingBasket";
import { Link, useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApi";
import { IProduct } from "../interfaces/products";
import { useAppDispatch, useAppSelector } from "../app/hook";
import { addItemCart } from "../redux/slices/cartSlice";
import { setCurrentPage, setLimitPage } from "../redux/slices/paginationSlice";
import { queryParams } from "../utils/queryParams";
import { useEffect } from "react";
import LottieLoading from "../effect/LottieLoading";
import { motion } from "framer-motion";
import { convertSlug } from "../utils/convertSlug";

const Products = () => {
  const { _page, _limit, _sort, _order, _search, _category } = useAppSelector(
    (state) => state.Pagination
  );
  const dispatch = useAppDispatch();
  const { data, isLoading, error }: any = useGetProductsQuery({
    _page,
    _limit,
    _search,
    _category,
  });
  // console.log(isLoading)

  const params = { _page, _limit, _sort, _order, _search, _category };
  const navigate = useNavigate();
  const queries = queryParams(params);
  // console.log("queries: ", queries);
  useEffect(() => {
    navigate(`?${queries}`);
  }, [queries, navigate]);
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
    <div className="p-2 my-6 rounded-lg">
      <h3 className="py-3 font-bold font-poppins md:text-xl">
        Sản phẩm mới
      </h3>
      <div className="grid grid-cols-2 gap-3 my-3 md:gap-6 md:grid-cols-4">
        {/* item */}
        {data?.products?.map((product: IProduct, i: any) => {
          return (
            <motion.div
              className="p-1 bg-white border group hover:shadow-md"
              key={product._id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: i * 0.2 }}
            >
              <div className="relative">
                <img
                  src={product?.images[0].response.uploadedFiles[0].url}
                  alt=""
                  className="mx-auto md:w-44"
                />
                <div className="hidden transition-all group-hover:block">
                  <div className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full backdrop-blur-sm gap-x-6">
                    <button
                      className={`bg-white text-xl p-1 hover:bg-custom-main hover:text-white rounded-sm`}
                    >
                      <AiOutlineHeart />
                    </button>
                    <Link
                      to={`books/${convertSlug(product.name)}-${
                        product._id
                      }.html/detail`}
                    >
                      <button
                        className={`bg-white text-xl p-1 hover:bg-custom-main hover:text-white rounded-sm`}
                      >
                        <AiOutlineEye />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="my-2 space-y-2">
                <span
                  className={`text-base line-clamp-1 font-poppins px-2 group-hover:text-custom-main text-center`}
                >
                  {product.name}
                </span>
                <div className="flex flex-col items-center justify-between">
                  <div className="flex items-center justify-center gap-x-3 sm:text-xs md:text-base">
                    <div className="flex items-center justify-center">
                      <span className="font-poppins line-clamp-1">
                        {product.price / 1000 + ".000"} đ
                      </span>
                    </div>
                    <span className="text-sm text-gray-400 line-clamp-1">
                      Đã bán: {product.sold}k
                    </span>
                  </div>

                  <span>
                    <Rate
                      allowHalf
                      defaultValue={product.rate}
                      className="text-xs md:text-sm"
                    />
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <button
                  className={`flex items-center gap-x-3 mx-auto px-3 py-1 rounded-md border hover:bg-custom-main hover:text-white text-custom-main`}
                  onClick={() => {
                    dispatch(addItemCart({ ...product, quantity: 1 }));
                    message.success("Đã thêm vào giỏ hàng!");
                  }}
                >
                  <FaShoppingBasket />
                  <span>Mua</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
      <Pagination
        defaultCurrent={1}
        defaultPageSize={12}
        onChange={(page, limit) => {
          // console.log("page: ", page, limit);
          dispatch(setCurrentPage(page));
          dispatch(setLimitPage(limit));
        }}
        total={data?.pagination?.totalItems}
        className="my-6 text-center"
      />
    </div>
  );
};

export default Products;
