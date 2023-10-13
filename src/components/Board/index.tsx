import { PropsWithChildren } from "react";
import "./board.css";

export default function Board({ children }: PropsWithChildren) {
  return <div className="board">{children}</div>;
}
