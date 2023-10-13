import { ReactNode } from "react";
import "./title.css";

interface TitleProps {
  children: ReactNode;
  onClick: (e: any) => void;
}

export default function Title({ children, onClick }: TitleProps) {
  return (
    <div onClick={onClick} className="list-title">
      {children}
    </div>
  );
}
