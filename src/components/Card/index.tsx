import "./card.css";
import React, { Fragment, useState } from "react";
import { deleteTodos, getTodosById, editTodos } from "@/api/Todos";
import { deleteItems } from "@/api/Items";

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

  // handle function
  const handleEditList = async (id: number) => {
    const todo: TodosInterfaceProps = await getTodosById(id);

    setEditList({ ...editList, id: todo.id, name: todo.name, status: true });
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEditList({ ...editList, name: e.currentTarget.value });
  };

  const handleUpdate = async (id: number, e: any) => {
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

  return (
    <>
      {todos.map((data: TodosInterfaceProps) => (
        <div className="list" key={data.id}>
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
              <Fragment key={item.id}>
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
              </Fragment>
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
