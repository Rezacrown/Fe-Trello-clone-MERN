import { useState } from "react";
import { createItems, editItems } from "@/api/Items";

// components
import TextField from "../TextField";
import ButtonGroup from "../ButtonGroup";

interface AddCardProps {
  todoId: number | string;
  itemId: number | string;
  adding?: boolean;
  getTodosAPI: () => void;
  handleCancel?: () => void;
  itemName?: string;
  closeAction: () => void;
}

export default function AddCard({
  handleCancel,
  todoId,
  itemId,
  adding,
  getTodosAPI,
  itemName,
  closeAction,
}: AddCardProps) {
  // state
  const [name, setName] = useState(itemName ?? "");

  // handle function
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleAddItem = async (name: string, TodoId: number | string) => {
    await createItems({
      name: name,
      TodoId: TodoId,
    });
    setName("");
    closeAction();
    getTodosAPI();
  };

  const handleUpdateItem = async (itemId: number | string, name: string) => {
    await editItems(itemId, name);
    closeAction();
    getTodosAPI();
  };

  return (
    <>
      <div className="edit-card">
        <div className="card">
          <TextField
            name={"Add Item List"}
            value={name}
            placeholder="enter title for this card"
            onChange={(e) => handleChange(e)}
            className="edit-card-textarea"
          />
          <ButtonGroup
            saveLabel={adding ? "Add list" : "Update list"}
            handleCancel={handleCancel}
            handleSave={() =>
              adding
                ? handleAddItem(name, todoId)
                : handleUpdateItem(itemId, name)
            }
          />
        </div>
      </div>
    </>
  );
}
