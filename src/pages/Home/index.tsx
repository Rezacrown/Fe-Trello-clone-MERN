import "./list.css";

// icon
import { AddOutline } from "react-ionicons";
import { useEffect, useState } from "react";

// component
import Header from "@/components/Header";
import AddList from "@/components/AddList";
import Board from "@/components/Board";
import Card from "@/components/Card";

// function
import { getAllTodos } from "@/api/Todos";

// ineterface
import { TodosInterfaceProps } from "@/interface/Todos";

export default function HomePage() {
  const [isToggle, setIsToggle] = useState(false);
  const [todos, setTodos] = useState<TodosInterfaceProps[]>([]);

  // set useCallback for any function
  const getTodos = () => {
    getAllTodos().then((data: [TodosInterfaceProps]) => {
      setTodos(data);
      // console.log({ todos });
    });
  };

  // useEffect call
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div>
      <Header>TRELLO MERN</Header>
      <Board>
        <Card todos={todos} getTodosAPI={() => getTodos()} />

        <div className="add-list">
          {isToggle ? (
            <AddList
              handleCancel={() => setIsToggle(false)}
              getTodosAPI={() => getTodos()}
              setIToggle={setIsToggle}
            />
          ) : (
            <div className="add-list-button" onClick={() => setIsToggle(true)}>
              <AddOutline cssClasses={"add-list-button-addOutline"} /> Add a
              List
            </div>
          )}
        </div>
      </Board>
    </div>
  );
}
