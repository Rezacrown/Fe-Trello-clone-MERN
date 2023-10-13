import { PropsWithChildren } from "react";
import "./header.css";

function Header({ children }: PropsWithChildren) {
  return <div className="header">{children}</div>;
}


export default Header
