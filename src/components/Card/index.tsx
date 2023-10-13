import "./card.css";
import { useState } from "react";
import { getTodosById } from "@/api/Todos";

// components
import Title from "../Title";
import TextField from "../TextField";
import { AddOutline } from "react-ionicons";

// import ineterface
import { TodosInterfaceProps } from "@/interface/Todos";

// declare ineterface
interface EditListStateProps {
  status: boolean;
  id: string | number;
  name: string;
}

interface CardProps {
  // todos: [TodosInterfaceProps] | [];
  todos: TodosInterfaceProps[] | [];
}

//
export default function Card({ todos }: CardProps) {
  // state declare
  const [editList, setEditList] = useState<EditListStateProps>({
    status: false,
    id: "",
    name: "",
  });

  const handleEditList = async (id: number) => {
    const todo: TodosInterfaceProps = await getTodosById(id);

    console.log({ data: editList });

    setEditList({...editList, id: todo.id, name: todo.name, status: true });
  };


  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEditList({...editList, name: e.currentTarget.value})
  }

  return (
    <>
      {todos.map((data: TodosInterfaceProps) => (
        <div className="list" key={data.id}>
          <div className="lists-card">
            {editList.status === true && editList.id == data.id ? (
              <TextField
                name="name"
                value={editList.name}
                onChange={handleChange}
                className="list-title-textarea"
                placeholder="Edit List Name"
                deleteList={true}
                handleCancel={(prev) => setEditList({ ...prev, status: false })}
              />
            ) : (
              <Title onClick={() => handleEditList(data.id)}>{data.name}</Title>
              // <Title onClick={(prev) => setEditList({ ...prev, status: true })}>
              //   {data.name}
              // </Title>
            )}

            {data.Items.map((item) => (
              <div key={item.id} className="card">
                {item.name}
              </div>
            ))}

            <div className="toggle-add-card">
              <AddOutline cssClasses={"toggle-add-card-icon "} /> Add Card
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
