import UserContext from "@/context/userContext";
import { useContext } from "react";

const ActionButtons: React.FC = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("MiComponente debe estar dentro del ThemeContext.Provider");
  }
  const { onEdit, setOnEdit, setEditText } = context;
  function handleCancel() {
    setEditText("");
    setOnEdit(false);
  }
  return (
    <>
      {!onEdit && (
        <button className="btn btn-secondary col-span-2 font-bold h-12 w-[104px] m-auto" type="submit">
          SEND
        </button>
      )}
      {onEdit && (
        <div className="col-span-2 row-span-2">
          <button className="btn btn-secondary font-bold h-12 w-[104px] mb-2 m-auto">
            DONE
          </button>
          <button className="btn btn-secondary  font-bold h-12 w-[104px] m-auto bg-softRed" onClick={handleCancel}>
            CANCEL
          </button>
        </div>
      )}
    </>
  );
};

export default ActionButtons;
