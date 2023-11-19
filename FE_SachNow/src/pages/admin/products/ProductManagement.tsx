import React, { useEffect, useState } from "react";
import { Button, Modal, Popconfirm, Space, Table, Tag } from "antd";
import { AiFillDelete } from "@react-icons/all-files/ai/AiFillDelete";
import { AiFillEdit } from "@react-icons/all-files/ai/AiFillEdit";
import CreateProduct from "./CreateProduct";
import {
  useGetProductsQuery,
  useRemoveProductMutation,
} from "../../../redux/api/productApi";
import { AiOutlineLoading3Quarters } from "@react-icons/all-files/ai/AiOutlineLoading3Quarters";
import { IProduct } from "../../../interfaces/products";
import { Link } from "react-router-dom";
import { warning } from "../../../effect/notification";
import { useGetCategoriesQuery } from "../../../redux/api/categoriesApi";
import LottieLoading from "../../../effect/LottieLoading";
import { ColumnsType } from "antd/es/table";
const ProductManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { data, isLoading: loadingProduct }:any = useGetProductsQuery({_limit: 100,_order:"desc"});
  const [removeProduct, { isLoading: loadingRemove, error: errorRemove }] =
    useRemoveProductMutation();
  const { data: category }:any = useGetCategoriesQuery();

  useEffect(() => {
    if (errorRemove) {
      warning(errorRemove);
    }
  }, [errorRemove]);
  if (loadingProduct) {
    return (
      <div className="flex justify-center items-center">
        <LottieLoading />
      </div>
    );
  }

  const dataSource = data?.products?.map(
    ({
      _id,
      name,
      images,
      price,
      rate,
      sold,
      quantityStock,
      author,
      categoryId,
      description,
      createdAt,
    }: IProduct) => {
      return {
        key: _id,
        name,
        images,
        price,
        rate,
        sold,
        quantityStock,
        author,
        description,
        categoryId,
        createdAt,
      };
    }
  );


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns:ColumnsType<any> | undefined = [
    {
      title: "name",
      width: 150,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Price",
      width: 100,
      dataIndex: "price",
      key: "price",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Image",
      key: "image",
      dataIndex: "image",
      render: (_:any, recod:any) => {
        return (
          <Space>
            {recod.images.map((item:any) => {
              return item?.response?.uploadedFiles?.map((itemImage:any) => {
                return <img src={itemImage.url} alt="" />;
              });
              // <div className="">{item.name}</div>
            })}
          </Space>
        );
      },
    },
    { title: "Author", key: "author", dataIndex: "author" },
    { title: "Rate", key: "rate", dataIndex: "rate" },
    { title: "Sold", key: "sold", dataIndex: "sold" },
    {
      title: "QuantityStock",
      key: "quantityStock",
      dataIndex: "quantityStock",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
      render: (recod:any) => {
        return <p className="line-clamp-3">{recod}</p>;
      },
    },
    {
      title: "CategoryId",
      key: "categoryId",
      render: ({ categoryId }:any) => {
        // console.log('category: ',categoryId);
        const findCategoryId = category?.result?.filter((item:any) => {
          return item._id === categoryId;
        });
        // console.log('find id:', findCategoryId);
        return findCategoryId?.map((categoryId:any) => {
          return <Tag color="magenta" key={categoryId._id}>{categoryId.name}</Tag>;
        });

        // return
      },
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      width: 150,
      render: ({ key: id }:any) => (
        <Space size={"middle"}>
          <Popconfirm
            placement="topLeft"
            title={"Bạn có muốn xóa?"}
            onConfirm={() => removeProduct(id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>
              {loadingRemove ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                <AiFillDelete className="text-xl" />
              )}
            </Button>
          </Popconfirm>
          <Link to={`/admin/products/${id}/edit`}>
            <Button>
              <AiFillEdit className="text-blue-500" />
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys:any)=> {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_:any, index:any) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys:any) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_:any, index:any) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  return (
    <div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 1300 }}
      />
      <div className="">
        <Button className="" onClick={showModal}>
          Add to product
        </Button>
        <Modal
          title="ADD TO PRODUCT"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <CreateProduct />
        </Modal>
      </div>
    </div>
  );
};

export default ProductManagement;
