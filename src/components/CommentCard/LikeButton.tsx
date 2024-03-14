import { Icon } from "@iconify/react";
import React from "react";

interface ILikeButton {
  onPlusClick: () => void;
  onMinusClick: () => void;
}

const LikeButton: React.FC<ILikeButton> = ({
  onPlusClick,
  onMinusClick,
}) => {
  return (
    <div className="flex flex-col rounded-[10px] bg-veryLightGray p-2 gap-2 text-center">
      <div
        className="p-1 cursor-pointer text-lightGrayishBlue hover:text-moderateBlue"
        onClick={onPlusClick}
      >
        <Icon icon="icomoon-free:plus" className="text-sm" />
      </div>
      <div className="text-base text-moderateBlue font-bold">12</div>
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
