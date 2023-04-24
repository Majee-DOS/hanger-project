import React from "react";

interface ItemProps {
  item: {
    img: string;
    title: string;
    price: number;
    size: string;
  };
}

const Item: React.FC<ItemProps> = ({ item }) => {
  return (
    <>
      <div
        className="flex flex-col items-center "
        style={{ minWidth: "250px", overflow: "hidden" }}
      >
        <img src={item.img} className="h-72 rounded-xl m-4  p-2 hover:shadow-2xl" />
        <h1>{item.title}</h1>
        <p>£{item.price}</p>
        <p>size: {item.size}</p>
      </div>
    </>
  );
};

export default Item;
