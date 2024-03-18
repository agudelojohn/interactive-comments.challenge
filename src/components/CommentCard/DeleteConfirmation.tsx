import React from "react";

interface IDeleteConfirmation {
  onDelete: () => void;
  onCancel: () => void;
}
export const DeleteConfirmation: React.FC<IDeleteConfirmation> = ({
  onDelete,
  onCancel,
}) => {
  return (
    <div className="bg-white rounded-lg p-7 flex flex-col gap-5 w-96">
      <h5 className="text-2xl font-bold">Delete comment</h5>
      <p className="text-grayishBlue text-base">
        Are you sure you want to delete this comment? This will remove the
        comment and can’t be undone.
      </p>
      <div className="w-full flex justify-between">
        <div
          className="btn bg-grayishBlue text-white py-3 px-7 font-bol"
          onClick={onCancel}
        >
          NO, CANCEL
        </div>
        <div className="btn bg-softRed text-white py-3 px-7 font-bol" onClick={onDelete}>
          YES, DELETE
        </div>
      </div>
    </div>
  );
};
