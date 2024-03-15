import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind.config";
import Image from "next/image";
import ReplyButton from "./ReplyButton";
import { Icon } from "@iconify/react/dist/iconify.js";

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
  const fullConfig = resolveConfig(tailwindConfig);
  let screenWidth = fullConfig.theme.screens.md;

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
        <div className="ml-auto hidden md:flex gap-5">
          <p className="text-softRed flex flex-row gap-1 items-start font-bold">
            <Icon icon="mdi:delete" width="20" height="20" />
            Delete
          </p>
          <p className="text-moderateBlue flex flex-row gap-1 items-start font-bold">
            <Icon icon="eva:edit-fill" width="20" height="20" />
            Edit
          </p>
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
