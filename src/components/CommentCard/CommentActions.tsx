import CommonContext from "@/context/commonContext";
import UserContext from "@/context/userContext";
import { useContext } from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { Icon } from "@iconify/react/dist/iconify.js";
interface IProps {
  commentId: number;
  handleOnEdit: () => void;
}
export const CommentActions: React.FC<IProps> = ({
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
  return (
    <>
      <div className="flex gap-2 md:gap-5 md:pr-2">
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
    </>
  );
};
