
import React from "react";
import { Popover, notification } from "antd";
import { ItemInterface } from "../interfaces/item";

const Item: React.FC<ItemInterface> = ({ _id, img, title, desc, category, condition, price, size }) => {
  const openNotification = () => {
    notification.open({
      message: "Notification sent!",
      description:
        "The Seller will receive notification that you would like to buy this product, and contact with you when receives the payment. ",
    });
  }

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
      <button
        onClick={openNotification}
        className="ring-2 ring-amber-900 bg-amber-900 text-white rounded-md p-1 self-center mt-3 hover:cursor-pointer"
      >
        BUY NOW
      </button>
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
    </>
  );
};

export default Item;
