import "./card.css";
import React, { useState } from "react";
import { deleteTodos, getTodosById, editTodos } from "@/api/Todos";
import { deleteItems, moveItems } from "@/api/Items";

// components
import Title from "../Title";
import TextField from "../TextField";
import { AddOutline } from "react-ionicons";
import AddCard from "../AddCard";
import { PencilOutline, TrashOutline } from "react-ionicons";

// import ineterface
import { TodosInterfaceProps } from "@/interface/Todos";

// declare ineterface
interface EditListStateProps {
  status: boolean;
  id: string | number;
  name: string;
}
interface AddItemStateProps {
  status: boolean;
  itemID: string | number;
  todoID: string | number;
}
interface EditItemStateProps {
  status: boolean;
  itemId: string | number;
  todoId: string | number;
}

interface DragItemStateProps {
  itemId: null | number;
  currentTodoId: null | number;
}

interface CardProps {
  // todos: [TodosInterfaceProps] | [];
  todos: TodosInterfaceProps[] | [];
  getTodosAPI: () => void;
}

//
export default function Card({ todos, getTodosAPI }: CardProps) {
  // state declare
  const [editList, setEditList] = useState<EditListStateProps>({
    status: false,
    id: "",
    name: "",
  });
  const [addItem, setAddItem] = useState<AddItemStateProps>({
    status: false,
    itemID: "",
    todoID: "",
  });
  const [hover, setHover] = useState<null | number>(null);
  const [editItem, setEditItem] = useState<EditItemStateProps>({
    status: false,
    itemId: "",
    todoId: "",
  });
  const [dragItem, setDragItem] = useState<DragItemStateProps>({
    itemId: null,
    currentTodoId: null,
  });

  // handle function
  const handleEditList = async (id: number) => {
    const todo: TodosInterfaceProps = await getTodosById(id);

    setEditList({ ...editList, id: todo.id, name: todo.name, status: true });
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEditList({ ...editList, name: e.currentTarget.value });
  };

  const handleUpdate = async (id: number, e: React.KeyboardEvent) => {
    if (e.keyCode == 13) {
      await editTodos(id, editList.name);
      setEditList({ ...editList, status: false });
      getTodosAPI();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Konfirmasi penghapusan?") === true) {
      await deleteTodos(id);
      getTodosAPI();
    }
  };

  const handleDeleteItem = async (id: number) => {
    await deleteItems(id);
    getTodosAPI();
  };

  const handleMoveItem = async (id: number, targetTodo: number) => {
    await moveItems(id, targetTodo);
    getTodosAPI();
  };

  // drag event
  const handleDragStart = (itemId: number, currentTodoId: number) => {
    setDragItem({
      itemId: itemId,
      currentTodoId: currentTodoId,
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    // console.log("drag over");
  };

  const handleOnDrop = (targetTodo: number) => {
    // const itemId = e.dataTransfer.getData("itemId");
    // const curretTodo = e.dataTransfer.getData("targetTodoId");

    if (dragItem.currentTodoId != targetTodo) {
      // console.log({ current: dragItem.currentTodoId, targetTodo });
      handleMoveItem(Number(dragItem.itemId), targetTodo);
    }
  };

  return (
    <>
      {todos.map((data: TodosInterfaceProps) => (
        <div
          className="list"
          key={data.id}
          onDragOver={(e) => handleDragOver(e)}
          onDrop={() => handleOnDrop(data.id)}
        >
          <div className="lists-card">
            {editList.status && editList.id == data.id ? (
              <TextField
                name="name"
                value={editList.name}
                onChange={handleChange}
                className="list-title-textarea"
                placeholder="Edit List Name"
                onEnter={(e) => handleUpdate(data.id, e)}
                deleteList={() => handleDelete(data.id)}
                handleCancel={() =>
                  setEditList({ status: false, id: "", name: "" })
                }
              />
            ) : (
              <Title onClick={() => handleEditList(data.id)}>{data.name}</Title>
            )}

            {/* update item */}
            {data.Items.map((item) => (
              <div key={item.id}>
                {editItem.status && editItem.itemId === item.id ? (
                  <AddCard
                    todoId={editItem.todoId}
                    itemId={editItem.itemId}
                    itemName={item.name}
                    getTodosAPI={getTodosAPI}
                    closeAction={() =>
                      setEditItem({ status: false, itemId: "", todoId: "" })
                    }
                    handleCancel={() =>
                      setEditItem({ status: false, itemId: "", todoId: "" })
                    }
                  />
                ) : (
                  <div
                    className="card"
                    onClick={() =>
                      setAddItem({ ...addItem, itemID: item.id, status: true })
                    }
                    onMouseEnter={() => setHover(item.id)}
                    onMouseLeave={() => setHover(null)}
                    draggable
                    onDragStart={() => handleDragStart(item.id, data.id)}
                  >
                    <span>{item.name}</span>
                    {hover === item.id && (
                      <div className="card-icons">
                        <PencilOutline
                          cssClasses="card-icon"
                          onClick={() =>
                            setEditItem({
                              ...editItem,
                              status: true,
                              itemId: item.id,
                              todoId: data.id,
                            })
                          }
                        />
                        <TrashOutline
                          cssClasses="card-icon"
                          onClick={() => handleDeleteItem(item.id)}
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            {/* update item end */}

            {/* add item */}
            {addItem.status && addItem.todoID === data.id ? (
              <AddCard
                todoId={data.id}
                itemId={addItem.itemID}
                adding
                getTodosAPI={getTodosAPI}
                handleCancel={() =>
                  setAddItem({ ...addItem, status: false, todoID: "" })
                }
                closeAction={() =>
                  setAddItem({ status: false, itemID: "", todoID: "" })
                }
              />
            ) : (
              <div
                className="toggle-add-card"
                onClick={() =>
                  setAddItem({ ...addItem, status: true, todoID: data.id })
                }
              >
                <AddOutline cssClasses={"toggle-add-card-icon "} /> Add Card
              </div>
            )}
            {/* add item end */}
          </div>
        </div>
      ))}
    </>
  );
}
