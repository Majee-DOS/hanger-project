import React from "react";

interface ItemProps{
    item: {
        img: string
    }
}

const Item: React.FC<ItemProps> = ({item}) => {
    return (
      <div className="flex flex-row">
        <img src={item.img} className="h-60" />
      </div>
    );
}

export default Item