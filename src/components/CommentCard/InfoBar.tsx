import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind.config";
import Image from "next/image";
import ReplyButton from "./ReplyButton";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useContext } from "react";
import UserContext from "@/context/userContext";

interface IInfoBar {
  imgSrc?: string;
  userName: string;
  dateOfComment: Date;
  isOwnComment: boolean;
}

const InfoBar: React.FC<IInfoBar> = ({
  imgSrc,
  userName,
  dateOfComment,
  isOwnComment,
}) => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("MiComponente debe estar dentro del ThemeContext.Provider");
  }
  const { setOnEdit, onEdit } = context;
  const fullConfig = resolveConfig(tailwindConfig);
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
          {!onEdit && (
            <>
              <p className="text-softRed flex flex-row gap-1 items-start font-bold">
                <Icon icon="mdi:delete" width="20" height="20" />
                Delete
              </p>
              <p
                className="text-moderateBlue flex flex-row gap-1 items-start font-bold cursor-pointer"
                onClick={() => setOnEdit(true)}
              >
                <Icon icon="eva:edit-fill" width="20" height="20" />
                Edit
              </p>
            </>
          )}
          {onEdit && (
            <p
              className="text-moderateBlue flex flex-row gap-1 items-start font-bold animate-pulse"
              onClick={() => setOnEdit(true)}
            >
              <Icon icon="eva:edit-fill" width="20" height="20" className="animate-pulse" />
              Editing...
            </p>
          )}
        </div>
      )}
      {!isOwnComment && (
        <ReplyButton
          className="ml-auto hidden md:flex items-start"
          type="primary"
        />
      )}
    </div>
  );
};

export default InfoBar;
