import "./board.css";
import { PropsWithChildren } from "react";

export default function Board({ children }: PropsWithChildren) {
  return <div className="board">{children}</div>;
}
