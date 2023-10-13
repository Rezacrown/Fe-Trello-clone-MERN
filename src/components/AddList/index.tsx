import React, { useState } from "react";
import { createTodos } from "@/api/Todos";
import ButtonGroup from "../ButtonGroup";
import TextField from "../TextField";
import "./add-list.css";

interface AddListProps {
  handleCancel: () => void;
  getTodosAPI: () => void;
  setIToggle: (e: boolean) => void;
}

export default function AddList({
  handleCancel,
  getTodosAPI,
  setIToggle,
}: AddListProps) {
  // state
  const [name, setName] = useState("");

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleClear = () => {
    setName("");
    setIToggle(false);
  };

  const saveTodos = async () => {
    await createTodos(name);
    await getTodosAPI();
    handleClear();
  };

  return (
    <div className="add-list-editor">
      <TextField
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="Enter list title"
        className="list-title-textarea"
      />

      <ButtonGroup
        saveLabel="Add list"
        handleCancel={handleCancel}
        handleSave={() => saveTodos()}
      />
    </div>
  );
}
