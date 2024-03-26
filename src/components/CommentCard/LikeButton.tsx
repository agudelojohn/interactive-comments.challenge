import { Icon } from "@iconify/react";
import React from "react";

interface ILikeButton {
  onPlusClick: () => void;
  onMinusClick: () => void;
  likes:number;
}

const LikeButton: React.FC<ILikeButton> = ({
  onPlusClick,
  onMinusClick,
  likes
}) => {
  return (
    <div className="flex md:flex-col rounded-[10px] bg-veryLightGray p-2 gap-2 text-center max-h-[100px]">
      <div
        className="p-1 cursor-pointer text-lightGrayishBlue hover:text-moderateBlue"
        onClick={onPlusClick}
      >
        <Icon icon="icomoon-free:plus" className="text-sm" />
      </div>
      <div className="text-base text-moderateBlue font-bold">{likes}</div>
      <div
        className="font-black p-1 cursor-pointer text-lightGrayishBlue hover:text-moderateBlue"
        onClick={onMinusClick}
      >
        <Icon icon="icomoon-free:minus" className="text-sm" />
      </div>
    </div>
  );
};
export default LikeButton;
