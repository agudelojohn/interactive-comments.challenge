import UserContext from "@/context/userContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import { useContext, useState } from "react";
import ReplyButton from "./ReplyButton";
import { BlockingView } from "../BlockingView/BlockingView";
import CommonContext from "@/context/commonContext";
import { DeleteConfirmation } from "./DeleteConfirmation";

interface IInfoBar {
  imgSrc?: string;
  userName: string;
  dateOfComment: Date;
  isOwnComment: boolean;
  commentId: number;
  handleOnEdit: () => void;
}

const InfoBar: React.FC<IInfoBar> = ({
  imgSrc,
  userName,
  dateOfComment,
  isOwnComment,
  commentId,
  handleOnEdit,
}) => {
  const userContext = useContext(UserContext);
  const commonContext = useContext(CommonContext);

  if (!userContext || !commonContext) {
    throw new Error("MiComponente debe estar dentro del ThemeContext.Provider");
  }
  const { onEdit } = userContext;
  const { setFocusView } = commonContext;

  function handleOnDelete() {
    setFocusView(
      <DeleteConfirmation
        onDelete={() => console.log("delete")}
        onCancel={() => setFocusView(undefined)}
      />
    );
  }

  function getTimeDifference() {
    const today = new Date();
    const timeDiferenceInMili = today.getTime() - dateOfComment.getTime();
    const timeDiferenceInHours = Math.floor(
      timeDiferenceInMili / 1000 / 60 / 60
    );
    const hoursInAMont = 731;
    const hoursInAYear = 8760;
    let timeDiference = "";
    switch (true) {
      case timeDiferenceInHours < 24:
        timeDiference = `${timeDiferenceInHours} hours ago`;
        break;
      case timeDiferenceInHours >= 24 && timeDiferenceInHours <= hoursInAMont:
        const differenceInDays = Math.floor(timeDiferenceInHours / 24);
        timeDiference = `${differenceInDays} days ago`;
        break;
      case timeDiferenceInHours > hoursInAMont &&
        timeDiferenceInHours < hoursInAYear:
        const differenceInMonts = Math.floor(timeDiferenceInHours / 24 / 30);
        timeDiference = `${differenceInMonts} monts ago`;
        break;
      case timeDiferenceInHours >= hoursInAYear:
        const differenceInYears = Math.floor(
          timeDiferenceInHours / 24 / 30 / 12
        );
        timeDiference = `${differenceInYears} years ago`;
      //   break;
    }
    return timeDiference;
  }
  return (
    <div className="w-full flex flex-row gap-5 items-center">
      {/* Image */}
      <Image
        src={imgSrc ?? "/user.png"}
        alt="user image"
        width={32}
        height={32}
        className="rounded-full"
      />
      {/* name */}
      <small className="text-darkBlue text-base font-bold">{userName}</small>
      {/* date */}
      <small className="text-grayishBlue">{getTimeDifference()}</small>
      {/* Reply Button ? */}
      {isOwnComment && (
        <div className="ml-auto hidden md:flex gap-5 pr-2">
          {!onEdit.isEditing && (
            <>
              <p
                onClick={handleOnDelete}
                className="text-softRed flex flex-row gap-1 items-start font-bold cursor-pointer"
              >
                <Icon icon="mdi:delete" width="20" height="20" />
                Delete
              </p>
              <p
                className="text-moderateBlue flex flex-row gap-1 items-start font-bold cursor-pointer"
                onClick={handleOnEdit}
              >
                <Icon icon="eva:edit-fill" width="20" height="20" />
                Edit
              </p>
            </>
          )}
          {onEdit.isEditing && onEdit.id === commentId && (
            <p className="text-moderateBlue flex flex-row gap-1 items-start font-bold animate-pulse">
              <Icon
                icon="eva:edit-fill"
                width="20"
                height="20"
                className="animate-pulse"
              />
              Editing...
            </p>
          )}
        </div>
      )}
      {!isOwnComment && (
        <ReplyButton
          className="ml-auto hidden md:flex items-start"
          type="primary"
          commentUserName={userName}
        />
      )}
    </div>
  );
};

export default InfoBar;
