import  { useEffect, useState } from "react";
import { Carousel } from "antd";
import { useGetAllSliderQuery } from "../redux/api/sliderApi";
import LottieLoading from "../effect/LottieLoading";
import { motion } from "framer-motion";

const SliderPage = () => {
  const { data, isLoading }:any  = useGetAllSliderQuery();
  const [imageSlider, setImageSlider]:any = useState();
  const [bannerSlider, setBannerSlider]:any = useState();
  useEffect(() => {
    (async () => {
      const images = await data?.slider[0].images[0].fileList.map(
        (items:any ) => items.response
      );
      const image = images?.map((items:any ) => items.uploadedFiles[0].url);
      const banners = await data?.slider[0].banner[0].fileList.map(
        (items:any ) => items.response
      );
      const banner = banners?.map((items:any ) => items.uploadedFiles[0].url);
      // console.log('images :',image)
      setBannerSlider(banner);
      setImageSlider(image);
    })();
  }, [data]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LottieLoading />
      </div>
    );
  }
  // console.log("slider: ", data);
  return (
    <div className="max-w-6xl mx-auto">
      <div className="md:flex gap-x-3 rounded-md">
        <motion.div
          className=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Carousel autoplay dots={false} className="md:w-[840px]">
            {imageSlider?.map((items:any, i:any) => {
              return (
                <div className="rounded-md" key={i}>
                  <img
                    src={items}
                    alt=""
                    className="object-cover overflow-hidden rounded-md"
                  />
                </div>
              );
            })}
          </Carousel>
        </motion.div>
        <div className="md:flex flex-col justify-between hidden">
          {bannerSlider?.map((items:any, i:any) => {
            return (
              <motion.div
                className=""
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay:i * 0.3 }}
              >
                <img src={items} alt="" className="rounded-md" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SliderPage;
