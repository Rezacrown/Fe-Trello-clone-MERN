// import { PropsWithChildren } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { TrashOutline, Close } from "react-ionicons";
import "./text-field.css";

interface TextFieldProps {
  name: string;
  value: string;
  deleteList?: boolean;
  onChange?: (e: any) => void;
  placeholder?: string;
  className?: string;
  handleCancel?: (e: any) => void;
  onEnter?: () => void;
}

export default function TextField({
  name,
  value,
  onChange,
  placeholder,
  className,
  deleteList,
  handleCancel,
  onEnter,
}: TextFieldProps) {
  return (
    <div className="list-title-edit">
      <TextareaAutosize
        autoFocus
        className={className}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ width: deleteList ? 220 : 1000 }}
        onKeyDown={onEnter}
      />
      {deleteList && (
        <>
          {/* <ion-icon name="trash-outline" onClick={deleteList}></ion-icon>
          <ion-icon name="close" onClick={handleCancel}></ion-icon> */}
          <TrashOutline
            onClick={deleteList}
            cssClasses={"list-title-edit-ion-icon"}
          />
          <Close
            onClick={handleCancel}
            cssClasses={"list-title-edit-ion-icon"}
          />
        </>
      )}
    </div>
  );
}
