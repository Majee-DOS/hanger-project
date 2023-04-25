
import React from "react";
import { Popover, notification } from "antd";


interface ItemProps {
  item: {
    img: string;
    title: string;
    price: number;
    size: string;
    desc: string;
    condition: string;
    category: string;
  };
}

const Item: React.FC<ItemProps> = ({ item }) => {

   

    const openNotification = () => {
        notification.open({
          message: "Notification sent!",
          description:
            "The Seller will receive notification that you would like to buy this product, and contact with you when receives the payment. ",
        });
    }


  const content = (
    <div className="flex flex-col items-start w-60">
      <p className="font-bold">{item.title}</p>
      <p className="text-center">{item.desc}</p>
      <p className="font-bold">£{item.price}</p>
      <h4>
        <span className="font-bold">size:</span> {item.size}
      </h4>
      <p>
        <span className="font-bold">condition:</span> {item.condition}
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
            src={item.img}
            className="h-72 rounded-xl m-4  p-2 hover:shadow-2xl transition-shadow"
          />
          <h1>{item.title}</h1>
          <p>£{item.price}</p>
          <p>size: {item.size}</p>
      </div>
        </Popover>
    </>
  );
};

export default Item;
