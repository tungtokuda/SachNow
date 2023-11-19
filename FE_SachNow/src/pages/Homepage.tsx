import { Button, Rate } from "antd";
import Slider from "react-slick";
import Products from "./Products";
import ProductTrending from "./ProductTrending";
import SliderPage from "../components/SliderPage";
import LottieLoading from "../effect/LottieLoading";
import { useGetProductsQuery } from "../redux/api/productApi";
import { IProduct } from "../interfaces/products";
import { Link } from "react-router-dom";
import { convertSlug } from "../utils/convertSlug";

const Homepage = () => {
  const { data, isLoading }: any = useGetProductsQuery({
    _order: "desc",
    _limit: 5,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <LottieLoading />
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="bg-gray-100">
      <SliderPage />
      <div className="p-4 md:max-w-6xl md:mx-auto md:space-y-12">
        <h2 className="my-6 text-2xl font-bold font-poppins md:text-3xl">
          Sách nhập mới
        </h2>
        <Slider {...settings}>
          {data?.products?.map((product: IProduct) => (
            <div className="mx-2" key={product._id}>
              <div className="p-4 mt-4 bg-white border rounded-md shadow-md">
                <div className="grid-cols-2 gap-4 md:grid">
                  <Link
                    to={`books/${convertSlug(product.name)}-${product._id}.html/detail`}
                  >
                    <div className="">
                      <img
                        src={product?.images[0].response.uploadedFiles[0].url}
                        alt={product.name}
                        className="object-cover w-full h-64 md:-translate-y-12"
                      />
                    </div>
                  </Link>
                  <div className="flex flex-col justify-center md:gap-y-3 sm:gap-y-1">
                    <span className="text-lg line-clamp-1 sm:text-sm md:text-xl">
                      {product.name}
                    </span>
                    <span className="text-gray-400 sm:text-xs sm:line-clamp-1">
                      {product.author}
                    </span>
                    <div className="flex-col hidden space-y-2 md:flex">
                      <span>
                        <Rate
                          allowHalf
                          value={product.rate}
                          className="md:text-sm"
                        />
                      </span>
                      <Link
                        to={`books/${convertSlug(product.name)}-${product._id}.html/detail`}
                      >
                        <Button type="primary">Xem chi tiết</Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-400 md:line-clamp-3 sm:hidden">
                  {product.description}
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <Products />
        <ProductTrending />
      </div>
    </div>
  );
};

export default Homepage;
