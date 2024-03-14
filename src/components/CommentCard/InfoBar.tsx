import Image from "next/image";
import ReplyButton from "./ReplyButton";

interface IInfoBar {
  imgSrc?: string;
  userName: string;
  dateOfComment: Date;
}

const InfoBar: React.FC<IInfoBar> = ({ imgSrc, userName, dateOfComment }) => {
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
      case timeDiferenceInHours > hoursInAMont && timeDiferenceInHours < hoursInAYear:
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
    <div className="w-full flex flex-row gap-5 items-center bg-blue-400">
      {/* Image */}
      <Image
        src={imgSrc ?? "/user.png"}
        alt="user image"
        width={32}
        height={32}
        className="rounded-full bg-red-500"
      />
      {/* name */}
      <small className="text-darkBlue text-base font-bold">{userName}</small>
      {/* date */}
      <small className="text-grayishBlue">{getTimeDifference()}</small>
      {/* Reply Button ? */}
      <ReplyButton className="ml-auto" />
    </div>
  );
};

export default InfoBar;
