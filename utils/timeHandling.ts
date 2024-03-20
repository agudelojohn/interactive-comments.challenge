export function getTimeDifference(dateOfComment: Date) {
  const today = new Date();
  const timeDiferenceInMili = today.getTime() - dateOfComment.getTime();
  const timeDiferenceInHours = Math.floor(timeDiferenceInMili / 1000 / 60 / 60);
  const hoursInAMont = 731;
  const hoursInAYear = 8760;
  let timeDiference = "";
  switch (true) {
    case timeDiferenceInHours <= 1:
      timeDiference = `${timeDiferenceInHours / 60} minutes ago`;
      break;
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
      const differenceInYears = Math.floor(timeDiferenceInHours / 24 / 30 / 12);
      timeDiference = `${differenceInYears} years ago`;
      break;
  }
  return timeDiference;
};
