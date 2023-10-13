import { TrashOutline, CloseOutline } from "react-ionicons";
import './button-group.css'

interface ButtonGroupProps {
  saveLabel: string;
  handleSave?: () => void;
  handleDelete?: () => void;
  handleCancel?: () => void;
}

export default function ButtonGroup({
  handleSave,
  saveLabel,
  handleDelete,
  handleCancel,
}: ButtonGroupProps) {
  return (
    <div className="edit-buttons">
      <div
        className="edit-button"
        style={{ backgroundColor: "#5aac44" }}
        onClick={handleSave}
      >
        {saveLabel}
      </div>
      {handleDelete && (
        <div className="edit-button-cancel" onClick={handleDelete}>
          {/* <ion-icon name="trash-outline"></ion-icon> */}
          <TrashOutline />
        </div>
      )}
      <div className="edit-button-cancel" onClick={handleCancel}>
        {/* <ion-icon name="close-outline"></ion-icon> */}
        <CloseOutline />
      </div>
    </div>
  );
}
