import React, { useState } from "react";
import { Popover, notification } from "antd";
import { ItemInterface } from "../interfaces/item";
import { EditItemFunction, DeleteItemFunction } from "../apiService";
import { async } from "q";
import { Button, Drawer, Space } from "antd";
import EditItem from "./EditItem";
import Sellitem from "./Sellitem";


interface ItemProps extends ItemInterface {
  profileView?: boolean;
}

const Item: React.FC<ItemProps> = ({ _id, img, title, desc, category, condition, price, size, user, profileView }) => {
  const [open, setOpen] = useState(false);
  const openNotification = () => {
    notification.open({
      message: "Notification sent!",
      description:
        "The Seller will receive notification that you would like to buy this product, and contact with you when receives the payment. ",
    });
  }

  const deleteItem = async () => {
    await DeleteItemFunction(_id);
  }

  const editItem = async () => {

    const formItem: ItemInterface = {
      _id,
      img,
      title,
      desc,
      category,
      condition,
      price,
      size,
    }
    await EditItemFunction(formItem);

  }

  const handleCancel = () => {
    setOpen(false);
  };

  const showDrawer = () => {
    const formItem: ItemInterface = {
      _id,
      img,
      title,
      desc,
      category,
      condition,
      price,
      size,
    }

    setOpen(true);
  };

  const content = (
    <div className="flex flex-col items-start w-60">
      <p className="font-bold">{title}</p>
      <p className="text-center">{desc}</p>
      <p className="font-bold">£{price}</p>
      <h4>
        <span className="font-bold">size:</span> {size}
      </h4>
      <p>
        <span className="font-bold">condition:</span> {condition}
      </p>

      <div className="flex justify-center items-center space-x-3 mt-3 w-full">
        {profileView ? (
          <>
            <button
              onClick={showDrawer}
              className="ring-2 ring-green-500 bg-green-500 text-white rounded-md p-1 self-center mt-3 hover:cursor-pointer"
            >
              EDIT
            </button>
            <button
              onClick={deleteItem}
              className="ring-2 ring-red-500 bg-red-500 text-white rounded-md p-1 self-center mt-3 hover:cursor-pointer"
            >
              DELETE
            </button>
          </>
        ) : (
          <button
            onClick={openNotification}
            className="ring-2 ring-amber-900 bg-amber-900 text-white rounded-md p-1 hover:cursor-pointer"
          >
            BUY NOW
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Popover content={content} title="Item Description">
        <div
          className="flex flex-col items-center "
          style={{ minWidth: "250px" }}
        >
          <img
            src={img}
            className="h-72 rounded-xl m-4  p-2 hover:shadow-2xl transition-shadow"
          />
          <h1>{title}</h1>
          <p>£{price}</p>
          <p>size: {size}</p>
        </div>
      </Popover>
      <Drawer
        title='Edit Item'
        width={520}
        onClose={handleCancel}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={handleCancel}>Cancel</Button>
          </Space>
        }
      >
        <EditItem _id={_id} img={img} title={title}  desc={desc} condition={condition} category={category} price={price} size={size}/>
      </Drawer>
    </>
  );
};

export default Item;
