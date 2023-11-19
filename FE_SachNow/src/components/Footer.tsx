import { AiFillFacebook } from "@react-icons/all-files/ai/AiFillFacebook";
import { SiGmail } from "@react-icons/all-files/si/SiGmail";
import { AiFillInstagram } from "@react-icons/all-files/ai/AiFillInstagram";
import { Input, } from 'antd';

const Footer = () => {
  const { Search } = Input;

  return (
    <div className="p-4 text-white bg-gray-900">
      <div className="container flex flex-col items-center justify-between mx-auto md:flex-row">
        <div className="grid grid-cols-2 gap-8 my-6 md:grid-cols-4 md:gap-16">
          <div className="flex flex-col gap-y-4">
            <label htmlFor="" className="text-lg font-bold font-inclusiveSans">Company</label>
            <div className="flex flex-col text-sm gap-y-2">
              <span>About</span>
              <span>Store</span>
              <span>FQA</span>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <label htmlFor="" className="text-lg font-bold font-inclusiveSans">Service</label>
            <div className="flex flex-col text-sm gap-y-2">
              <span>Delivery</span>
              <span>Paymant</span>
              <span>Contacts</span>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <label htmlFor="" className="text-lg font-bold font-inclusiveSans">Follows us</label>
            <div className="flex flex-col text-sm gap-y-2">
              <span>Instagram</span>
              <span>Facebook</span>
              <span>Twitter</span>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <label htmlFor="" className="text-lg font-bold font-inclusiveSans">Get our newsletters</label>
            <div className="">
              <Search placeholder="Your email" enterButton />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between w-full mt-8 md:flex-row md:w-auto md:mt-0">
          <div className="mb-4 text-center md:mb-0 md:text-left">
            <span className="text-xs font-bold font-poppins">Book Genuine</span>
            <span className="text-xs">Sách hay uy tín tạo thương hiệu</span>
          </div>
          <div className="flex items-center space-x-3 text-2xl">
            <AiFillFacebook className="p-1 transition duration-300 border border-white rounded-full hover:bg-white hover:text-gray-900" />
            <SiGmail className="p-1 transition duration-300 border border-white rounded-full hover:bg-white hover:text-gray-900" />
            <AiFillInstagram className="p-1 transition duration-300 border border-white rounded-full hover:bg-white hover:text-gray-900" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
