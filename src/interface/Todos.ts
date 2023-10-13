import { ItemsInterfaceProps } from "./Items";

export interface TodosInterfaceProps {
  name: string;
  id: number;
  Items: [ItemsInterfaceProps] | [];
}


