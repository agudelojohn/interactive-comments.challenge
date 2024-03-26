import UserContext from "@/context/userContext";
import { useContext } from "react";

const ActionButtons: React.FC = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("MiComponente debe estar dentro del ThemeContext.Provider");
  }
  const { onEdit, setOnEdit } = context;
  function handleCancel() {
    setOnEdit({
      id: 0,
      editText: "",
      isEditing: false,
    });
  }
  return (
    <>
      {!onEdit.isEditing && (
        <button
          className="btn btn-secondary font-bold h-12 w-[104px] "
          type="submit"
        >
          SEND
        </button>
      )}
      {onEdit.isEditing && (
        <>
          <button className="btn btn-secondary font-bold h-12 w-[104px] mb-2 inline-block md:block mr-2 md:mr-0">
            DONE
          </button>
          <button
            className="btn btn-secondary font-bold h-12 w-[104px] bg-softRed inline-block"
            onClick={handleCancel}
          >
            CANCEL
          </button>
        </>
      )}
    </>
  );
};

export default ActionButtons;
